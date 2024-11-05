//npm init -y
//npm install express pg body-parser
//node server.js



const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

// Configura o pool de conexões para o PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'match',
    password: 'admin',
    port: 5432, 
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



async function main(){
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM Usuario');
        console.log(result.rows);
        client.release();
    } catch (err) {
        console.error(err);
    }

}


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
        const result = await pool.query(
            'INSERT INTO Usuario (user_id, user_nome, user_email, user_senha) VALUES ($1, $2, $3, $4) RETURNING *',
            [user_id, user_nome, user_email, user_senha]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
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
