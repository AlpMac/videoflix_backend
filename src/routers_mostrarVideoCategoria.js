import { Router } from "express";
import MostrarVideoCategoria from '../src/controllers/controller.mostraVideoCategoria.js';
//Ira manipular todas as rotas da aplicação
const routerMostrarVideoCategoria = Router();


routerMostrarVideoCategoria.get('/categoria/:id_categoria?', MostrarVideoCategoria.listarVideoCategoria);



export default  routerMostrarVideoCategoria;
