import { Api } from "./Api.js";

export class ProductHome {
    
    static arrayProducts = [];
    
    static createCards(listProducts) {
        listProducts.forEach(product => {
            
            const card = this.createCard(product)
            const display = document.getElementsByClassName('products-display')[0]
            display.appendChild(card)
            
        })
        
    }


    static createCard(product) {


        const {imagem, nome, descricao, categoria, preco, id} = product
        
        const productCard = document.createElement('div')
        productCard.classList.add('product-wrapper')
        productCard.id = id
    

        const imgCard = document.createElement('img')
        imgCard.src = imagem


        const infoNome = document.createElement('p')
        infoNome.classList.add('product-title', 'title-1-grey-4')
        infoNome.innerText = nome

        const descriptionInfo = document.createElement('p')
        descriptionInfo.classList.add('body-text-grey-3', 'description')
        descriptionInfo.innerText = descricao


        const categories = document.createElement('div')
        categories.classList.add('filter-options')
        
        
        //array de categorias???? não achei nenhum produto com mais de uma... 

        if(typeof descricao !== 'string') {
            categoria.forEach((el) => { 
            const p = document.createElement('p')
            p.classList.add('caption-text-grey-3')
            p.innerText = el

            categories.append(p)

            })
        } else {
            const p = document.createElement('p')
            p.classList.add('caption-text-grey-3')
            p.innerText = categoria

            categories.append(p)

        }

        const divPriceAndBuy = document.createElement('div')
        divPriceAndBuy.classList.add('price-cart')

        const price = document.createElement('p')
        price.classList.add('title-2-grey-4')
        price.innerText = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(parseInt(preco))


        const buttonBuy = document.createElement('button')
            const cartImg = document.createElement('img')
            cartImg.src = "./src/imgs/cart_green.png"
            buttonBuy.appendChild(cartImg)
        buttonBuy.addEventListener('click', () => {
                if (localStorage.getItem('product') === null) {
                    this.setLocalStorage();
                } else {
                this.sendProductToLocalStorage(product)}
            }) //ao clicar, chama a funcao addCart e passa o objeto produto

        divPriceAndBuy.append(price,buttonBuy)
        

        productCard.append(imgCard,infoNome,descriptionInfo,categories,divPriceAndBuy)


        return productCard

    }

    static sendProductToLocalStorage(product) {
        this.arrayProducts.push(product)
        this.setLocalStorage()
    }

    static setLocalStorage() {
        localStorage.setItem('product', JSON.stringify(this.arrayProducts));
        this.buildCart();
    }

    static getProducts() {
        const cards = [];
        
        this.arrayProducts.forEach(produto => {
            const img = document.createElement('img');
            img.classList.add('product-image');
            img.src = `${produto.imagem}`;
            img.style.borderRadius = '10px';
    
            const name = document.createElement('p');
            name.classList.add('product-name');
            name.innerText = `${produto.nome}`;
            name.style.fontWeight = '600';
            name.style.color = 'var(--grey-4)';
    
            const category = document.createElement('p');
            category.classList.add('product-category');
            category.innerText = `${produto.categoria}`;
            category.style.color = 'var(--grey-3)';
    
            const price = document.createElement('p');
            price.classList.add('product-price')
            let value = produto.preco;
            price.innerText = `${new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(value)}`;
            price.style.color = 'var(--grey-4)';
    
            const qntdController = document.createElement('div');
            qntdController.classList.add('qntd-controller');
    
            const qntd = document.createElement('span');
            qntd.innerText = 1;
    
            const add = document.createElement('button');
            add.innerText = '+';
            add.style.width = '15px';
            add.style.height = '15px';
            add.style.borderTopRightRadius = '50%';
            add.style.borderBottomRightRadius = '50%';
            add.addEventListener('click', (e) => {
                e.preventDefault();
                if (Number(qntd.innerText) >= 0) {
                    qntd.innerText = Number(qntd.innerText) + 1;
                }
            });
    
            const minus = document.createElement('button');
            minus.innerText = '-';
            minus.style.width = '15px';
            minus.style.height = '15px';
            minus.style.borderTopLeftRadius = '50%';
            minus.style.borderBottomLeftRadius = '50%';
            minus.addEventListener('click', (e) => {
                e.preventDefault();
                if (Number(qntd.innerText) > 0) {
                    qntd.innerText = Number(qntd.innerText) - 1;
                }
            });
            
            console.log(qntd.innerText)
            qntdController.append(minus, qntd, add);
            const trashBtn = document.createElement('img');
            trashBtn.src = '/src/imgs/trash.png';
            trashBtn.classList.add('trash-icon');
            trashBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const id = produto.id;
                const result = this.arrayProducts.findIndex(produto => produto.id === id);
                if (result >= 0) {
                    this.arrayProducts.splice(result, 1);
                    localStorage.setItem('product', JSON.stringify(this.arrayProducts));
                    this.buildCart();
                }
            
            });
    
            const cartCard = document.createElement('div');
            cartCard.classList.add('product-div-cart');
            cartCard.append(img, name, category, price, qntdController, trashBtn);
            cards.push(cartCard);
    
        });
        return cards;
    }

    static buildCart() {
        const cart = document.querySelector('div.cart-product-wrapper');
        
        cart.innerHTML = '';
    
        const cards = this.getProducts();
    
        cart.append(...cards);
        this.setAmount();
        this.setPrice();
    }

    static setAmount() {
        const amount = document.getElementById('amount');
        amount.innerText = this.arrayProducts.length;
    }

    static setPrice() {
        const price = document.getElementById('total-price');
        let total = 0;
        this.arrayProducts.forEach((obj)=>{
            total = total + obj.preco;
        });
        price.innerText = `${new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(total)}`;
    }

}
