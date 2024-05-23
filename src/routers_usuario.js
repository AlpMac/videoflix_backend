import { Router } from "express";
import ControllerUsuario from '../src/controllers/controller.usuario.js';

//Ira manipular todas as rotas da aplicação
const routerUsuario = Router();


routerUsuario.get('/Usuario', ControllerUsuario.listarUsuario);

routerUsuario.post('/Usuario', ControllerUsuario.inserirUsuario);

routerUsuario.put('/Usuario', ControllerUsuario.editarUsuario);

routerUsuario.delete('/Usuario', ControllerUsuario.deletarUsuario);

export default routerUsuario;