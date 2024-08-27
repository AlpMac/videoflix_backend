import pool from '../../config/database.js';


const db = pool;

const listarNotificacao = async (req, res) => {
    //Usando o STRING_AGG para concatenar os arquivos complementares e mostrar em uma única linha
    // lembrar de usar 
    const query = `SELECT n.id, n.notificacao, n.id_enviado, n.data_envio, u.*
                  FROM public.tbl_notificacao_admin n
                  JOIN tbl_usuarios u ON n.id_enviado = u.id
                  ORDER BY n.data_envio DESC
                  ;`;
  
    try {
     
  
      const result = await db.query(query);
      

      res.status(200).json(result); // Envia a resposta em formato JSON
    } catch (err) {
      console.error('Erro ao executar a query SQL:', err.message);
      res.status(400).json({ error: err.message }); // Envia o erro como JSON
    }
  };


export default { listarNotificacao };
