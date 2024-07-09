import { Router } from "express";
import ControllerCategoria from '../src/controllers/controller.categoria.js';

//Ira manipular todas as rotas da aplicação
const routerCategoria = Router();


routerCategoria.get('/listar-menu', ControllerCategoria.listarCategoria);

//routerHome.post('/Home', ControllerHome.inserirHome);

//routerHome.put('/Home', ControllerHome.editarHome);

//routerHome.delete('/Home', ControllerHome.deletarHome);

export default routerCategoria;