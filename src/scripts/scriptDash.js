import { TemplateDashProducts } from "../models/TemplateDashProducts.js";

localStorage.getItem('token') ?
null :
window.location.href = "/index.html"


TemplateDashProducts.getMyProducts()

document.querySelector('.addProduct').addEventListener('click', function() {
    TemplateDashProducts.showModal()
    
})
