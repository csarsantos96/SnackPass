require('dotenv').config();
const express = require('express');
const pool = require('./db'); // Importa a configuração do banco de dados
const cors = require('cors');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Rota de envio de e-mail
app.post('/enviar-email', async (req, res) => {
    const { destinatario, assunto, mensagem } = req.body;

    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: destinatario,
            subject: assunto,
            text: mensagem,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'E-mail enviado com sucesso!' });
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        res.status(500).json({ message: 'Erro ao enviar e-mail', error: error.message });
    }
});

// Exemplo de rota de produtos
app.get('/produtos', async (req, res) => {
    try {
        const produtos = await pool.query('SELECT * FROM produto');
        res.json(produtos.rows);
    } catch (err) {
        console.error('Erro ao buscar produtos:', err.message);
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app; // Exporta o app para a Vercel
