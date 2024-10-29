const express = require('express');
const pool = require('./db'); // Importa a configuração do banco de dados
const cors = require('cors');
const bcrypt = require('bcrypt'); // Importa bcrypt
const nodemailer = require('nodemailer'); // Importa nodemailer

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Configuração do Nodemailer para envio de emails
const transporter = nodemailer.createTransport({
    service: 'gmail', // Provedor de email (pode ser Yahoo, Outlook, etc.)
    auth: {
        user: 'seu_email@gmail.com', // Substitua pelo seu email
        pass: 'sua_senha', // Substitua pela sua senha ou App Password
    },
});

// Rota para Listar Produtos com Preços Diferenciados
app.get('/produtos', async (req, res) => {
    console.log('Recebida requisição para listar produtos');
    try {
        const produtos = await pool.query(`
            SELECT 
                id, 
                nome, 
                id_categoria, 
                preco_base, 
                preco_aluno, 
                preco_funcionario, 
                imagem 
            FROM produto
        `);

        console.log('Consulta ao banco de dados realizada com sucesso:', produtos.rows);
        res.json(produtos.rows);
    } catch (err) {
        console.error('Erro ao realizar a consulta ao banco de dados:', err.message);
        res.status(500).send('Erro no Servidor');
    }
});

// Rota para Criar Conta
app.post('/criar-conta', async (req, res) => {
    const { nome, email, senha, tipo, matricula, curso, data_nascimento, nivel_ensino } = req.body;

    console.log('Dados recebidos no corpo da requisição:', req.body);

    if (!senha || !matricula || !nome || !tipo) {
        console.log('Erro: Campos obrigatórios faltando', req.body);
        return res.status(400).json({ message: 'Nome, senha, matrícula e tipo são obrigatórios' });
    }

    if (tipo === 'aluno' && !nivel_ensino) {
        console.log('Erro: Nível de ensino é obrigatório para alunos', req.body);
        return res.status(400).json({ message: 'Nível de ensino é obrigatório para alunos' });
    }

    try {
        const saltRounds = 10;
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds);

        console.log('Campo tipo recebido:', tipo);

        const tipoPessoa = tipo === 'aluno' ? 'Aluno' : tipo === 'funcionario' ? 'Funcionário' : null;

        if (!tipoPessoa) {
            console.log('Erro: Tipo de pessoa inválido', tipo);
            return res.status(400).json({ message: 'Tipo de pessoa inválido' });
        }

        console.log('Criando pessoa do tipo:', tipoPessoa);

        const pessoaResult = await pool.query(
            'INSERT INTO pessoa (nome, email, data_nascimento, tipo_pessoa, senha) VALUES ($1, $2, $3, $4, $5) RETURNING id',
            [nome, email, data_nascimento, tipoPessoa, senhaCriptografada]
        );

        const id_pessoa = pessoaResult.rows[0].id;
        console.log('ID da pessoa criada:', id_pessoa);

        if (tipo === 'aluno') {
            console.log('Nível de ensino recebido:', nivel_ensino);

            const alunoResult = await pool.query(
                'INSERT INTO aluno (id_pessoa, matricula, curso, nivel_ensino, senha, email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                [id_pessoa, matricula, curso, nivel_ensino, senhaCriptografada, email]
            );

            console.log(`Conta de aluno criada: ${alunoResult.rows[0].email}`);
        } else if (tipo === 'funcionario') {
            const funcionarioResult = await pool.query(
                'INSERT INTO funcionario (id_pessoa, email, senha) VALUES ($1, $2, $3) RETURNING *',
                [id_pessoa, email, senhaCriptografada]
            );

            console.log(`Conta de funcionário criada: ${funcionarioResult.rows[0].email}`);
        }

        res.status(201).json({ message: 'Conta criada com sucesso!' });
    } catch (err) {
        console.error('Erro ao criar conta:', err);
        res.status(500).json({ message: 'Erro no servidor', error: err.message });
    }
});

// Rota para Enviar Email de Recuperação de Senha
app.post('/recuperar-senha', async (req, res) => {
    const { email } = req.body;

    try {
        // Verifica se o email existe no banco de dados
        const usuarioResult = await pool.query('SELECT * FROM pessoa WHERE email = $1', [email]);

        if (usuarioResult.rows.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        // Gerar um token único para redefinição de senha
        const resetToken = require('crypto').randomBytes(32).toString('hex');

        // Salvar o token no banco de dados com uma validade de 1 hora
        await pool.query("UPDATE pessoa SET reset_token = $1, reset_token_expiration = NOW() + INTERVAL '1 hour' WHERE email = $2", [resetToken, email]);

        // Configurar o conteúdo do email
        const mailOptions = {
            from: 'seu_email@gmail.com',
            to: email,
            subject: 'Recuperação de Senha',
            text: `Clique no link abaixo para redefinir sua senha: 
http://seusite.com/redefinir-senha?token=${resetToken}`, // Substitua pelo link correto
        };

        // Enviar email usando o Nodemailer
        await transporter.sendMail(mailOptions);

        console.log('Email de recuperação enviado para:', email);
        res.status(200).json({ message: 'Email de recuperação enviado com sucesso!' });
    } catch (error) {
        console.error('Erro ao enviar email de recuperação:', error);
        res.status(500).json({ message: 'Erro ao enviar email de recuperação' });
    }
});

// Rota para Atualizar Senha
app.put('/atualizar-senha/:token', async (req, res) => {
    const { token } = req.params;
    const { novaSenha } = req.body;

    try {
        // Verificar se o token é válido e não expirou
        const usuarioResult = await pool.query('SELECT * FROM pessoa WHERE reset_token = $1 AND reset_token_expiration > NOW()', [token]);

        if (usuarioResult.rows.length === 0) {
            return res.status(400).json({ message: 'Token inválido ou expirado.' });
        }

        // Criptografar a nova senha
        const saltRounds = 10;
        const senhaCriptografada = await bcrypt.hash(novaSenha, saltRounds);

        // Atualizar a senha no banco de dados e remover o token
        await pool.query(
            'UPDATE pessoa SET senha = $1, reset_token = NULL, reset_token_expiration = NULL WHERE id = $2',
            [senhaCriptografada, usuarioResult.rows[0].id]
        );

        res.send('Senha atualizada com sucesso!');
    } catch (err) {
        console.error('Erro ao atualizar a senha:', err.message);
        res.status(500).send('Erro no servidor');
    }
});

// Rota para Login
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Buscar usuário pelo email na tabela pessoa
        const usuarioResult = await pool.query('SELECT * FROM pessoa WHERE email = $1', [email]);

        if (usuarioResult.rows.length === 0) {
            return res.status(400).json({ message: 'Usuário não encontrado.' });
        }

        const usuario = usuarioResult.rows[0];

        // Comparar a senha fornecida com a senha criptografada
        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(400).json({ message: 'Senha incorreta.' });
        }

        res.json({ message: 'Login realizado com sucesso!', usuarioId: usuario.id });
    } catch (err) {
        console.error('Erro ao realizar login:', err.message);
        res.status(500).send('Erro no servidor');
    }
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
        res.status(500).send('Erro no Servidor');
    }
});

// Rota para Listar Todos os Dados (aluno, funcionario, pessoa)
app.get('/dados', async (req, res) => {
    console.log('Recebida requisição para listar todos os dados');
    try {
        const alunos = await pool.query('SELECT * FROM aluno');
        console.log('Consulta para tabela aluno realizada com sucesso:', alunos.rows);

        const funcionarios = await pool.query('SELECT * FROM funcionario');
        console.log('Consulta para tabela funcionario realizada com sucesso:', funcionarios.rows);

        const pessoas = await pool.query('SELECT * FROM pessoa');
        console.log('Consulta para tabela pessoa realizada com sucesso:', pessoas.rows);

        res.json({
            alunos: alunos.rows,
            funcionarios: funcionarios.rows,
            pessoas: pessoas.rows,
        });
    } catch (err) {
        console.error('Erro ao realizar a consulta ao banco de dados:', err.message);
        res.status(500).send('Erro no Servidor');
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
