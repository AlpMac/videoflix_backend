import { Router } from "express";
import multer from "multer";

const routerVideoUpload = Router();

// Configurar o armazenamento para multer
const storage = multer.diskStorage({
    // Define o diretório de destino com base no campo do arquivo
    destination: (req, file, cb) => {
        if (file.fieldname === 'file') {
            cb(null, 'envios/videos'); // Salva o vídeo na pasta 'envios/videos'
        } else if (file.fieldname === 'filethumbnail') {
            cb(null, 'envios/thumbnail'); // Salva a thumbnail na pasta 'envios/thumbnail'
        }
    },
    // Define o nome do arquivo com base no timestamp e nome original do arquivo
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// Configura o multer com o armazenamento definido
const upload = multer({ storage });

// Define a rota POST para '/enviar-video'
routerVideoUpload.post('/enviar-video', 
    upload.fields([{ name: 'file', maxCount: 1 }, { name: 'filethumbnail', maxCount: 1 }]), 
    (req, res) => {
        const videoFile = req.files?.file ? req.files.file[0] : null;
        const thumbnailFile = req.files?.filethumbnail ? req.files.filethumbnail[0] : null;

        // Verifica se nenhum arquivo foi enviado
        if (!videoFile && !thumbnailFile) {
            return res.status(400).send('Nenhum arquivo enviado.');
        }

        // Cria a resposta com base nos arquivos recebidos
        const response = {};

        // Se o arquivo de vídeo estiver presente, inclui o nome na resposta
        if (videoFile) {
            response.video = videoFile.filename;
            response.thumbnail = "null";
        }

        // Se o arquivo de thumbnail estiver presente, inclui o nome na resposta
        if (thumbnailFile) {
            response.thumbnail = thumbnailFile.filename;
            response.video = "null";
        }

        // Envia a resposta com os nomes dos arquivos
        res.status(200).json(response);
    }
);

export default routerVideoUpload;
