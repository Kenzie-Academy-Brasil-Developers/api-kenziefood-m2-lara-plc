export class Api {

/*{
	"id": "255sdasda15wdaasd5asdasd1551.@asdasdasdasasd5215das1d8adasd8ad", //Criptografado
	"name": "Kenzinho",
	"email": "kenzinho@gmail.com",
	"password": "2asd5sa55asdasd4s1d5ads14sd@sda5sd1#sd41as5d", // Criptografado
	"updatedAt": "2022-05-17T21:14:23.987Z",
	"createdAt": "2022-05-17T21:14:23.987Z"
}*/

    static async registerUser(data) {
        /*{
	        "name": "Kenzinho",
	        "email": "kenzinho@gmail.com",
	        "password": "1234"
        }*/

        //Não pode ser cadastrado o mesmo email, uma conta por email, idela é que cada equipe tenha apenas uma conta

        const response = await fetch(
            "https://api-kenzie-food.herokuapp.com/auth/register",
            {
              method: "POST", 
              headers: {
                "Content-Type": "application/json", 
              },
              body: JSON.stringify(data), 
            })
            .then((res) => res.json())
            .then((res) => res)
            .catch((error) => {error})
            localStorage.setItem('user', response.name)
            return response

            /*{
	        "id": "255sdasda15wdaasd5asdasd1551.@asdasdasdasasd5215das1d8adasd8ad", //Criptografado
	        "name": "Kenzinho",
	        "email": "kenzinho@gmail.com",
	        "password": "2asd5sa55asdasd4s1d5ads14sd@sda5sd1#sd41as5d", // Criptografado
	        "updatedAt": "2022-05-17T21:14:23.987Z",
	        "createdAt": "2022-05-17T21:14:23.987Z"
            }
            */
        
    }

    static async loginUser(data) {

        const token = await fetch(
          "https://api-kenzie-food.herokuapp.com/auth/login",
          {
            method: "POST", 
            headers: {
              "Content-Type": "application/json", 
            },
            body: JSON.stringify(data), 
          })
          .then((res) => res.json())
          .then((res) => res)
          .catch((error) => error)
        
        localStorage.setItem('token',token)
      
        return token
    }

    static async getPublicProducts() {
        const products = await fetch('https://api-kenzie-food.herokuapp.com/products', {
          method: "GET", 
          headers: {
            "Content-Type": "application/json", 
          },
          })
          .then(res => res.json())
          .then(data => data)
    
        return products

        //retorna array de produtos
        /*[{
		    "id": "97e3e9db-dd3f-42b2-a838-ff505a020213",
		    "nome": "Panqueca de banana com aveia",
		    "preco": 20,
		    "categoria": "Panificadora",
		    "descricao": "Esta receita serve muito bem 2 pessoas, deixa a gente bem satisfeito, se não tiver outra opção de café. Se tiver mais comida, como pães e frutas.",
		    "imagem": "https://kenzie-academy-brasil.gitlab.io/fullstack/frontend/modulo2/sprint4/img/capstone-images/panqueca.png",
		    "createdAt": "2022-05-16T06:53:33.405Z",
		    "updatedAt": "2022-05-16T06:53:33.405Z"
	    },...]
        */
    }

    static async getPrivateProducts() {
    
        const productsPrivate = await fetch('https://api-kenzie-food.herokuapp.com/my/products', {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}` 
          }
          })
          .then(res => res.json())
          .then(data => data)
    
        return productsPrivate
    }

    static async createProduct(data) {
        /*{
	        "nome": "Bolinho",
	        "preco": 5,
	        "categoria": "Doce",
	        "imagem": "https://picsum.photos/200/300",
	        "descricao" : "Lorem ipsum",
        }*/

        //todos esses dados são obrigatórios!

        const newProduct = await fetch(
            "https://api-kenzie-food.herokuapp.com/my/products",
            {
              method: "POST", 
              headers: {
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${localStorage.getItem('token')}`  
              },
              body: JSON.stringify(data), 
            })
            .then((res) => res.json())
            .then((res) => res)
            .catch((error) => error)

        return newProduct
        //irá retornar um objeto com um id do produto, que podemos guardar em um atributo do elemento para termos acesso quando formos editar ou deletar o produto

    }

    static async editProduct(data, idProduct) {
        /*{
	        "nome": "Bolinho",
	        "preco": 5,
	        "categoria": "Doce",
	        "imagem": "https://picsum.photos/200/300",
	        "descricao" : "Lorem ipsum",
        }*/
        //um ou mais desses dados para alteração

        const editedProduct = await fetch(
            `https://api-kenzie-food.herokuapp.com/my/products/${idProduct}`,
            {
              method: "PATCH", 
              headers: {
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${localStorage.getItem('token')}` 
              },
              body: JSON.stringify(data), 
            })
            .then((res) => res)
            .catch((error) => error)

        return editedProduct

    }

    static async deleteProduct(idProduct) {
        const deletedProduct = await fetch(
            `https://api-kenzie-food.herokuapp.com/my/products/${idProduct}`,
            {
              method: "DELETE", 
              headers: {
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${localStorage.getItem('token')}` 
              }
            })
            .then((res) => res)
            .catch((error) => error)

        return deletedProduct

    }

    //Extras
    //Ainda não testei!

    static async getProductsCart() {

        const cartProducts = await fetch('https://api-kenzie-food.herokuapp.com/cart', {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}` 
          }
          })
          .then(res => res.json())
          .then(data => data)
    
        return cartProducts

        /*Essa rota retorna todos os produtos que foram adicionados ao carrinho entre duas chaves:

        quantity: Total do mesmo produto no carrinho

        products: Dados desse produto*/

    }

    static async addProductToCart(product) {

        /*product_id: Deve ser uma string referente ao id criptografado do produto
        quantity: Número inteiro positivo, referente a quantidade desse produto 
        que será adicionado, item opcional, caso não seja passado, será adicionado 
        uma unidade ao produto no carrinho, ou criado o mesmo com uma unidade.*/

        const cartProduct = await fetch(
            "https://api-kenzie-food.herokuapp.com/cart/add",
            {
              method: "POST", 
              headers: {
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${localStorage.getItem('token')}`  
              },
              body: JSON.stringify(product), 
            })
            .then((res) => res.json())
            .then((res) => res)
            .catch((error) => error);

        return cartProduct;

    }

    static async deleteProductCart(idProduct) {
        const deletedProductCart = await fetch(
            `https://api-kenzie-food.herokuapp.com/cart/remove/${idProduct}`,
            {
              method: "DELETE", 
              headers: {
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${localStorage.getItem('token')}` 
              }
            })
            .then((res) => res)
            .catch((error) => error);

        return deletedProductCart

    }


}