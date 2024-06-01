import { Router } from "express";
import ControllerMeusVideos from '../src/controllers/controller.meuVideos.js';
//Ira manipular todas as rotas da aplicação
const routerMeusVideos = Router();


routerMeusVideos.get('/meus-videos/:id?', ControllerMeusVideos.listarMeusVideos);



export default  routerMeusVideos;
;