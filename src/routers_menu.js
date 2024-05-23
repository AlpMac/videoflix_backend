import { Router } from "express";
import ControllerMenu from '../src/controllers/controller.menu.js';

//Ira manipular todas as rotas da aplicação
const routerMenu = Router();


routerMenu.get('/Menu', ControllerMenu.listarMenu);

routerMenu.post('/Menu', ControllerMenu.inserirMenu);

routerMenu.put('/Menu', ControllerMenu.editarMenu);

routerMenu.delete('/Menu', ControllerMenu.deletarMenu);

export default routerMenu;