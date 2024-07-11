import { Router } from "express";
import ControllerNotificacao from '../src/controllers/controller.notificacao.js';

//Ira manipular todas as rotas da aplicação
const routerNotificacao = Router();


routerNotificacao.get('/notificacao', ControllerNotificacao.listarNotificacao);

//routerHome.post('/Home', ControllerHome.inserirHome);

//routerHome.put('/Home', ControllerHome.editarHome);

//routerHome.delete('/Home', ControllerHome.deletarHome);

export default routerNotificacao;