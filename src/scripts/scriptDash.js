import { TemplateDashProducts } from "../models/TemplateDashProducts.js";

localStorage.getItem('token') ?
null :
window.location.href = "/index.html"


<<<<<<< HEAD
TemplateDashProducts.getMyProducts()
=======
TemplateDashProducts.getMyProductsFilter('Todos')

if(localStorage.getItem('user')) {
    document.querySelector('#nameUser').innerText = localStorage.getItem('user')
}
>>>>>>> a0496724f3aa16c643247dd42997843227a85204

document.querySelector('.addProduct').addEventListener('click', function() {
    TemplateDashProducts.showModal()
    
})
<<<<<<< HEAD
=======

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
>>>>>>> a0496724f3aa16c643247dd42997843227a85204
