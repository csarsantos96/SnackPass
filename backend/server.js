const express = require('express');
const pool = require('./db');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rota de Teste
app.get('/test', (req, res) => {
    res.send('Servidor funcionando corretamente!');
});

// Rota para Obter Alunos (em vez de usuários)
app.get('/aluno', async (req, res) => {
    try {
        const aluno  = await pool.query('SELECT * FROM aluno');
        res.json(aluno.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Erro no Servidor");
    }
});

// Iniciar o Servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
