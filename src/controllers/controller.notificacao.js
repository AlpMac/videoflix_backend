import pool from '../../config/database.js';


const db = pool;

const listarNotificacao = async (req, res) => {
    //Usando o STRING_AGG para concatenar os arquivos complementares e mostrar em uma única linha
    // lembrar de usar 
    const query = `SELECT * from tbl_notificacao_admin ORDER BY data_envio DESC;`;
  
    try {
     
  
      const result = await db.query(query);
      

      res.status(200).json(result); // Envia a resposta em formato JSON
    } catch (err) {
      console.error('Erro ao executar a query SQL:', err.message);
      res.status(400).json({ error: err.message }); // Envia o erro como JSON
    }
  };


export default { listarNotificacao };
