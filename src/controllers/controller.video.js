import pool from '../../config/database.js';

const db = pool;

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
    // Adicionar cláusula WHERE se o ID for fornecido
    if (id) {
        query += ` WHERE v.id = $1 GROUP BY u.url_perfil,u.nome_apelido,u.local_trabalho,u.tratamento_formal,v.id, v.titulo, v.descricao, v.url, m.descricao_menu, s.descricao_submenu`;
        params.push(id);
    } else {
        query += ` GROUP BY v.id, v.titulo, v.descricao, v.url, m.descricao_menu, s.descricao_submenu`;
    }

    try {
        console.log('Iniciando a execução da query SQL...');
        console.log('Query:', query);
        console.log('Params:', params);

        const result = await db.query(query, params);

        console.log('Exemplo de uso das variáveis:'+JSON.stringify(result, null, 2) );


        if (result && result.length > 0) {
            const video_achado = result[0];

            // Extrair os nomes dos arquivos complementares do primeiro registro do resultado
            const arquivosComplementares = video_achado.arquivos_complementares ? video_achado.arquivos_complementares.split(', ') : [];

            // Exemplo de uso das variáveis
            if (arquivosComplementares.length > 0) {
                const primeiroArquivo = arquivosComplementares[0];
                const segundoArquivo = arquivosComplementares[1];

                console.log(primeiroArquivo); // Exibir o primeiro arquivo no console
                console.log(segundoArquivo); // Exibir o segundo arquivo no console
            }

            res.status(200).json(video_achado); // Envia a resposta em formato JSON
        } else {
            res.status(404).json({ error: 'Vídeo não encontrado' });
        }
    } catch (err) {
        console.error('Erro ao executar a query SQL:', err.message);
        res.status(400).json({ error: err.message }); // Envia o erro como JSON
    }
};


const inserirVideo = async (req, res) => {
    const { titulo, descricao, url } = req.body;
    const query = `INSERT INTO tbl_videos (titulo, descricao, url) VALUES ($1, $2, $3) RETURNING id, titulo, descricao, url`;
    const params = [titulo, descricao, url];

    try {
        const result = await db.query(query, params);
        res.status(201).send(result.rows[0]); // Retorna o primeiro item do array de resultados
    } catch (err) {
        res.status(400).send('Erro ao inserir o vídeo!');
    }
};

const editarVideo = async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, url } = req.body;
    const query = `UPDATE tbl_videos SET titulo = $1, descricao = $2, url = $3 WHERE id = $4 RETURNING id, titulo, descricao, url`;
    const params = [titulo, descricao, url, id];

    try {
        const result = await db.query(query, params);
        res.status(200).send(result.rows[0]); // Retorna o primeiro item do array de resultados
    } catch (err) {
        res.status(400).send('Erro ao editar o vídeo!');
    }
};

const deletarVideo = async (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM tbl_videos WHERE id = $1 RETURNING id, titulo, descricao, url`;
    const params = [id];

    try {
        const result = await db.query(query, params);
        res.status(200).send(result.rows[0]); // Retorna o primeiro item do array de resultados
    } catch (err) {
        res.status(400).send('Erro ao deletar o vídeo!');
    }
};

export default { listarVideo, inserirVideo, editarVideo, deletarVideo };
