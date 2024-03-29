import { TemplateDashProducts } from "../models/TemplateDashProducts.js";

localStorage.getItem('token') ?
null :
window.location.href = "/index.html"

TemplateDashProducts.getMyProductsFilter('Todos')



if(localStorage.getItem('user')) {
    document.querySelector('#nameUser').innerText = localStorage.getItem('user')
}

document.querySelector('.addProduct').addEventListener('click', function() {
    TemplateDashProducts.showModal()
    
})

const drop = document.querySelector('.dropdown img') 
drop.addEventListener('click', () => {
    drop.classList.toggle('show-drop')
})


const filters = document.querySelectorAll('.filter div')

filters.forEach((filter) => {
    filter.addEventListener('click', () => {
        filters.forEach((filter) => filter.classList.remove('active-filter'))
        filter.classList.add('active-filter')

        TemplateDashProducts.getMyProductsFilter(`${filter.innerText}`)
        
    })



})

const search = document.querySelector('#search-input')
search.addEventListener('input', () =>  TemplateDashProducts.getMyProductsSearch(search.value))

const logout = document.querySelector('#logout')
logout.addEventListener('click', () => {
    localStorage.removeItem('token')
    window.location.href = "/pages/login.html"
})

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











