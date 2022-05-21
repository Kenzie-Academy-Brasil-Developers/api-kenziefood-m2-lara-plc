import { Api } from "../models/Api.js"



const inputs = document.querySelectorAll('input')
inputs.forEach((input) => {
    input.addEventListener('input', function() {
        input.value !== '' ?

        input.nextElementSibling.classList.add('fill') :

        input.nextElementSibling.classList.remove('fill')

        const error = document.getElementById('div-error');
        error.classList.remove('password-error');
        error.firstChild.textContent = '';

    })
})

/*---------------Login de Usuário---------------*/ 

const formLogin = document.getElementsByClassName('form-login');
formLogin[0].addEventListener('submit', loginUserData);
const inputsLogin = document.querySelectorAll('.form-login input')

/*inputsLogin.forEach((input) => {
    if(localStorage.getItem(`${input.name}-kenzieFood`)) {
        input.value = localStorage.getItem(`${input.name}-kenzieFood`)
        input.nextElementSibling.classList.add('fill')
    }
})*/




function getUserData() {
    const loginData = {};

    inputsLogin.forEach((input) => {
        loginData[input.name] = input.value;
    })

    return loginData;
}

async function loginUserData(e) {
    e.preventDefault();
    const userData = getUserData()

    const result = await Api.loginUser(userData)

    if (result.error) {
        modalError('Dados Incorretos')
    } else {
        location.replace('/index.html');
    }
     
     
}



/*---------------Registro de Usuário---------------*/ 

const formSingUp = document.getElementsByClassName('form-singup');
const inputsSing = document.querySelectorAll('.form-singup input');



function getData() {
    const registrationData  = {};
    inputsSing.forEach((input) => {
        registrationData[input.name] = input.value;
    })

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

    if (validatePassword(inputsSing[2].value, inputsSing[3].value) === false) {

    modalError('As senhas digitadas não conferem!');
    inputsSing[3].value = '';

} else if (validateEmail(inputsSing[1].value) === false) {
    modalError('Use um email válido!');
    inputsSing[1].value = '';
} else if (inputsSing[2].value.length < 8) {
    modalError('A senha deve ter no mínimo 8 caracteres!');
    inputsSing[2].value = '';
    inputsSing[3].value = '';
} else {

    const registrationData = getData()
    
    const result = await Api.registerUser(registrationData);
    if(result) {
        const {email,password} = registrationData
        
        const login = await Api.loginUser({email,password})

        if(!login.error) {
            
            modalSuccess('Registro Efetuado com sucesso!');
            setTimeout(() => {
                location.replace('/index.html')
                
            }, 1000);
        }

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






const labels = document.querySelectorAll('.modal-forms label') 
labels.forEach((label) =>
    label.addEventListener('click', function(e) {
        e.target.previousElementSibling.focus()

    })
)

const seePasswords = document.querySelectorAll('#eye')

seePasswords.forEach((seePassword) => 
    seePassword.addEventListener('click', () => {
    if(seePassword.innerText === 'visibility_off') {
        seePassword.innerText = 'visibility'
        seePassword.nextElementSibling.type = 'text'
    } else {
        seePassword.innerText = 'visibility_off'
        seePassword.nextElementSibling.type = 'password'
    }
}))

const darkLight = document.getElementById('input-checkbox')

darkLight.addEventListener('change', () => {
    document.querySelector('html').classList.toggle('dark')
    if(darkLight.checked == true) {
        localStorage.setItem('dark', true)
    } else {
        localStorage.setItem('dark', false)   
    }
})

const dark = localStorage.getItem('dark')

if(dark == 'true') {
    darkLight.checked = true
    document.querySelector('html').classList.add('dark')
} else {
    document.querySelector('html').classList.remove('dark')
}


