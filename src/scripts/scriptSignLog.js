import { Api } from "../models/Api.js"

const inputs = document.querySelectorAll('input')
inputs.forEach((input) => {
    input.addEventListener('input', function() {
        console.log(input.value !== '')
        input.value !== '' ?

        input.nextElementSibling.classList.add('fill') :

        input.nextElementSibling.classList.remove('fill')

    })
})

console.log(inputs)

/*---------------Login de Usuário---------------*/ 

const formLogin = document.getElementsByClassName('form-login');

const loginData = {};
loginData[inputs[4].name] = inputs[4].value;
loginData[inputs[5].name] = inputs[5].value;

console.log(loginData);

formLogin[0].addEventListener('submit', Api.loginUser(loginData));

/*---------------Registro de Usuário---------------*/ 

const formSingUp = document.getElementsByClassName('form-singup');

const registrationData  = {};
registrationData[inputs[0].name] = inputs[0].value;
registrationData[inputs[1].name] = inputs[1].value;
registrationData[inputs[2].name] = inputs[2].value;
formSingUp[0].addEventListener('submit', sendData);

function validateEmail(email) {
    if (email.includes('@')) {
        return true;
    }
    return false;
}

function validatePassword(password, secondPassword) {
    if (password.includes(secondPassword) && password.length === secondPassword.length) {
        return true;
    }
    return false;
}

function modalError(message) {
    const error = document.getElementById('div-error');
    error.classList.add('password-error');
    error.firstChild.textContent = `${message}`;
}

function modalSuccess(message) {
    const error = document.getElementById('div-error');
    error.classList.add('password-error');
    error.firstChild.textContent = `${message}`;
}
    
function sendData(e) {
    e.preventDefault();

if (validatePassword(inputs[2].value, inputs[3].value) === false) {

    modalError('As senhas digitadas não conferem!');
    inputs[3].value = '';

} else if (validateEmail(inputs[1].value) === false) {
    modalError('Use um email válido!');
    inputs[1].value = '';
} else if (inputs[2].value.length < 8) {
    modalError('A senha deve ter no mínimo 8 caracteres!');
    inputs[2].value = '';
    inputs[3].value = '';
} else {
    modalSuccess('Registro Efetuado com sucesso!');
    // Api.registerUser(registrationData);
}
        
}

