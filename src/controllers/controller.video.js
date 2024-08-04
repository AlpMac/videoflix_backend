import db from '../../config/database.js';

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
        v.id_categoria as id_categoria,
        STRING_AGG(vc.arq_complemento, ', ') AS arquivos_complementares
        FROM tbl_videos v
        JOIN tbl_usuarios u ON v.id_enviado = u.id
        JOIN tbl_categoria c ON v.id_categoria = c.id
        JOIN tbl_menu_principal m ON c.id_menu_principal = m.id_menu_principal
        JOIN tbl_sub_menu s ON c.id_sub_menu = s.id_sub_menu
        LEFT JOIN tbl_videos_complementos vc ON v.id = vc.id_tbl_videos`;

    const params = [];
    if (id) {
        query += ` WHERE v.id = $1 GROUP BY u.url_perfil, u.nome_apelido, u.local_trabalho, u.tratamento_formal, v.id, v.titulo, v.descricao, v.url, m.descricao_menu, s.descricao_submenu`;
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

const inserirVideo = async (req, res) => {
    //console.log('Corpo da requisição:', req.body);

    const titulo = req.body.titulo;
    const descricao = req.body.descricao;
    const url = req.body.url;
    const id_enviado = req.body.id_enviado;
    const id_categoria = req.body.id_categoria;
    const thumbnail = req.body.thumbnail;

    //console.log('titulo', titulo);

    const queryText = `INSERT INTO tbl_videos (titulo, descricao, url, id_enviado, id_categoria, thumbnail, views, likes)
                       VALUES ($1, $2, $3, $4, $5, $6, 0, 0) RETURNING *`;
    const params = [titulo, descricao, url, id_enviado, id_categoria, thumbnail];

    try {
        const rows = await db.query(queryText, params); // Use a função query revisada
        //console.log('Resultado da query:', rows); // Verifique a estrutura do resultado

        if (rows && Array.isArray(rows) && rows.length > 0) {
            res.status(201).json({
                message: 'Vídeo inserido com sucesso!',
                data: rows[0] // Retorna o primeiro item de rows
            });
        } else {
            throw new Error('Nenhum dado retornado pela query.');
        }
    } catch (err) {
        console.error('Erro ao inserir o vídeo:', err);
        res.status(400).json({
            error: 'Erro ao inserir o vídeo!',
            details: err.message
        });
    }
};




const editarVideo = async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, url } = req.body;
    const query = `UPDATE tbl_videos SET titulo = $1, descricao = $2, url = $3 WHERE id = $4 RETURNING id, titulo, descricao, url`;
    const params = [titulo, descricao, url, id];

    try {
        const result = await db.query(query, params);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(400).json({ error: 'Erro ao editar o vídeo!' });
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
