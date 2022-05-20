import { Api } from "../models/Api.js"

/*---------------Botoes Login e Singup---------------*/

const formsButtons = document.querySelectorAll('.button')

formsButtons.forEach((button) => {
    button.addEventListener('click',()=> {
        formsButtons.forEach((button) => {
            button.classList.remove('active')
        })
        button.classList.add('active')

        const forms = document.querySelectorAll('.form');
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


