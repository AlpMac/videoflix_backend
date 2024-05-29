import { Router } from "express";
import ControllerHome from '../src/controllers/controller.home.js';

//Ira manipular todas as rotas da aplicação
const routerHome = Router();


routerHome.get('/', ControllerHome.listarHome);

//routerHome.post('/Home', ControllerHome.inserirHome);

//routerHome.put('/Home', ControllerHome.editarHome);

//routerHome.delete('/Home', ControllerHome.deletarHome);

export default routerHome;