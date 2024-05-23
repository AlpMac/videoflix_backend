import pkg from 'pg';
const {Pool} = pkg;

// Configurar a conexão com o banco de dados PostgreSQL
const pool = new Pool({
  user: 'seu_usuario',           // substitua pelo seu usuário PostgreSQL
  host: 'localhost',             // ou o endereço do seu servidor PostgreSQL
  database: 'alpaclean',         // nome do seu banco de dados
  password: 'sua_senha',         // substitua pela sua senha PostgreSQL
  port: 5432,                    // porta padrão do PostgreSQL
});

// Função para ajudar a rodar as queries
function query(command, params) {
  // Utilizaremos promise para aguardar a resposta do banco de dados de sucesso ou erro
  return new Promise((resolve, reject) => {
    pool.query(command, params, (err, result) => {
      if (err) {
        reject(err);
      } else {
        // Retorna as linhas da query com sucesso
        resolve(result.rows);
      }
    });
  });
}

// Exportar nossa função de query e o pool para ser utilizado em outros arquivos
export default { pool, query };
