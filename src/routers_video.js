import { Router } from "express";
import ControllerVideo from '../src/controllers/controller.video.js';

//Ira manipular todas as rotas da aplicação
const routerVideo = Router();


routerVideo.get('/video/:id?', ControllerVideo.listarVideo);

routerVideo.post('/video', ControllerVideo.inserirVideo);

routerVideo.put('/video', ControllerVideo.editarVideo);

routerVideo.delete('/video', ControllerVideo.deletarVideo);

export default routerVideo;