import { Router } from "express";
import ControllerlistaCanais from '../src/controllers/controller.listaCanais.js';

//Ira manipular todas as rotas da aplicação
const routerlistaCanais = Router();


routerlistaCanais.get('/listar_canais', ControllerlistaCanais.listarCanais);

export default routerlistaCanais;