import {CaptchaGenerator} from "./CaptchaGenerator.js";

const captcha = new CaptchaGenerator();

function verificaCaptcha() {
    const userInput = document.getElementById('txtInput').value;
    const isValid = captcha.validaCaptcha(userInput, 'mainCaptcha');
    if (isValid) {
        alert('CAPTCHA correto!');
        captcha.f5Captcha('mainCaptcha', 'txtInput');
    } else {
        alert('CAPTCHA incorreto, tente novamente.');
        captcha.f5Captcha('mainCaptcha', 'txtInput');
    }
}

function f5Captcha() {
    captcha.f5Captcha('mainCaptcha', 'txtInput');
}

window.verificaCaptcha = verificaCaptcha;

window.onload = function() {
    captcha.f5Captcha('mainCaptcha', 'txtInput');
}

window.f5Captcha = f5Captcha;