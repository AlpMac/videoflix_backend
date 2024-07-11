import pkg from 'pg';
const {Pool} = pkg;

// Configurar a conexão com o banco de dados PostgreSQL
const pool = new Pool({
  user: 'postgres',           // substitua pelo seu usuário PostgreSQL
  host: 'localhost',             // tou o endereço do seu servidor PostgreSQL
  database: 'videoflix',        // nome do seu banco de dados 
  password: 'postgres' ,         // substitdua pela sua senha PostgreSQL postgres casa
  port: 5432,                    // porta padrão do PostgreSQL
});

console.log ('Conectado ao banco de dados com sucesso!');
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
