import pool from '../../config/database.js';


const db = pool;

const listarVideo = async (req, res) => {
    //Usando o STRING_AGG para concatenar os arquivos complementares e mostrar em uma única linha
    // lembrar de usar 
    const query = `SELECT v.id AS id_video,
    v.titulo AS titulo_video,
    v.descricao AS descricao_video,
    v.url AS url_video,
    m.descricao_menu AS nome_menu,
    s.descricao_submenu AS nome_submenu,
    STRING_AGG(vc.arq_complemento, ', ') AS arquivos_complementares
        FROM tbl_videos v
        JOIN tbl_categoria c ON v.id_categoria = c.id
        JOIN tbl_menu_principal m ON c.id_menu_principal = m.id_menu_principal
        JOIN tbl_sub_menu s ON c.id_sub_menu = s.id_sub_menu
        LEFT JOIN tbl_videos_complementos vc ON v.id = vc.id_tbl_videos
        GROUP BY v.id, v.titulo, v.descricao, v.url, m.descricao_menu, s.descricao_submenu;
                     `;
  
    try {
      console.log('Iniciando a execução da query SQL...');
  
      const result = await db.query(query);
  
      console.log('Query executada com sucesso.');
      console.log('Resultados da query:', JSON.stringify(result, null, 2));
      
       // Extrair os nomes dos arquivos complementares do primeiro registro do resultado
    const arquivosComplementares = result[0].arquivos_complementares.split(', ');

    // Exemplo de uso das variáveis
    const primeiroArquivo = arquivosComplementares[0];
    const segundoArquivo = arquivosComplementares[1];

    console.log(primeiroArquivo); // Exibir o primeiro arquivo no console
    console.log(segundoArquivo); // Exibir o segundo arquivo no console


      res.status(200).json(result); // Envia a resposta em formato JSON
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
