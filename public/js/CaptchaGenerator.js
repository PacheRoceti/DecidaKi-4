export class CaptchaGenerator {
    constructor(length = 6) {
        this.alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');
        this.length = length;
        this.code = '';
    }

    gerarCaptcha() {
        this.code = Array.from({ length: this.length }, () =>
            this.alpha[Math.floor(Math.random() * this.alpha.length)]
        ).join(' ');
        return this.code;
    }

    exibirCaptcha(elementId) {
        const captchaCode = this.gerarCaptcha();
        const element = document.getElementById(elementId);
        element.innerHTML = captchaCode;
        element.value = captchaCode; // Para casos onde o elemento seja um input
    }

    validaCaptcha(userInput, elementId) {
        const captcha = this.limpaEspaco(document.getElementById(elementId).value);
        const input = this.limpaEspaco(userInput);
        return captcha === input;
    }

    limpaEspaco(string) {
        return string.split(' ').join('');
    }

    f5Captcha(captchaElementId, inputElementId) {
        this.exibirCaptcha(captchaElementId); // Reexibe um novo CAPTCHA
        const inputElement = document.getElementById(inputElementId);
        inputElement.value = ''; // Limpa o input do usuário
    }  
}