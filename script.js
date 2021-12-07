'use strict';

let btn = document.querySelector('#btn'),
    inputAll = document.querySelectorAll('#password-input, #email-input, #checkbox-input'),
    emailInput = document.querySelector('#email-input'),
    passwordInput = document.querySelector('#password-input'),
    checkboxInput = document.querySelector('#checkbox-input'),
    checkboxMark = document.querySelector('.form__checkbox-mark'),
    emailLabel = document.querySelector('#emailLabel'),
    passwordLabel = document.querySelector('#passwordLabel');


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

inputAll.forEach(item => {
    item.addEventListener('input', (event) => {
        event.preventDefault();
        sendData()
    });
})

btn.addEventListener('click', (event) => {
    event.preventDefault();
    sendData()
})

function sendData() {
    // Константы создания тэга span для текста об ошибке
    const rmEmail = document.querySelector('#emptyEmail');
    const rmPassword = document.querySelector('#emptyPassword');
    const rmPasswordValid = document.querySelector('#invalidPassword');
    const rmEmailValid = document.querySelector('#invalidEmail');
    const rmCheckbox = document.querySelector('#emptyCheckbox');
    const emptyInputEmail = document.querySelector('.form__email');
    const emptyInputPassword = document.querySelector('.form__password');

    function makeRedPassword() {
        passwordInput.classList.add('error');
        passwordLabel.classList.add('label__red')
    }

    function makeRedEmail() {
        emailInput.classList.add('error');
        emailLabel.classList.add('label__red')
    }

    // Проверка на пустые строки Email

    if (emailInput.value === '' && rmEmail == null) {
        emptyInputEmail.insertAdjacentHTML(
            'afterend',
            `<span class="empty_input-text" id="emptyEmail">Поле обязательно для заполнения</span>`
        )
        makeRedEmail()
    }

    // Проверка email на валидность

    let emailValid = emailInput.value;
    if (!validateEmail(emailValid) && emailValid != '' && rmEmailValid == null) {
        emptyInputEmail.insertAdjacentHTML(
            'afterend',
            `<span class="empty_input-text" id="invalidEmail">Email невалидный</span>`
        )
        makeRedEmail()
    }

    // Проверка на пустые строки Password

    if (passwordInput.value === '' && rmPassword == null) {
        emptyInputPassword.insertAdjacentHTML(
            'afterend',
            `<span class="empty_input-text" id="emptyPassword">Поле обязательно для заполнения</span>`
        )
        makeRedPassword()
    }

    // Проверка Пароля на более 8 цифр

    if (passwordInput.value.length < 8 && passwordInput.value != '' && rmPasswordValid == null) {
        emptyInputPassword.insertAdjacentHTML(
            'afterend',
            `<span class="empty_input-text" id="invalidPassword">Пароль должен содержать как минимум 8 символов</span>`
        )
        makeRedPassword()
    }

    // Проверка на согласие с правилами (Чекбокс)

    if (!checkboxInput.checked && rmCheckbox == null) {
        const emptyInput = document.querySelector('.form__checkbox');
        emptyInput.insertAdjacentHTML(
            'afterend',
            `<span class="empty_input-text" id="emptyCheckbox">Поле обязательно для заполнения</span>`
        )
        checkboxMark.classList.add('error');
        checkboxMark.style.color = '#CB2424';
    }

    btn.onclick = function () {
        if (validateEmail(emailValid) && passwordInput.value.length >= 8 && checkboxInput.checked) {
            let userData = {
                email: emailInput.value,
                password: passwordInput.value
            };
            console.log(userData);
        }
    }

    // Проверки на исправленные ошибки:
    // Удаляет красный текст пустой строки (у эмейла)
    if (rmEmail != null && emailInput.value !== '') {
        rmEmail.remove();
    }

    // Удаляет текст об ошибке непройденой валидации (у эмейла)
    if (rmEmailValid != null && validateEmail(emailValid) || rmEmailValid !== null && emailInput.value == '') {
        rmEmailValid.remove();
    }

    // Удаляет стили инпутов и символа '*' красного цвета (у эмейла)
    if (validateEmail(emailValid)) {
        emailInput.classList.remove('error');
        emailLabel.classList.remove('label__red')
    }

    // Удаляет стили инпутов красного цвета (у пароля)
    if (rmPassword != null && passwordInput.value !== '') {
        rmPassword.remove();
    }

    // Удаляет текст об ошибки о том что пароль меньше 8 цифр
    if (rmPasswordValid != null && passwordInput.value.length >= 8 || rmPasswordValid != null && passwordInput.value == '') {
        rmPasswordValid.remove();
    }

    // Удаляет стили инпутов и символа '*' красного цвета (у пароля)
    if (passwordInput.value.length >= 8) {
        passwordInput.classList.remove('error');
        passwordLabel.classList.remove('label__red')
    }

    // Удаляет стили красного цвета чекбокса
    if (rmCheckbox != null && checkboxInput.checked) {
        checkboxMark.classList.remove('error');
        checkboxMark.style.color = '';
        rmCheckbox.remove();
    }
}
