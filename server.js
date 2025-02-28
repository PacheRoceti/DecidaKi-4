const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config(); // Carregar variáveis de ambiente

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL', err);
    } else {
        console.log('Connected to MySQL');
    }
});

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

let verificationCodes = {}; 
let pendingUsers = {}; // Para armazenar usuários pendentes de verificação

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).send('Todos os campos são obrigatórios');
    }

    // Gerar código de verificação
    const verificationCode = crypto.randomInt(1000, 9999).toString();
    verificationCodes[email] = verificationCode; // Armazenar o código
    pendingUsers[email] = { username, password }; // Armazenar os dados temporariamente

    // Enviar código por e-mail
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email, 
        subject: 'Código de Verificação',
        text: `Olá,
Para garantir a segurança de sua conta no Decidaki, solicitamos que complete o processo de verificação de dois fatores (2FA). Seu código de verificação é:  ${verificationCode} 
Por favor, insira este código na página de verificação para concluir o seu login. Este código é válido por 10 minutos. Se você não solicitou este código, por favor, ignore este e-mail ou entre em contato com nosso suporte imediatamente. Atenciosamente, Equipe Decidaki 
Observação: Não compartilhe seu código de verificação com ninguém. O Decidaki nunca solicitará essa informação fora do processo de login seguro.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erro ao enviar o e-mail:', error);
            return res.status(500).send('Erro ao enviar o e-mail de verificação');
        }
        res.status(201).send('E-mail de verificação enviado.');
    });
});

app.post('/verify', (req, res) => {
    const { email, code } = req.body;

    if (verificationCodes[email] && verificationCodes[email] === code) {
        const user = pendingUsers[email];
        if (user) {
            const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
            
            db.query(query, [user.username, email, user.password], (err, result) => {
                if (err) {
                    return res.status(400).send('Erro ao salvar o usuário no banco de dados');
                }

                delete verificationCodes[email]; // Limpar código
                delete pendingUsers[email]; // Remover o usuário pendente

                res.status(200).send('Email verificado com sucesso e usuário salvo');
            });
        } else {
            res.status(400).send('Usuário não encontrado para verificação');
        }
    } else {
        res.status(400).send('Código inválido ou já utilizado');
    }
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('E-mail e senha são obrigatórios');
    }

    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao verificar o usuário');
        }
        if (results.length > 0) {
            res.status(200).send('Login bem-sucedido');
        } else {
            res.status(401).send('E-mail ou senha inválidos');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
