import pool from '../../config/database.js';

const db = pool;

// Inserir vídeo como favorito
const addVideoFavorito = async (req, res) => {
    const { id_logado, id_video, curtido } = req.body;

    const queryTextVideo = `INSERT INTO tbl_favorito (id_usuario, id_video, curtido)
                            VALUES ($1, $2, $3) RETURNING curtido`;
    const paramsVideo = [id_logado, id_video, curtido];

    try {
        const resultVideo = await db.query(queryTextVideo, paramsVideo);
        if (resultVideo) {
            res.status(200).json({ message: 'Vídeo Adicionado dos favoritos com sucesso.' });
        } else {
            throw new Error('Erro ao inserir o favorito no vídeo');
        }
    } catch (err) {
        res.status(400).json({
            error: 'Erro ao inserir o favorito no vídeo!',
            details: err.message,
        });
    }
};

// Remover vídeo como favorito
const deleteVideoFavorito = async (req, res) => {
    const { id_logado, id_video } = req.body;

    const queryTextVideo = `DELETE FROM tbl_favorito WHERE id_usuario = $1 AND id_video = $2 `;
    const paramsVideo = [id_logado, id_video];

    try {
        const resultVideo = await db.query(queryTextVideo, paramsVideo);
        if (resultVideo) {
            res.status(200).json({ message: 'Vídeo removido dos favoritos com sucesso.' });
        } else {
            res.status(204).send();  // No Content
        }
    } catch (err) {
        res.status(400).json({
            error: 'Erro ao remover o favorito do vídeo!',
            details: err.message,
        });
    }
};

export default { addVideoFavorito, deleteVideoFavorito };
