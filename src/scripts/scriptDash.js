import { TemplateDashProducts } from "../models/TemplateDashProducts.js";

TemplateDashProducts.getMyProducts()



document.querySelector('.addProduct').addEventListener('click', function() {
    TemplateDashProducts.showModal()
    
})