import pool from '../../config/database.js';


const db = pool;

const maisVideosEnviados = async (req, res) => {
    //Usando o STRING_AGG para concatenar os arquivos complementares e mostrar em uma única linha
    // lembrar de usar 
    const query = `SELECT 
    u.id, 
    u.tratamento_formal || '-' || u.nome_apelido AS tratamento_nome,
    COUNT(v.id) AS qtd_videos
FROM 
    public.tbl_videos v
JOIN 
    public.tbl_usuarios u ON v.id_enviado = u.id
GROUP BY 
    u.id, 
    u.tratamento_formal, 
    u.nome_apelido; `;
  
    try {
     
  
      const result = await db.query(query);
      

      res.status(200).json(result); // Envia a resposta em formato JSON
    } catch (err) {
      console.error('Erro ao executar a query SQL e exibir o relatorio:', err.message);
      res.status(400).json({ error: err.message }); // Envia o erro como JSON
    }
  };


export default { maisVideosEnviados };
