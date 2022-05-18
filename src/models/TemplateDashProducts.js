import { Api } from './Api.js'
export class TemplateDashProducts {

    static changes = {}

    static getMyProducts(myProducts) {
        
        const container = document.querySelector('#container-productsEdit')
        container.innerHTML = ''


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
        delet.addEventListener('click', () => this.modalDelete(product.id))

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

        const divFundo = document.createElement('div')
        divFundo.classList.add('fundo-modal')

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
                <label for="preco">Valor do produto</label>
                <input type="text" name="preco" id="" placeholder="Digite o valor aqui">
            </div>
    
            <div class="box-label">
                <label for="imagem">Link da imagem</label>
                <input type="text" name="imagem" id="" placeholder="Inserir link">
            </div>
    
        </form>
        
        `  

        divFundo.append(divModal)
        
        document.body.append(divFundo)
        
        const form = document.querySelector('#form')
        if(product) {
            
            
            const buttonsEdit = document.createElement('div')
            buttonsEdit.id = 'buttons-edit'
            buttonsEdit.innerHTML = '<button id="cancelEdits">Excluir</button><button id="saveEdits">Salvar alterações</button>'
            
            form.append(buttonsEdit)
            
            this.putInfoProdut(product) 

            const cancelEdits = document.querySelector('#cancelEdits')
            cancelEdits.addEventListener('click', (e) => {
                e.preventDefault()
            
                this.putInfoProdut(product)

            })

            const saveEdits = document.querySelector('#saveEdits')

            saveEdits.addEventListener('click', async (e) => {
                e.preventDefault()
                const changes = TemplateDashProducts.changes
                
                    const result = await Api.editProduct(changes,product.id)
                    document.body.removeChild(divFundo)

                    if(!result.ok) {

                        this.modalSuccessOrError(false, 'Ocorreu algum erro, o produto não foi alterado')

                    } else {

                        this.modalSuccessOrError(true, 'Produto alterado com sucesso')

                    }
                    this.getMyProducts()
                    
            })
            
            
        } else {

            form.innerHTML += '<button id="add">Cadastrar Produto</button>'

            const div = document.querySelector('.categories-edit div')
            const categories = document.querySelectorAll('.categories-edit div p')
            div.addEventListener('click', (e) => {
                if(e.target.id) {
                    categories.forEach((category) => {
                        category.classList.remove('choose')
                    })
                    e.target.classList.add('choose')
                }
            })

            const addProduct = document.querySelector('#add')
            addProduct.addEventListener('click', (e) => {
                e.preventDefault()
                this.getNewProduct(divFundo)
            })

        }

        const close = document.querySelector('.close')
        close.addEventListener('click', () => {
            document.body.removeChild(divFundo)

        })
        

    }

    static async getNewProduct(divModal) {
        const data = {}
        const inputs = document.querySelectorAll('.modal-add input')

        inputs.forEach((input) => {
            data[input.name] = input.value
        })

        const category = document.querySelector('.choose')
        data.categoria = category.innerText

        data.preco = Number(data.preco)

        if(data.preco>=0) {
            
            const result = await Api.createProduct(data)

            document.body.removeChild(divModal)

            if(result.error) {

                this.modalSuccessOrError(false, 'Ocorreu algum erro, o produto não foi adicionado')

            } else {

                this.modalSuccessOrError(true, 'Produto adicionado com sucesso')
            }

            this.getMyProducts()


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

    static modalDelete(id) {

        const modalBackgroundDelete = document.createElement('div')
        modalBackgroundDelete.classList.add('modal-deleteBack')

        const divModal = document.createElement('div')
        divModal.classList.add('modal-delete')
        divModal.innerHTML = `
        <div class="header"><p class="tittle">Exclusão do produto</p><div class="closeDelete">x</div></div>
        <div>Tem certeza que deseja excluir esse produto?</div>
        <div id="buttons-delete"><button id="confirmDelete">Sim</button><button id="cancelDelete">Não</button></div>
        `  

        modalBackgroundDelete.append(divModal)
        
        document.body.append(modalBackgroundDelete)

        const confirm = document.querySelector('#confirmDelete')
        const cancel = document.querySelector('#cancelDelete')
        const close = document.querySelector('.closeDelete')

        close.addEventListener('click', () => {
            document.body.removeChild(modalBackgroundDelete)
        })

        cancel.addEventListener('click', () => {
            document.body.removeChild(modalBackgroundDelete)
        })

        confirm.addEventListener('click', async () => {
            const result = await Api.deleteProduct(id)
            document.body.removeChild(modalBackgroundDelete)

            if(!result.ok) {

                this.modalSuccessOrError(false, 'Ocorreu algum erro, o produto não foi deletado')

            } else {

                this.modalSuccessOrError(true, 'Produto deletado com sucesso')

            }
            
            this.getMyProducts()
        })

    }

    static modalSuccessOrError(success,message) {

        const divModal = document.createElement('div')
        divModal.classList.add('modal-success')
        divModal.innerHTML = `
        <div class="header"><p class="tittle">Status</p><div class="closeSuccess">x</div></div>
        <div id="message">${message}</div>
        <div class="bottom" id="${success ? 'green' : 'red'}"></div>
        `  
        
        document.body.append(divModal)

        const close = document.querySelector('.closeSuccess')

        close.addEventListener('click', () => {
            document.body.removeChild(divModal)
        })

        setTimeout(() => {
            document.body.removeChild(divModal)
            
        }, 3000);

    }

    static async getMyProductsFilter(filter) {
        const myProducts = await Api.getPrivateProducts()

        if(filter==='Todos') {
            this.getMyProducts(myProducts)
        } else {
            const productsFiltered = myProducts.filter((product) => product.categoria == filter)
            this.getMyProducts(productsFiltered)
        }
    }

    static async getMyProductsSearch(search) {
        const myProducts = await Api.getPrivateProducts()

        search = search.toLowerCase()

        const productsFiltered = myProducts.filter((product) => product.nome.toLowerCase().includes(search))
        this.getMyProducts(productsFiltered)



    }
}