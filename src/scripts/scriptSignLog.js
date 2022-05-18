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

<<<<<<< HEAD
function loginUserData(e) {
    e.preventDefault();
    Api.loginUser(getUserData());
=======
async function loginUserData(e) {
    e.preventDefault();
    console.log(await Api.loginUser(getUserData()));
    if (await Api.loginUser(getUserData()) != '') {
        await Api.loginUser(getUserData());
        location.replace('/pages/dashboard.html');
    } else {
        modalError('Dados Incorretos')
    }
    ;
    
>>>>>>> a0496724f3aa16c643247dd42997843227a85204
}


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
    
<<<<<<< HEAD
function sendData(e) {
=======
async function sendData(e) {
>>>>>>> a0496724f3aa16c643247dd42997843227a85204
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
<<<<<<< HEAD
    // Api.registerUser(registrationData);
}
        
}

=======
    await Api.registerUser(registrationData);
}

}

const acessoSemCadastro = document.querySelector('a.form-acesso-sem-cadastro');
console.log(acessoSemCadastro);
acessoSemCadastro.addEventListener('click', logInSemCadastro);

function logInSemCadastro(e) {
    e.preventDefault();
    location.replace('/index.html');
}
>>>>>>> a0496724f3aa16c643247dd42997843227a85204

/*---------------Botoes Login e Singup---------------*/

const buttonLogin = document.getElementsByClassName('button-login');

const buttonSingUp = document.getElementsByClassName('button-singup');

buttonLogin[0].addEventListener('click', (e)=> {
    e.preventDefault();
    const formLogin = document.getElementsByClassName('form-login');
    const formSingUp = document.getElementsByClassName('form-singup');
    buttonLogin[0].style.backgroundColor = 'var(--grey-1)';
    buttonSingUp[0].style.backgroundColor = 'var(--primary-color)';
    buttonLogin[0].style.color = 'var(--grey-4)';
    buttonSingUp[0].style.color = 'var(--grey-1)';
    formLogin[0].style.display = 'grid';
    formSingUp[0].style.display = 'none';
})

buttonSingUp[0].addEventListener('click', (e)=> {
    e.preventDefault();
    const formLogin = document.getElementsByClassName('form-login');
    const formSingUp = document.getElementsByClassName('form-singup');
    buttonLogin[0].style.backgroundColor = 'var(--primary-color)';
    buttonSingUp[0].style.backgroundColor = 'var(--grey-1)';
    buttonSingUp[0].style.color = 'var(--grey-4)';
    buttonLogin[0].style.color = 'var(--grey-1)';
    formLogin[0].style.display = 'none';
    formSingUp[0].style.display = 'grid';
})
