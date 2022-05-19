import { Api } from "../models/Api.js";

class Modal{
    static criarModal(){
        const containerModal = document.createElement('div');
        containerModal.classList.add('modal');

        const modal = document.createElement('ul');
        modal.classList.add('modal');

        const wishlist = document.createElement('li')

        const removeModal = document.createElement('button');
        removeModal.classList.add('modal__remove');
        removeModal.innerText = 'Fechar modal';
        removeModal.addEventListener('click', Modal.removerModal);

        modal.appendChild(removeModal);
        containerModal.appendChild(modal);
        modal.appendChild(wishlist);
        document.body.appendChild(containerModal);

        return containerModal
    }

    static removerModal(){
        const modalSelector = document.querySelector('.modal');
        document.body.removeChild(modalSelector);
    }

    static async productsList() {
        const arrayProdutos = await Api.getPublicProducts()
        let ul = document.querySelector('ul')
        console.log(arrayProdutos)
        arrayProdutos.forEach((item) => {
            let li = document.createElement('li')
            let p = document.createElement('p')
            p.innerText = item.nome
            li.appendChild(p)
            ul.appendChild(li)
        })
    }
    static events(){
        const button = document.querySelector('.wishlist')
        console.log(button)
        button.addEventListener('click', this.productsList)
    }
}


export default Modal