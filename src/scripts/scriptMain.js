import { Api } from "../models/Api.js";
import { ProductHome } from "../models/ProductHome.js";

const listProducts = await Api.getPublicProducts()
ProductHome.buildCart()

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

    const closeBtn = document.querySelector('.x')
    const cartHeader = document.querySelector('div.cart-content-wrapper');

    
    closeBtn.style.fontWeight = '400';
    closeBtn.style.display = 'block'
    closeBtn.addEventListener('click', closeModal);
    cartHeader.appendChild(closeBtn);
}

function closeModal () {
    const cartDiv = document.querySelector('div.cart');
    const cartTotal = document.querySelector('div.cart-total');
    cartDiv.style.visibility = 'hidden';
    cartTotal.style.visibility = 'hidden';
}



const dropdown = document.querySelector('.dropdown-content')
console.log(dropdown)

if(localStorage.getItem('token')) {

    dropdown.innerHTML = `<a href="./pages/login.html" class="title-1-grey-4" id="logout"><span class="material-icons">
    logout
</span>Logout</a>
    <a href="./pages/dashboard.html" class="title-1-grey-4" id="drop-2"><span class="material-icons">
    dashboard
    </span>Dashboard</a>`

} else {

    dropdown.innerHTML = `<a href="./pages/login.html" class="title-1-grey-4" id="drop-1"><span class="material-icons">
    how_to_reg
    </span>Cadastro/Login</a>`

}

const logout = document.querySelector('#logout')

if(logout) {
    logout.addEventListener('click', () => {
        localStorage.removeItem('token')
        window.location.href = "/pages/login.html"
    })

}

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


const dropdow = document.querySelector('.dropdown')
dropdow.addEventListener('click', () => {
    const content = document.querySelector('.dropdown-content')
    if(content.style.display === 'block') {
        content.style.display = 'none'
    } else {
        content.style.display = 'block'
    }
})


