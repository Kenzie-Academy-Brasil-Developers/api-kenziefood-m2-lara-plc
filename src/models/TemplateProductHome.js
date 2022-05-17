export class TemplateProductHome {

    static createCards(listProducts) {
        listProducts.forEach(product => {

            const card = this.createCard(product)
            //document.body.append(card) //dar o append na vitrine
               
        })
    }

    static createCard(product) {


        const {imagem, nome, descricao, categoria, preco, id} = product
        
        const productCard = document.createElement('div')
        productCard.classList.add('card__div')
        productCard.id = id
        
        const divCardImage = document.createElement('div')
        divCardImage.classList.add('card__div-image')

        const imgCard = document.createElement('img')
        imgCard.src = imagem

        divCardImage.append(imgCard)

        const divInfoCard = document.createElement('div')
        divInfoCard.classList.add('card__div-info')

        const infoNome = document.createElement('h3')
        infoNome.classList.add('card__h3-name')
        infoNome.innerText = nome

        const descriptionInfo = document.createElement('div')
        descriptionInfo.classList.add('card__div-description')
        descriptionInfo.innerText = descricao

       

        const categories = document.createElement('div')
        categories.classList.add('card__div-category')
        
        
        //array de categorias????

        if(typeof descricao !== 'string') {
            categoria.forEach((el) => { 
            const p = document.createElement('p')
            p.innerText = el

            categories.append(p)

            })
        } else {
            const p = document.createElement('p')
            p.innerText = categoria

            categories.append(p)

        }

        const divPriceAndBuy = document.createElement('div')
        divPriceAndBuy.classList.add('card__div-priceAndBuy')

        const price = document.createElement('p')
        price.classList.add('card__p-price')
        price.innerText = preco

        const buttonBuy = document.createElement('button')
        buttonBuy.innerText = 'Buy'
        buttonBuy.classList.add('card__button-buy')
        buttonBuy.addEventListener('click',() => this.addCart(product)) //ao clicar, chama a funcao addCart e passa o objeto produto

        divPriceAndBuy.append(price,buttonBuy)

        divInfoCard.append(infoNome,descriptionInfo,categories,divPriceAndBuy)

        productCard.append(divCardImage,divInfoCard)


        return productCard

    }

    static addCart(product) {
        //console.log(product)
    }


}