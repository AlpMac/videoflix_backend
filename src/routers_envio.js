import { Router } from "express";
import ControllerEnvios from '../src/controllers/controller.envios.js';

//Ira manipular todas as rotas da aplicação
const routerEnvios = Router();


app.use('/envios', express.static(path.join(__dirname, 'envios/thumbnail')));

export default routerEnvios;