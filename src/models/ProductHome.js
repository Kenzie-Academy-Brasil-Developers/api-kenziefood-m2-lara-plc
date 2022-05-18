export class ProductHome {

    static createCards(listProducts) {
        listProducts.forEach(product => {

            const card = this.createCard(product)
            const display = document.getElementsByClassName('products-display')[0]
            display.appendChild(card)
               
        })
    }

    static filterCards(event){
    
        const filteredProducts = event.listProducts.filter(
            function(product){
                product.categoria.includes(event.filter)

        })
            this.createCards(filteredProducts)

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
        buttonBuy.addEventListener('click',() => this.addCart(product)) //ao clicar, chama a funcao addCart e passa o objeto produto

        divPriceAndBuy.append(price,buttonBuy)

        

        productCard.append(imgCard,infoNome,descriptionInfo,categories,divPriceAndBuy)


        return productCard

    }

    static addCart(product) {
        //console.log(product)
    }


}