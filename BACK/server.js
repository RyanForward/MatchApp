const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Configura o pool de conexões para o PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'match',
    password: 'barbara',
    port: 5432, 
});


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para lidar com CORS
app.use(cors());

// Middleware para lidar com requisições JSON
app.use(express.json());

// Middleware para lidar com requisições URL encoded
app.use(express.urlencoded({ extended: true }));

// Rota para receber dados do front-end e cadastrar no banco de dados
app.post('/api/usuario', async (req, res) => {
    const { user_id } = req.body;
    const { user_nome } = req.body;
    const { user_email } = req.body;
    const { user_senha } = req.body;
    
    console.log(req.body);
    
    try {
        const hashedPassword = await bcrypt.hash(user_senha, 10);
        const result = await pool.query(
            'INSERT INTO Usuario (user_id, user_nome, user_email, user_senha) VALUES ($1, $2, $3, $4) RETURNING *',
            [user_id, user_nome, user_email, hashedPassword]
        );
        return result
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(err);
        
    }
    console.log('next');
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    res.send("Página de Login");
});


// Retorna as informações de um usuário específico
app.get('/api/usuario/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM Usuario WHERE user_id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rota para login de usuário
app.post("/api/login", async (req, res) => {
    const { user_email, user_senha } = req.body;

    console.log(req.body);

    try {
        const result = await pool.query('SELECT * FROM Usuario WHERE user_email = $1', [user_email]);
        if (result.rows.length === 0) {
            return res.status(404).send('Usuário não encontrado.');
        }
        const user = result.rows[0];
        const passwordValidado = await bcrypt.compare(user_senha, user.user_senha);
        if (passwordValidado) {
            const token = jwt.sign({ userId: user.user_id }, 'secret_key', { expiresIn: '1h' });
            console.log(token);
            return res.status(200).json({ token });
        } else {
            return res.status(422).send('Usuário ou senha incorretos.');
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Retorna as informações do usuário logado atualmente
app.get('/api/usuario_logado', verificaToken, async (req, res) => {
    const userId = req.userId;
    try {
        const result = await pool.query('SELECT * FROM Usuario WHERE user_id = $1', [userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// Middleware para autenticação do usuário
app.use((req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send('Acesso negado. Token não fornecido.');
    }
    try {
        const decoded = jwt.verify(token, 'secret_key');
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(400).send('Token inválido.');
    }
});


// Middleware para verificar se o token é válido
function verificaToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send('Acesso negado. Token não fornecido.');
    }
    try {
        const decoded = jwt.verify(token, 'secret_key');
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(400).send('Token inválido.');
    }
}



// Retorna as informações de um usuário
app.get('/api/', async (req, res) => { //raiz da aplicação
    try {
        const result = await pool.query('SELECT * FROM Usuario');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Inserir uma nova quadra
app.post('/api/quadra', async (req, res) => {
    const { user_id, calendario, valor, publico } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Quadras (user_id, calendario, valor, publico) VALUES ($1, $2, $3, $4) RETURNING *',
            [user_id, calendario, valor, publico]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Editar informações de uma quadra existente
app.put('/api/quadra/:id', async (req, res) => {
    const { id } = req.params;
    const { calendario, valor, publico } = req.body;
    try {
        const result = await pool.query(
            'UPDATE Quadras SET calendario = $1, valor = $2, publico = $3 WHERE quadra_id = $4 RETURNING *',
            [calendario, valor, publico, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Quadra não encontrada' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Inserir uma nova partida
app.post('/api/partida', async (req, res) => {
    const { user_id, match_data, match_local, match_valor, match_publico } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Partida (user_id, match_data, match_local, match_valor, match_publico) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [user_id, match_data, match_local, match_valor, match_publico]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Editar informações de uma partida existente
app.put('/api/partida/:id', async (req, res) => {
    const { id } = req.params;
    const { match_data, match_local, match_valor, match_publico } = req.body;
    try {
        const result = await pool.query(
            'UPDATE Partida SET match_data = $1, match_local = $2, match_valor = $3, match_publico = $4 WHERE match_id = $5 RETURNING *',
            [match_data, match_local, match_valor, match_publico, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Partida não encontrada' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Inicia o servidor na porta 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
