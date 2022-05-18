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

