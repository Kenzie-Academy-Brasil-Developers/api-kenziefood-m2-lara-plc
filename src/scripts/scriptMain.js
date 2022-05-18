import { Api } from "../models/Api.js";
import { ProductHome } from "../models/ProductHome.js";

const listProducts = await Api.getPublicProducts()
console.log(listProducts)


//teste para ver a estrutura do card prassando uma lista com um produto apenas:
ProductHome.createCards(listProducts)


const todosFilter = document.getElementById('todos-filter')
console.log(todosFilter)
todosFilter.listProducts = listProducts
todosFilter.addEventListener("click", ProductHome.filterCards)

const panificadoraFilter = document.getElementById('panificadora-filter')
panificadoraFilter.listProducts = listProducts
panificadoraFilter.addEventListener("click", ProductHome.filterCards)

const frutasFilter = document.getElementById('frutas-filter')
frutasFilter.listProducts = listProducts
frutasFilter.addEventListener("click", ProductHome.filterCards)

const bebidasFilter = document.getElementById('bebidas-filter')
bebidasFilter.listProducts = listProducts
bebidasFilter.addEventListener("click", ProductHome.filterCards)



/*---------------------Carrinho Mobile---------------------*/

const cartButton = document.getElementsByClassName('cart-btn');
const closeCartButton = document.querySelector('button.close-cart-modal');

cartButton[0].addEventListener('click', openModal);
closeCartButton.addEventListener('click', closeModal)

function openModal() {
    const modalCartMobile = document.querySelector('div.modal-cart');
    const main = document. querySelector('div.grid');
    main.style.opacity = '0.5';
    modalCartMobile.style.opacity = '1';
    modalCartMobile.style.display = 'grid';
}

function closeModal() {
    const modalCartMobile = document.querySelector('div.modal-cart');
    const main = document. querySelector('div.grid');
    main.style.opacity = '1';
    modalCartMobile.style.display = 'none';
}

console.log(await Api.getProductsCart());

