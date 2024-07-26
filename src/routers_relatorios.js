import { Router } from "express";
import ControllerRelatorios from '../src/controllers/controller.relatorios.js';

//Ira manipular todas as rotas da aplicação
const routerRelatorios = Router();


routerRelatorios.get('/mais-videos-enviados', ControllerRelatorios.maisVideosEnviados);

//routerHome.post('/Home', ControllerHome.inserirHome);

//routerHome.put('/Home', ControllerHome.editarHome);

//routerHome.delete('/Home', ControllerHome.deletarHome);

export default routerRelatorios;