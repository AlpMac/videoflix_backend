import { Router } from "express";
import multer from "multer";

const routerVideoUpload = Router();

// Configurar multer para salvar arquivos na pasta 'envios/videos' e 'envios/thumbnail'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'file') {
            cb(null, 'envios/videos');
        } else if (file.fieldname === 'filethumbnail') {
            cb(null, 'envios/thumbnail');
        }
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

routerVideoUpload.post('/enviar-video', upload.fields([{ name: 'file', maxCount: 1 }, { name: 'filethumbnail', maxCount: 1 }]), (req, res) => {
    if (!req.files || !req.files.file || !req.files.filethumbnail) {
        return res.status(400).send('Ambos os arquivos devem ser enviados.');
    }

    const videoFile = req.files.file[0];
    const thumbnailFile = req.files.filethumbnail[0];

    // Aqui você pode adicionar a lógica para manipular os arquivos conforme necessário
    res.send({
        message: 'Arquivos enviados com sucesso.',
        video: videoFile.filename,
        thumbnail: thumbnailFile.filename
    });
});

export default routerVideoUpload;