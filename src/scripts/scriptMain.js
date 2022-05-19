import { Api } from "../models/Api.js";
import { ProductHome } from "../models/ProductHome.js";

const listProducts = await Api.getPublicProducts()
console.log(listProducts)


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
    const activeFilter = document.getElementsByClassName('active-filter')[0]
    activeFilter.classList.remove('active-filter')
    const newFilter = event.target
    newFilter.classList.add('active-filter')
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

const dropdown = document.querySelector('.dropdown-content')
console.log(dropdown)

if(localStorage.getItem('token')) {

    dropdown.innerHTML = `<a href="./pages/login.html" class="title-1-grey-4" id="logout">Logout</a>
    <a href="./pages/dashboard.html" class="title-1-grey-4" id="drop-2">Dashboard</a>`

} else {

    dropdown.innerHTML = `<a href="./pages/login.html" class="title-1-grey-4" id="drop-1">Cadastro/Login</a>`

}

const logout = document.querySelector('#logout')
logout.addEventListener('click', () => {
    localStorage.removeItem('token')
    window.location.href = "/pages/login.html"
})

