import pool from '../../config/database.js';

const db = pool;

const listarVideoCategoria = async (req, res) => {
  // Extrai o id dos parâmetros da requisição
  const { id_categoria } = req.params;

  // Define a base da query SQL
  let query = `
    SELECT 
      v.id AS id_video,
      v.titulo AS titulo_video,
      v.descricao AS descricao_video,
      v.url AS url_video,
      m.descricao_menu AS nome_menu,
      s.descricao_submenu AS nome_submenu,
      v.id_enviado as id_enviado,
      u.url_perfil as url_perfil,
      u.nome_apelido as nome_apelido,
      u.local_trabalho as local_trabalho,
      u.tratamento_formal as tratamento_formal,
      v.thumbnail as thumbnail,
      v.views as views,
      v.likes as likes,
      STRING_AGG(vc.arq_complemento, ', ') AS arquivos_complementares
    FROM tbl_videos v
    JOIN tbl_usuarios u ON v.id_enviado = u.id
    JOIN tbl_categoria c ON v.id_categoria = c.id
    JOIN tbl_menu_principal m ON c.id_menu_principal = m.id_menu_principal
    JOIN tbl_sub_menu s ON c.id_sub_menu = s.id_sub_menu
    LEFT JOIN tbl_videos_complementos vc ON v.id = vc.id_tbl_videos
  `;

  const params = []; 
  if (id_categoria) {
    query += `WHERE v.id_categoria = $1`;
    params.push(id_categoria);
  }

  // Adiciona o GROUP BY após a condição WHERE
  query += `
    GROUP BY 
      v.likes, v.views, v.thumbnail, u.url_perfil, v.id, u.nome_apelido, 
      u.local_trabalho, u.tratamento_formal, v.titulo, v.descricao, 
      v.url, m.descricao_menu, s.descricao_submenu;
  `;

  try {
    // Executa a query com o parâmetro id
    const result = await db.query(query, params);

    // Envia a resposta em formato JSON
    res.status(200).json(result);
  
  } catch (err) {
    console.error('Erro ao executar a query SQL:', err.message);
    res.status(400).json({ error: err.message });
  }
};

export default { listarVideoCategoria };
