import { Api } from "../models/Api.js";
import { TemplateProductHome } from "../models/TemplateProductHome.js";

const listProducts = await Api.getPublicProducts()
//console.log(listProducts)


//teste para ver a estrutura do card prassando uma lista com um produto apenas:
TemplateProductHome.createCards([{"id": "97e3e9db-dd3f-42b2-a838-ff505a020213",
"nome": "Panqueca de banana com aveia",
"preco": 20,
"categoria": "Panificadora",
"descricao": "Esta receita serve muito bem 2 pessoas, deixa a gente bem satisfeito, se não tiver outra opção de café. Se tiver mais comida, como pães e frutas.",
"imagem": "https://kenzie-academy-brasil.gitlab.io/fullstack/frontend/modulo2/sprint4/img/capstone-images/panqueca.png",
"createdAt": "2022-05-16T06:53:33.405Z",
"updatedAt": "2022-05-16T06:53:33.405Z"}])



