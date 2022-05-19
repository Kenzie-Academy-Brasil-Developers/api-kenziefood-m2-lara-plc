import { Api } from "../models/Api";

class Modal{
    static criarModal(children){
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
        modal.appendChild(children);
        containerModal.appendChild(modal);
        modal.appendChild(wishlist)
        document.body.appendChild(containerModal);
    }

    static removerModal(){
        const modalSelector = document.querySelector('.modal');
        document.body.removeChild(modalSelector);
    }

    static productsList(arrayProdutos = Api.getProductsCart) {
        let ul = document.querySelector('ul')
        console.log(arrayProdutos)
        arrayProdutos.forEach((item) => {
            let li = this.criarModal(item)
            ul.appendChild(li)
        })
    }
}
const button = querySelector('.wishlist')
button.addEventListener('click', productsList())

Modal.criarModal()
Modal.productsList()