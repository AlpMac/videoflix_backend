import express from 'express';
import cors from 'cors';    
import routerLogin from './routers_login.js';
import routerMenu from './routers_menu.js';
import routerUsuario from './routers_usuario.js';
import routerVideo from './routers_video.js';

const app = express();  
// Middleware form parsing JSON data
app.use(express.json());
// Middleware for parsing URL encoded data
app.use(cors());

app.use(routerLogin);
app.use(routerMenu);
app.use(routerUsuario);
app.use(routerVideo);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

