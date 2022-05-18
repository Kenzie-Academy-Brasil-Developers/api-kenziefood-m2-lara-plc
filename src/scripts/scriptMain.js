import { Api } from "../models/Api.js";
import { ProductHome } from "../models/ProductHome.js";

const listProducts = await Api.getPublicProducts()
console.log(listProducts)


//teste para ver a estrutura do card prassando uma lista com um produto apenas:
ProductHome.createCards([{"id": "97e3e9db-dd3f-42b2-a838-ff505a020213",
"nome": "Panqueca de banana com aveia",
"preco": 25,
"categoria": ["Panificadora", "Frutas"],
"descricao": "Esta receita serve muito bem 2 pessoas, deixa a gente bem satisfeito, se não tiver outra opção de café. Se tiver mais comida, como pães e frutas.",
"imagem": "https://kenzie-academy-brasil.gitlab.io/fullstack/frontend/modulo2/sprint4/img/capstone-images/panqueca.png",
"createdAt": "2022-05-16T06:53:33.405Z",
"updatedAt": "2022-05-16T06:53:33.405Z"}])


const todosFilter = document.getElementById('todos-filter')
todosFilter.listProducts = listProducts
todosFilter.filter = todosFilter.innerText
todosFilter.addEventListener("click", ProductHome.filterCards)

const panificadoraFilter = document.getElementById('panificadora-filter')
panificadoraFilter.listProducts = listProducts
panificadoraFilter.filter = panificadoraFilter.innerText
panificadoraFilter.addEventListener("click", ProductHome.filterCards)

const frutasFilter = document.getElementById('frutas-filter')
frutasFilter.listProducts = listProducts
frutasFilter.filter = frutasFilter.innerText
frutasFilter.addEventListener("click", ProductHome.filterCards)

const bebidasFilter = document.getElementById('bebidas-filter')
bebidasFilter.listProducts = listProducts
bebidasFilter.filter = bebidasFilter.innerText
bebidasFilter.addEventListener("click", ProductHome.filterCards)



/*---------------------Carrinho Mobile/Desktop---------------------*/

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

async function getProducts() {
    const produtos = await Api.getProductsCart();

    const cards = [];
    produtos.forEach(produto => {
        const img = document.createElement('img');
        img.src = `${produto.products.imagem}`;
        img.style.width = '35px';
        img.style.height = '35px';
        img.style.borderRadius = '10px';

        const name = document.createElement('p');
        name.innerText = `${produto.products.nome}`;
        name.style.fontWeight = '400';
        name.style.color = 'var(--grey-4)';

        const category = document.createElement('p');
        category.innerText = `${produto.products.categoria}`;
        category.style.color = 'var(--grey-3)';

        const price = document.createElement('p')
        price.innerText = `${new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(produto.products.preco)}`;
        price.style.color = 'var(--grey-4)';

        const qntdController = document.createElement('div');
        qntdController.classList.add('qntd-controller');

        const qntd = document.createElement('span');
        qntd.innerText = `${produto.quantity}`;

        const add = document.createElement('button');
        add.innerText = '+';
        add.style.width = '10px';
        add.style.height = '10px';
        minus.style.borderTopRightRadius = '50%';
        minus.style.borderBottomRightRadius = '50%';
        add.addEventListener('click', (e) => {
            e.preventDefault();
            qntd.innerText += 1;
        });

        const minus = document.createElement('button');
        minus.innerText = '-';
        minus.style.width = '10px';
        minus.style.height = '10px';
        minus.style.borderTopLeftRadius = '50%';
        minus.style.borderBottomLeftRadius = '50%';
        minus.addEventListener('click', (e) => {
            e.preventDefault();
            qntd.innerText -= 1;
        });

        qntdController.append(minus, qntd, add);

        const trashBtn = document.createElement('button');
        const trashIcon = document.createElement('img');
        trashIcon.style.width = '100%';
        trashIcon.style.height = '100%';
        trashIcon.src = '';
        trashBtn.appendChild(trashIcon);
        trashBtn.style.width = '10px';
        trashBtn.style.height = '10px';
        trashBtn.addEventListener('click', (e) => {
            e.preventDefault();
        })

        const cartCard = document.createElement('div');
        cartCard.classList.add('product-div-cart');
        cartCard.append(img, name, category, price, qntdController, trashBtn);
        cards.push(cartCard);
    });
    return cards;
} 

function buildCart() {
    const cart = document.querySelector('div.cart-product-wrapper');
    const cartList = document.querySelectorAll('div.cart-product-wrapper');
    const mobileCart = cartList[1];
    
    cart.innerHTML = '';
    const cards = getProducts();
    cards.forEach(card => { cart.innerHTML = `${card}`});
    cards.forEach(card => { mobileCart.innerHTML = `${card}`});

}

buildCart() //chamada para testes