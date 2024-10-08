const express = require('express');
const pool = require('./db'); // Importa a configuração do banco de dados
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Iniciar o Servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

// Rota de Teste
app.get('/test', (req, res) => {
    res.send('Servidor funcionando corretamente!');
});

// Rota para Listar Alunos
app.get('/aluno', async (req, res) => {
    console.log('Recebida requisição para listar alunos');
    try {
        const alunos = await pool.query('SELECT * FROM aluno');
        console.log('Consulta ao banco de dados realizada com sucesso:', alunos.rows);
        res.json(alunos.rows);
    } catch (err) {
        console.error('Erro ao realizar a consulta ao banco de dados:', err.message);
        res.status(500).send("Erro no Servidor");
    }
});

// Rota para Listar Todos os Dados (aluno, funcionario, pessoa)
app.get('/dados', async (req, res) => {
    console.log('Recebida requisição para listar todos os dados');
    try {
        // Consulta para a tabela aluno
        const alunos = await pool.query('SELECT * FROM aluno');
        console.log('Consulta para tabela aluno realizada com sucesso:', alunos.rows);

        // Consulta para a tabela funcionario
        const funcionarios = await pool.query('SELECT * FROM funcionario');
        console.log('Consulta para tabela funcionario realizada com sucesso:', funcionarios.rows);

        // Consulta para a tabela pessoa
        const pessoas = await pool.query('SELECT * FROM pessoa');
        console.log('Consulta para tabela pessoa realizada com sucesso:', pessoas.rows);

        // Retornar todos os dados em um objeto JSON
        res.json({
            alunos: alunos.rows,
            funcionarios: funcionarios.rows,
            pessoas: pessoas.rows,
        });
    } catch (err) {
        console.error('Erro ao realizar a consulta ao banco de dados:', err.message);
        res.status(500).send("Erro no Servidor");
    }
});
