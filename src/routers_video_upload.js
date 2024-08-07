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
        } else if (file.fieldname === 'filepdf') {
            cb(null, 'envios/arquivos'); // Salva o PDF na pasta 'envios/arquivos'
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
    upload.fields([
        { name: 'file', maxCount: 1 },
        { name: 'filethumbnail', maxCount: 1 },
        { name: 'filepdf', maxCount: 1 }
    ]), 
    (req, res) => {
        const videoFile = req.files?.file ? req.files.file[0] : null;
        const thumbnailFile = req.files?.filethumbnail ? req.files.filethumbnail[0] : null;
        const pdfFile = req.files?.filepdf ? req.files.filepdf[0] : null;

        // Verifica se nenhum arquivo foi enviado
        if (!videoFile && !thumbnailFile && !pdfFile) {
            return res.status(400).send('Nenhum arquivo enviado.');
        }

        // Cria a resposta com base nos arquivos recebidos
        const response = {};

        // Se o arquivo de vídeo estiver presente, inclui o nome na resposta
        if (videoFile != null) {
            response.video = videoFile.filename;
            response.thumbnail = "0";
            response.pdf = "0";
        }

        // Se o arquivo de thumbnail estiver presente, inclui o nome na resposta
        if (thumbnailFile != null) {
            response.thumbnail = thumbnailFile.filename;
            response.video = "0";
            response.pdf = "0";
        }

        // Se o arquivo de PDF estiver presente, inclui o nome na resposta
        if (pdfFile != null) {
            response.pdf = pdfFile.filename;
            response.video = "0";
            response.thumbnail = "0";
        }

        // Se mais de um arquivo estiver presente, inclui os respectivos nomes na resposta
        if (videoFile != null && thumbnailFile != null) {
            response.video = videoFile.filename;
            response.thumbnail = thumbnailFile.filename;
            response.pdf = "0";
        }

        if (videoFile != null && pdfFile != null) {
            response.video = videoFile.filename;
            response.pdf = pdfFile.filename;
            response.thumbnail = "0";
        }

        if (thumbnailFile != null && pdfFile != null) {
            response.thumbnail = thumbnailFile.filename;
            response.pdf = pdfFile.filename;
            response.video = "0";
        }

        if (videoFile != null && thumbnailFile != null && pdfFile != null) {
            response.video = videoFile.filename;
            response.thumbnail = thumbnailFile.filename;
            response.pdf = pdfFile.filename;
        }

        // Envia a resposta com os nomes dos arquivos
        res.status(200).json(response);
    }
);

export default routerVideoUpload;