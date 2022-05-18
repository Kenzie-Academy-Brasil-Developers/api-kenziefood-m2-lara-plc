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

/*---------------Login de Usuário---------------*/ 

const formLogin = document.getElementsByClassName('form-login');
formLogin[0].addEventListener('submit', loginUserData);

function getUserData() {
    const loginData = {};

    loginData[inputs[4].name] = inputs[4].value;
    loginData[inputs[5].name] = inputs[5].value;

    return loginData;
}


async function loginUserData(e) {
    e.preventDefault();
    const result = await Api.loginUser(getUserData())
    if (result != '') {
        location.replace('/index.html');
    } else {
        modalError('Dados Incorretos')
    }  
}



/*---------------Registro de Usuário---------------*/ 

const formSingUp = document.getElementsByClassName('form-singup');

function getData() {
    const registrationData  = {};
    registrationData[inputs[0].name] = inputs[0].value;
    registrationData[inputs[1].name] = inputs[1].value;
    registrationData[inputs[2].name] = inputs[2].value;

    return registrationData
}
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
    

async function sendData(e) {

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

    const registrationData = getData()
    
    const result = await Api.registerUser(registrationData);
    if(result) {
        modalSuccess('Registro Efetuado com sucesso!');

    }
}
        
}


const cadastro = document.querySelector('#singup');
cadastro.addEventListener('click', irParacadastro);

function irParacadastro(e) {
    e.preventDefault();

    const forms = document.querySelectorAll('form');
    forms.forEach((form) => form.style.display = 'none' )

    const formSing = document.querySelector('.form-singup');
    formSing.style.display = 'grid'

    const formsButtons = document.querySelectorAll('.modal-buttons button')
        
    formsButtons.forEach((button) => {
        button.classList.remove('active')
    })
    document.querySelector('#form-singup').classList.add('active')

}



/*---------------Botoes Login e Singup---------------*/

const formsButtons = document.querySelectorAll('.modal-buttons button')

formsButtons.forEach((button) => {
    button.addEventListener('click',()=> {
        formsButtons.forEach((button) => {
            button.classList.remove('active')
        })
        button.classList.add('active')

        const forms = document.querySelectorAll('form');
        forms.forEach((form) => form.style.display = 'none' )

        const formActual = document.querySelector(`.${button.id}`);
        formActual.style.display = 'grid'   
        
    })
})






const labels = document.querySelectorAll('label') 
labels.forEach((label) =>
    label.addEventListener('click', function(e) {
        e.target.previousElementSibling.focus()

    })
)

