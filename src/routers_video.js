import { Router } from "express";
import ControllerVideo from '../src/controllers/controller.video.js';

const routerVideo = Router();


// Rotas
routerVideo.get('/video/:id?', ControllerVideo.listarVideo);
routerVideo.post('/enviar-video-dados', ControllerVideo.inserirVideo);
routerVideo.put('/video/:id?', ControllerVideo.editarVideo);

routerVideo.delete('/video', ControllerVideo.deletarVideo);

export default routerVideo;
