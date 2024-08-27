import db from '../../config/database.js';
import { DELETE_VIDEO,UPDATE_VIDEO,UPLOAD_VIDEO,UPLOAD_PDF } from '../utils/globals.js';

const listarVideo = async (req, res) => {
    const { id } = req.params;
    let query = `SELECT v.id AS id_video,
        v.titulo AS titulo_video,
        v.descricao AS descricao_video,
        v.url AS url_video,
        m.descricao_menu AS nome_menu,
        s.descricao_submenu AS nome_submenu,
        u.url_perfil as url_perfil,
        u.nome_apelido as nome_apelido,
        u.local_trabalho as local_trabalho,
        u.tratamento_formal as tratamento_formal,
        v.thumbnail as thumbnail,
        v.views as views,
        v.likes as likes,
        v.id_enviado as id_enviado,
        COALESCE(f.curtido, false) AS curtido,
        v.id_categoria as id_categoria,
        STRING_AGG(vc.arq_complemento, ', ') AS arquivos_complementares
        FROM tbl_videos v
        JOIN tbl_usuarios u ON v.id_enviado = u.id
        JOIN tbl_categoria c ON v.id_categoria = c.id
        JOIN tbl_menu_principal m ON c.id_menu_principal = m.id_menu_principal
        JOIN tbl_sub_menu s ON c.id_sub_menu = s.id_sub_menu
        LEFT JOIN tbl_favorito f ON v.id = f.id_video
        LEFT JOIN tbl_videos_complementos vc ON v.id = vc.id_tbl_videos`;

    const params = [];
    if (id) {
        query += ` WHERE v.id = $1
         GROUP BY v.id, 
         v.titulo, 
         v.descricao, 
         v.url, 
         m.descricao_menu, 
         s.descricao_submenu, 
         u.nome_apelido, 
         u.local_trabalho, 
         u.tratamento_formal, 
         u.url_perfil, 
         v.thumbnail, 
         v.views, 
         v.likes, 
         v.id_enviado, 
         v.id_categoria, 
         f.curtido`;
        params.push(id);
    } else {
        query += ` GROUP BY v.id, v.titulo, v.descricao, v.url, m.descricao_menu, s.descricao_submenu`;
    }

    try {
        const resultSelect = await db.query(query, params);

        //console.log('Exemplo de uso das variáveis:' + JSON.stringify(resultSelect, null, 2));

        if (Array.isArray(resultSelect) && resultSelect.length > 0) {
            const video_achado = resultSelect[0];
            const arquivosComplementares = video_achado.arquivos_complementares ? video_achado.arquivos_complementares.split(', ') : [];
            if (arquivosComplementares.length > 0) {
              //  console.log('Arquivos Complementares:', arquivosComplementares);
            }

            res.status(200).json(video_achado);
        } else {
            res.status(404).json({ error: 'Vídeo não encontrado' });
        }
    } catch (err) {
        console.error('Erro ao executar a query SQL:', err.message);
        res.status(400).json({ error: err.message });
    }
};

//inserir video 
const inserirVideo = async (req, res) => {
    const titulo = req.body.titulo;
    const descricao = req.body.descricao;
    const url = req.body.url;
    const id_enviado = req.body.id_enviado;
    const id_categoria = req.body.id_categoria;
    const thumbnail = req.body.thumbnail;
    const pdf = req.body.pdf;
    const usuariologado = req.body.usuarioLogado;

    try {
        // Inicia a transação
        await db.query('BEGIN');

        // Inserir vídeo na tbl_videos
        const queryTextVideo = `INSERT INTO tbl_videos (titulo, descricao, url, id_enviado, id_categoria, thumbnail, views, likes)
                                VALUES ($1, $2, $3, $4, $5, $6, 0, 0) RETURNING id`;
        const paramsVideo = [titulo, descricao, url, id_enviado, id_categoria, thumbnail];
        const resultVideo = await db.query(queryTextVideo, paramsVideo);

        // Verifica se o vídeo foi inserido
        
        if (Array.isArray(resultVideo) && resultVideo.length === 0) {
            throw new Error('Erro ao inserir o vídeo na tbl_videos.');
        }
        const videoId = resultVideo[0].id;

        // Se houver um PDF, insere na tbl_videos_complementos
        if (pdf) {
            const queryTextComplemento = `INSERT INTO tbl_videos_complementos (id_tbl_videos, arq_complemento)
                                          VALUES ($1, $2)`;
            const paramsComplemento = [videoId, pdf];
            await db.query(queryTextComplemento, paramsComplemento);
        }

         // Inserir vídeo na tbl_videos
         const queryLogUploadVideo = `
         INSERT INTO tbl_log_videos (
            id_video,
            tipo_modificacao,
            responsavel_modificacao,
            hora_modificacao
        ) VALUES (
            $1,  
            $2,  
            $3,  
            NOW()  
        );
         
         `;
         let paramsUploadVideo = [];
         //ser for PDF salvara com nome UPLOAD no tbl_log_videos
        
         if (url.endsWith('.pdf')) {
            paramsUploadVideo = [videoId, UPLOAD_PDF, usuariologado];
        } else {
            paramsUploadVideo = [videoId, UPLOAD_VIDEO, usuariologado];
        }
        
        await db.query(queryLogUploadVideo, paramsUploadVideo);
        

        // Finaliza a transação
        await db.query('COMMIT');

        res.status(201).json({
            message: 'Vídeo inserido com sucesso!',
            data: { id: videoId }
        });
    } catch (err) {
        // Em caso de erro, faz rollback na transação
        await db.query('ROLLBACK');
        console.error('Erro ao inserir o vídeo:', err);
        res.status(400).json({
            error: 'Erro ao inserir o vídeo!',
            details: err.message
        });
    }
};



//UPDATE
const editarVideo = async (req, res) => {
    const titulo = req.body.titulo;
    const descricao = req.body.descricao;
    const url = req.body.url;
    const id_categoria = req.body.id_categoria;
    const thumbnail = req.body.thumbnail;
    const pdf = req.body.pdf;
    const id = req.body.id;

    const queryUpdateVideo = `UPDATE tbl_videos SET 
                                titulo = $1,
                                descricao = $2,
                                url = $3,
                                id_categoria = $4,
                                thumbnail = $5
                              WHERE id = $6`;

    const paramsUpdateVideo = [titulo, descricao, url, id_categoria, thumbnail, id];

    try {
        // Inicia a transação
        await db.query('BEGIN');

        // Atualiza os dados na tabela tbl_videos
        const rows = await db.query(queryUpdateVideo, paramsUpdateVideo);

        // Verifica se a atualização realmente afetou alguma linha
        if (!rows) {
            await db.query('ROLLBACK');
            return res.status(404).json({ error: 'Nenhum vídeo encontrado com o ID fornecido.' });
        }

        // Se houver um PDF, atualiza ou insere na tbl_videos_complementos
        if (pdf) {
            const querySelectComplemento = `SELECT id FROM tbl_videos_complementos WHERE id_tbl_videos = $1`;
            const complementos = await db.query(querySelectComplemento, [id]);

            if (complementos.length > 0) {
                const queryUpdateComplemento = `UPDATE tbl_videos_complementos SET arq_complemento = $1 WHERE id_tbl_videos = $2`;
                await db.query(queryUpdateComplemento, [pdf, id]);
            } else {
                const queryInsertComplemento = `INSERT INTO tbl_videos_complementos (id_tbl_videos, arq_complemento) VALUES ($1, $2)`;
                await db.query(queryInsertComplemento, [id, pdf]);
            }
        }

        // Finaliza a transação
        await db.query('COMMIT');

        res.status(200).json({ message: 'Vídeo atualizado com sucesso!' });
    } catch (err) {
        // Em caso de erro, faz rollback na transação
        await db.query('ROLLBACK');
        console.error('Erro ao editar o vídeo:', err);
        res.status(400).json({ error: 'Erro ao editar o vídeo!', details: err.message });
    }
};

const deletarVideo = async (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM tbl_videos WHERE id = $1 RETURNING id, titulo, descricao, url`;
    const params = [id];

    try {
        const result = await db.query(query, params);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(400).json({ error: 'Erro ao deletar o vídeo!' });
    }
};

export default { listarVideo, inserirVideo, editarVideo, deletarVideo };
