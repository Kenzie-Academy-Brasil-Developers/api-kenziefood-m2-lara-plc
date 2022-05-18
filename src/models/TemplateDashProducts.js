import { Api } from './Api.js'
export class TemplateDashProducts {

    //efeito fundo ao aparecer o modal
    //disabilitar buttons
    //funcionalidade edit
    //funcionalidade delete


    static changes = {}

    static async getMyProducts() {
        const myProducts = await Api.getPrivateProducts()
        const container = document.querySelector('#container-productsEdit')


        myProducts.forEach(product => {
            const element = this.createTemplateProduct(product)
            container.append(element)
        });

    }

    static createTemplateProduct(product) {
        const {imagem, nome, descricao, categoria, preco, id} = product

        const section = document.createElement('section')
        section.id = id

        const divName = document.createElement('div')
        divName.classList.add('product-name')

        const imageProduct = document.createElement('img')
        imageProduct.src = imagem

        const name = document.createElement('h3')
        name.innerText = nome

        divName.append(imageProduct,name)


        const divCategories = document.createElement('div')
        divCategories.classList.add('categories') 

        if(typeof descricao !== 'string') {
            categoria.forEach((el) => { 
            const p = document.createElement('p')
            p.innerText = el

            divCategories.append(p)

            })
        } else {
            const p = document.createElement('p')
            p.innerText = categoria

            divCategories.append(p)

        }

        const divDescription = document.createElement('div')
        divDescription.classList.add('description')

        const description = document.createElement('p')
        description.innerText = descricao

        divDescription.append(description)

        const divActions = document.createElement('div')
        divActions.classList.add('actions')

        const edit = document.createElement('div')
        edit.classList.add('edit')
        edit.addEventListener('click', () => this.showModal(product))
        const delet = document.createElement('div')
        delet.classList.add('delete')

        edit.innerHTML = `<span class="material-icons">
            edit_note
        </span>`

        delet.innerHTML = `<span class="material-icons">
            delete
        </span>`


        divActions.append(edit,delet)

        section.append(divName,divCategories, divDescription, divActions)

        return section
    }

    static showModal(product) {

        product ? 
        this.modalEditCancel('Edição de produto',product) :
        this.modalEditCancel('Cadastro de produto') 

    }

    static modalEditCancel(title, product) {

        const divModal = document.createElement('div')
        divModal.classList.add('modal-add')
        divModal.innerHTML = `
        <div class="header"><p class="tittle">${title}</p><div class="close">x</div></div>
        <form action="" id="form">
            <div class="box-label">
                <label for="nome">Nome do produto</label>
                <input type="text" name="nome" id="" placeholder="Digitar o nome">
            </div>
    
            <div class="box-label descricao-box">
                <label for="descricao">Descrição</label>
                <input type="text" name="descricao" placeholder="Digitar a descrição">
            </div>
            
            <div class="categories-edit">
                <h3>Categorias</h3>
                <div>
                    <p id="Panificadora">Panificadora</p>
                    <p id="Frutas">Frutas</p>
                    <p id="Bebidas">Bebidas</p>
                    <p id="Doce">Doce</p>
    
                </div>
            </div>
    
            <div class="box-label">
                <label for="imagem">Link da imagem</label>
                <input type="text" name="imagem" id="" placeholder="Inserir link">
            </div>
    
        </form>
        
        `  
        
        document.body.append(divModal)
        this.takeBackgroundModal('off')
        
        const form = document.querySelector('#form')
        if(product) {
            this.putInfoProdut(product) 

            
            const buttonsEdit = document.createElement('div')
            buttonsEdit.id = 'buttons-edit'
            buttonsEdit.innerHTML = '<button id="cancelEdits">Excluir</button><button button id="saveEdits">Salvar alterações</button>'

            form.append(buttonsEdit)
            
            
        } else {

            form.innerHTML += '<button id="add">Cadastrar Produto</button>'

        }

        const close = document.querySelector('.close')
        close.addEventListener('click', () => {
            document.body.removeChild(divModal)
            this.takeBackgroundModal('on')

        })

        const cancelEdits = document.querySelector('#cancelEdits')
        cancelEdits.addEventListener('click', (e) => {
            e.preventDefault()
            
            this.putInfoProdut(product)

        })

    }

    static takeBackgroundModal(onOrOff) {

        const main = document.querySelector('main')
        if(onOrOff ==='off') {
            main.style.opacity = '0.5'
            main.style.backgroundColor = 'rgb(29, 27, 27)'
            //disable button
        } else {
            main.style.opacity = '1'
            main.style.backgroundColor = 'transparent'
        }
    }

    static getChangesEdit(inputs, categories, div) {

        div.addEventListener('click', (e) => {
            if(e.target.id) {
                categories.forEach((category) => {
                    category.classList.remove('choose')
                })
                e.target.classList.add('choose')
                TemplateDashProducts.changes.categoria = e.target.innerText

            }
        })

        inputs.forEach((input) => {
            input.addEventListener('input',() => {
                TemplateDashProducts.changes[input.name] = input.value
                
            })
        })

    }

    static putInfoProdut(product) {

        TemplateDashProducts.changes = {}

        const categories = document.querySelectorAll('.categories-edit div p')

        categories.forEach((category) => {
            category.classList.remove('choose')
        })

        const categ = document.querySelector(`#${product.categoria}`)
        categ.classList.add('choose')

        const inputs = document.querySelectorAll('.modal-add input')
        this.getChangesEdit(inputs, categories ,document.querySelector('.categories-edit div'))
        inputs.forEach((input) => {
            input.value = product[input.name]
        })


    }
}