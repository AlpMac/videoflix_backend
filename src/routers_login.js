import { Router } from "express";
import ControllerLogin from '../src/controllers/controller.login.js';

//Ira manipular todas as rotas da aplicação
const routerLogin = Router();


routerLogin.get('/Login', ControllerLogin.listarLogin);

routerLogin.post('/Login', ControllerLogin.inserirLogin);

//routerLogin.put('/Login', ControllerLogin.editarLogin);

//routerLogin.delete('/Login', ControllerLogin.deletarLogin);

export default routerLogin;