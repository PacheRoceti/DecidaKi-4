var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");
var body = document.querySelector("body");

btnSignin.addEventListener("click", function () {
    body.className = "sign-in-js";
});

btnSignup.addEventListener("click", function () {
    body.className = "sign-up-js";
});

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const registerBtn = document.getElementById('registerBtn');
    const registerUsername = document.getElementById('registerUsername');
    const registerEmail = document.getElementById('registerEmail');
    const registerPassword = document.getElementById('registerPassword');

    // Função para verificar se todos os campos estão preenchidos
    function checkFormCompletion() {
        if (registerUsername.value.trim() !== "" &&
            registerEmail.value.trim() !== "" &&
            registerPassword.value.trim() !== "") {
            registerBtn.disabled = false; // Habilita o botão
        } else {
            registerBtn.disabled = true; // Desabilita o botão
        }
    }

    // Adicionar eventos para monitorar mudanças nos campos
    registerUsername.addEventListener('input', checkFormCompletion);
    registerEmail.addEventListener('input', checkFormCompletion);
    registerPassword.addEventListener('input', checkFormCompletion);

    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            // Mostrar o modal de loading
            const loadingModal = new bootstrap.Modal(document.getElementById('loadingModal'));
            loadingModal.show();

            const formData = new FormData(registerForm);
            const data = {
                username: formData.get('username'),
                email: formData.get('email'),
                password: formData.get('password')
            };

            try {
                const response = await fetch('http://localhost:3000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const message = await response.text();

                // Fechar o modal de loading
                loadingModal.hide();

                if (!response.ok) {
                    throw new Error(message);
                }

                // Mostra o modal de verificação após o sucesso no envio do e-mail
                const verificationModal = new bootstrap.Modal(document.getElementById('verificationModal'));
                verificationModal.show();

                Swal.fire({
                    title: 'Sucesso!',
                    text: message,
                    icon: 'success',
                    confirmButtonText: 'OK',
                    customClass: {
                        confirmButton: 'btn btn-success'
                    }
                });

            } catch (error) {
                // Fechar o modal de loading
                loadingModal.hide();

                Swal.fire({
                    title: 'Erro!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'OK',
                    customClass: {
                        confirmButton: 'btn btn-danger'
                    }
                });
            }
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            // Mostrar o modal de loading
            const loadingModal = new bootstrap.Modal(document.getElementById('loadingModal'));
            loadingModal.show();

            const formData = new FormData(loginForm);
            const data = {
                email: formData.get('email'),
                password: formData.get('password')
            };

            try {
                const response = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const message = await response.text();

                // Fechar o modal de loading
                loadingModal.hide();

                if (!response.ok) {
                    throw new Error(message);
                }

                if (message === 'Login bem-sucedido') {
                    localStorage.setItem('isAuthenticated', 'true');
                    window.location.href = 'index.html';
                }

            } catch (error) {
                // Fechar o modal de loading
                loadingModal.hide();

                Swal.fire({
                    title: 'Erro!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'OK',
                    customClass: {
                        confirmButton: 'btn btn-danger'
                    }
                });
            }
        });
    }



    const verifyCodeBtn = document.getElementById('verifyCodeBtn');
    const verificationMessage = document.getElementById('verificationMessage');
    const verificationCodeInput = document.getElementById('verificationCode');

    if (verifyCodeBtn) {
        verifyCodeBtn.addEventListener('click', async () => {
            const code = verificationCodeInput.value;
            const email = document.getElementById('registerEmail').value;

            try {
                const response = await fetch('http://localhost:3000/verify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email,
                        code
                    })
                });

                const message = await response.text();

                if (!response.ok) {
                    throw new Error(message);
                }

                verificationMessage.innerText = message;
                verificationMessage.style.display = 'block';
                verificationCodeInput.style.display = 'none';
                verifyCodeBtn.style.display = 'none';

                Swal.fire({
                    title: 'Código Verificado!',
                    text: message,
                    icon: 'success',
                    confirmButtonText: 'OK',
                    customClass: {
                        confirmButton: 'btn btn-success'
                    }
                }).then(() => {
                    // Mostrar modal de sucesso aqui após o alerta
                    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
                    successModal.show();
                });

            } catch (error) {
                Swal.fire({
                    title: 'Erro!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'OK',
                    customClass: {
                        confirmButton: 'btn btn-danger'
                    }
                });
            }
        });
    }
});