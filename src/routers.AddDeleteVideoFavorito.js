import { Router } from "express";
import ControllerAddDeleteVideoFavorito from '../src/controllers/controller.addDeleteVideoFavorito.js';
//Ira manipular todas as rotas da aplicação
const routerAddDeleteVideoFavorito = Router();


routerAddDeleteVideoFavorito.post('/salvar-favorito', ControllerAddDeleteVideoFavorito.addVideoFavorito);
routerAddDeleteVideoFavorito.delete('/deletar-favorito', ControllerAddDeleteVideoFavorito.deleteVideoFavorito);



export default  routerAddDeleteVideoFavorito;
