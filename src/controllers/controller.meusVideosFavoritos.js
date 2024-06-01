import pool from '../../config/database.js';

const db = pool;

const listarMeusVideosFavoritos = async (req, res) => {
    const { id } = req.params;
    let query = `SELECT v.id AS id_video,
                    v.titulo AS titulo_video,
                    v.descricao AS descricao_video,
                    v.url AS url_video,
                    m.descricao_menu AS nome_menu,
                    s.descricao_submenu AS nome_submenu,
                    u.url_perfil AS url_perfil,
                    u.nome_apelido AS nome_apelido,
                    u.local_trabalho AS local_trabalho,
                    u.tratamento_formal AS tratamento_formal,
                    v.thumbnail AS thumbnail,
                    v.views AS views,
                    v.likes AS likes,
                    v.id_enviado AS id_enviado,
                    v.id_categoria AS id_categoria,
                f.curtido AS curtido,
                    STRING_AGG(vc.arq_complemento, ', ') AS arquivos_complementares
                FROM tbl_videos v
                JOIN tbl_usuarios u ON v.id_enviado = u.id
                JOIN tbl_categoria c ON v.id_categoria = c.id
                JOIN tbl_menu_principal m ON c.id_menu_principal = m.id_menu_principal
                JOIN tbl_sub_menu s ON c.id_sub_menu = s.id_sub_menu
                LEFT JOIN tbl_videos_complementos vc ON v.id = vc.id_tbl_videos
                JOIN tbl_favorito f ON v.id = f.id_video AND f.curtido = true`;
               
    const params = [];
    // Adicionar cláusula WHERE se o ID for fornecido
    if (id) {
        query += ` WHERE v.id_enviado = $1 GROUP BY f.curtido,u.url_perfil, u.nome_apelido, u.local_trabalho, u.tratamento_formal, v.id, v.titulo, v.descricao, v.url, m.descricao_menu, s.descricao_submenu;
        `;
        params.push(id);
    } else {
           //query += ` GROUP BY v.id, v.titulo, v.descricao, v.url, m.descricao_menu, s.descricao_submenu`;
           alert('Você não tem vídeos favoritos');
    }   

    try {
        

        const result = await db.query(query, params);



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

            res.status(200).json(result); // Envia a resposta em formato JSON
        } else {
            res.status(404).json({ error: 'Vídeo não encontrado' });
        }
    } catch (err) {
        console.error('Erro ao executar a query SQL:', err.message);
        res.status(400).json({ error: err.message }); // Envia o erro como JSON
    }
};




export default { listarMeusVideosFavoritos };
