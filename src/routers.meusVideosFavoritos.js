import { Router } from "express";
import ControllerMeusVideosFavoritos from '../src/controllers/controller.meusVideosFavoritos.js';
//Ira manipular todas as rotas da aplicação
const routerMeusVideosFavoritos = Router();


routerMeusVideosFavoritos.get('/meus-videos-favoritos/:id?', ControllerMeusVideosFavoritos.listarMeusVideosFavoritos);



export default  routerMeusVideosFavoritos;
;