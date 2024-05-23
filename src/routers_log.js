import { Router } from "express";
import ControllerLog from '../src/controllers/controller.log.js';

//Ira manipular todas as rotas da aplicação
const routerLog = Router();


routerLog.get('/Log', ControllerLog.listarLog);

routerLog.post('/Log', ControllerLog.inserirLog);

//routerLog.put('/Log', ControllerLog.editarLog);

//routerLog.delete('/Log', ControllerLog.deletarLog);

export default routerLog;