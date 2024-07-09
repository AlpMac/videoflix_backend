import pool from '../../config/database.js';


const db = pool;

const listarCategoria = async (req, res) => {
    //Usando o STRING_AGG para concatenar os arquivos complementares e mostrar em uma única linha
    // lembrar de usar 
    const query = `SELECT tbl_categoria.id,
                    tbl_menu_principal.id_menu_principal,
                    tbl_menu_principal.descricao_menu,
                    tbl_sub_menu.id_sub_menu,  
                   tbl_sub_menu.descricao_submenu
                FROM tbl_categoria,tbl_sub_menu,tbl_menu_principal
                WHERE tbl_categoria.id_menu_principal = tbl_menu_principal.id_menu_principal
                AND tbl_categoria.id_sub_menu = tbl_sub_menu.id_sub_menu; `;
                
    try {
     
  
      const result = await db.query(query);
      

      res.status(200).json(result); // Envia a resposta em formato JSON
    } catch (err) {
      console.error('Erro ao executar a query SQL:', err.message);
      res.status(400).json({ error: err.message }); // Envia o erro como JSON
    }
  };


export default { listarCategoria };
