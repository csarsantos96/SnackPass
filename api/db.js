const { Pool } = require('pg');
const dotenv = require('dotenv');

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Configuração da conexão com o banco de dados
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'snackPass',
    password: '1896',
    port: 5432,
});

// Verifica se a conexão foi bem-sucedida
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Erro ao conectar ao banco de dados:', err.stack);
    }
    const currentTime = new Date().toLocaleString();
    console.log(`Conectado ao banco de dados em: ${currentTime}`);
    release();
});

module.exports = pool;
