export class Api {


    static async registerUser(data) {
        
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
        
    }

    static async editProduct(data, idProduct) {
	      
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

    }

    static async addProductToCart(product) {

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