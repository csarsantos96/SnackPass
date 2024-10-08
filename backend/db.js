const {Pool} = require('pg');

const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'snackPass',
    password:'1896',
    port:5432,
});

// Testar Conexão com o Banco de Dados
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conexão bem-sucedida ao banco de dados:', res.rows);
    }
});

module.exports = pool;