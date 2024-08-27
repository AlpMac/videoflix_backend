import express from 'express';
import cors from 'cors';    
import routerLogin from './routers_login.js';
import routerMenu from './routers_menu.js';
import routerUsuario from './routers_usuario.js';
import routerVideo from './routers_video.js';
import routerHome from './routers_home.js';  
import routerlistaCanais from './routers_listaCanais.js';
import routerMeusVideos from './routers_meusVideos.js';
import routerMeusVideosFavoritos from './routers.meusVideosFavoritos.js';
import routerMostrarVideoCategoria from './routers_mostrarVideoCategoria.js';
import routerCategoria from './routers_categoria.js';
import routerNotificacao from './routers_notificacao.js';
import routerRelatorios from './routers_relatorios.js';

import routerVideoUpload from './routers_video_upload.js';
import routerAddDeleteVideoFavorito from './routers.AddDeleteVideoFavorito.js';

const app = express();  
// Middleware for parsing JSON data
app.use(express.json());
// Middleware for handling CORS
app.use(cors());
// teste dd

app.use(routerLogin);
app.use(routerMenu);
app.use(routerUsuario);
app.use(routerVideo);
app.use(routerHome);
app.use(routerlistaCanais);  
app.use(routerMeusVideos);
app.use(routerMeusVideosFavoritos);
app.use(routerMostrarVideoCategoria);
app.use(routerCategoria);
app.use(routerNotificacao);
app.use(routerRelatorios);
app.use(routerVideoUpload);
app.use(routerAddDeleteVideoFavorito);
///////////////////////////////////////
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Line to serve static images from the 'envios/thumbnail' directory
app.use('/envios_thumbnail', express.static(path.join(__dirname, 'envios/thumbnail')));
app.use('/envios_imagemPerfil', express.static(path.join(__dirname, 'envios/imagemPerfil')));
//Pegaremos o video 
app.use('/play_video', express.static(path.join(__dirname, 'envios/videos/')));
//Usado para download dos arquivos complementares
app.use('/download_arquivo', express.static(path.join(__dirname, 'envios/arquivos/')));
app.use('/ver_pdf', express.static(path.join(__dirname, 'envios/arquivos/')));



app.listen(3003, () => {
    console.log('Server is running on port 3003');  // Corrected port number
});
