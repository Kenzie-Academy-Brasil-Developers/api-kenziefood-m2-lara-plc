import { Api } from "../models/Api.js";
import { ProductHome } from "../models/ProductHome.js";

const listProducts = await Api.getPublicProducts()


//teste para ver a estrutura do card prassando uma lista com um produto apenas:
ProductHome.createCards(listProducts)

let search_term = ''
function search(e){
    const search_term = e.target.value
    const filteredProducts = listProducts.filter(
        function(product){
        return product.nome.toLowerCase().includes(search_term.toLowerCase()) ||
                    product.categoria.toLowerCase().includes(search_term.toLowerCase())
    });
    const displayContent = document.getElementById('products-display')
    displayContent.innerHTML = ''
    ProductHome.createCards(filteredProducts)
}

const search_input = document.getElementsByClassName('search-input')[0]
search_input.addEventListener('input', search)
  

function filterCards(event){
    const filteredProducts = event.target.listProducts.filter(
        function(product){
            if(event.target.innerText != "Todos"){
            return product.categoria.includes(event.target.innerText)
            }if(event.target.innerText == "Todos"){
            return true
            }
    })
    const displayContent = document.getElementById('products-display')
    displayContent.innerHTML = ''
    ProductHome.createCards(filteredProducts)
}


const todosFilter = document.getElementById('todos-filter')
todosFilter.listProducts = listProducts
todosFilter.addEventListener("click", filterCards)

const panificadoraFilter = document.getElementById('panificadora-filter')
panificadoraFilter.listProducts = listProducts
panificadoraFilter.addEventListener("click", filterCards)

const frutasFilter = document.getElementById('frutas-filter')
frutasFilter.listProducts = listProducts
frutasFilter.addEventListener("click", filterCards)

const bebidasFilter = document.getElementById('bebidas-filter')
bebidasFilter.listProducts = listProducts
bebidasFilter.addEventListener("click", filterCards)



/*---------------------Carrinho Mobile/Desktop---------------------*/

const cartButton = document.getElementsByClassName('cart-btn');

cartButton[0].addEventListener('click', openModal);

function openModal() {
    const cartDiv = document.querySelector('div.cart');
    const cartTotal = document.querySelector('div.cart-total');

    cartTotal.style.visibility = 'visible'
    cartDiv.style.display = 'grid';
    cartDiv.style.visibility = 'visible';

    const closeBtn = document.createElement('p');
    const cartHeader = document.querySelector('div.cart-content-wrapper');

    closeBtn.classList.add('close-modal-btn')
    closeBtn.innerText = 'x';
    closeBtn.style.position = 'absolute';
    closeBtn.style.left = '330px';
    closeBtn.style.fontSize = '35px';
    closeBtn.style.fontWeight = '400';
    closeBtn.addEventListener('click', closeModal);
    cartHeader.appendChild(closeBtn);
}

function closeModal () {
    const cartDiv = document.querySelector('div.cart');
    const cartTotal = document.querySelector('div.cart-total');
    cartDiv.style.visibility = 'hidden';
    cartTotal.style.visibility = 'hidden';
}

