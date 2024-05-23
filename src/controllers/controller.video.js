import db from '../../config/database.js';

const listarVideo = async (req, res) => {
    let query = `SELECT * FROM tbl_videos`;
    
    try {
        const result = await db.query(query);
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send('Erro ao listar os vídeos, verifique se está logado!');
    }
};

const inserirVideo = async (req, res) => {
    const { titulo, descricao, url } = req.body;
    let query = `INSERT INTO tbl_videos (titulo, descricao, url) VALUES ($1, $2, $3) RETURNING *`;
    let params = [titulo, descricao, url];
    
    try {
        const result = await db.query(query, params);
        res.status(201).send(result);
    } catch (err) {
        res.status(400).send('Erro ao inserir o vídeo!');
    }
};

const editarVideo = async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, url } = req.body;
    let query = `UPDATE tbl_videos SET titulo = $1, descricao = $2, url = $3 WHERE id = $4 RETURNING *`;
    let params = [titulo, descricao, url, id];
    
    try {
        const result = await db.query(query, params);
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send('Erro ao editar o vídeo!');
    }
};

const deletarVideo = async (req, res) => {
    const { id } = req.params;
    let query = `DELETE FROM tbl_videos WHERE id = $1 RETURNING *`;
    let params = [id];
    
    try {
        const result = await db.query(query, params);
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send('Erro ao deletar o vídeo!');
    }
};

export default { listarVideo, inserirVideo, editarVideo, deletarVideo };
