import pool from '../../config/database.js';


const db = pool;

const listarCanais = async (req, res) => {
    //Usando o STRING_AGG para concatenar os arquivos complementares e mostrar em uma única linha
    // lembrar de usar 
    const query = `SELECT 
                        u.id AS id_usuario,
                        u.nome_apelido AS nome_apelido,
                        u.url_perfil AS url_perfil,
                        u.local_trabalho AS local_trabalho,
                        u.tratamento_formal AS tratamento_formal,
                        COUNT(v.id) AS total_videos,
                        SUM(v.likes) AS total_likes,
                        SUM(v.views) AS total_views
                    FROM tbl_videos v
                    JOIN tbl_usuarios u ON v.id_enviado = u.id
                    GROUP BY 
                        u.id, 
                        u.nome_apelido, 
                        u.url_perfil, 
                        u.local_trabalho, 
                        u.tratamento_formal`;
    try {
      //console.log('Iniciando a execução da query SQL...');
  
      const result = await db.query(query);
      

      res.status(200).json(result); // Envia a resposta em formato JSON
    } catch (err) {
      console.error('Erro ao executar a query SQL:', err.message);
      res.status(400).json({ error: err.message }); // Envia o erro como JSON
    }
  };


export default { listarCanais };
