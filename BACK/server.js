const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



// Configura o pool de conexões para o PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'admin',
    port: 5432
});

(async () => {
    const client = await pool.connect();
    try {
        // Verifica se o banco de dados existe
        const dbCheck = await client.query("SELECT 1 FROM pg_database WHERE datname='match'");
        if (dbCheck === null || dbCheck.rows.length === 0) {
            // Cria o banco de dados se não existir
            await client.query('CREATE DATABASE match');              
            console.log('Banco de dados "match" criado com sucesso.');
        }
        else {
            console.log('Banco de dados "match" já existe.');
        }
    } catch (err) {
        console.error('Erro ao verificar/criar banco de dados:', err);
        Error.captureStackTrace(err);
    } finally {
        client.release();
    }
})();

// Configura o pool de conexões para o PostgreSQL
const matchpool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'match',
    password: 'admin',
    port: 5432
});


(async () => {
    const client = await matchpool.connect();
    try {
        // Cria as tabelas se não existirem
        await client.query(`
            CREATE TABLE IF NOT EXISTS Usuario (
                user_id INT NOT NULL PRIMARY KEY,
                user_nome CHAR(50) NOT NULL,
                user_email CHAR(50) NOT NULL,
                user_senha TEXT NOT NULL,
                user_age INT,
                user_fav_sport TEXT,
                user_bio char(100)
            );
        `);

        await client.query(`
            CREATE TABLE IF NOT EXISTS Quadra (
                quadra_id INT NOT NULL PRIMARY KEY,
                user_id INT NOT NULL,
                quadra_nome char(50),
                calendario DATE NOT NULL,
                valor CHAR(50),
                publico boolean,
                FOREIGN KEY (user_id) REFERENCES Usuario(user_id)
            );
        `);

        await client.query(`
            CREATE TABLE IF NOT EXISTS Partida (
                match_id SERIAL PRIMARY KEY,
                host_id INT REFERENCES Usuario(user_id), -- Assumindo que há uma tabela Usuario com user_id como chave primária
                match_local VARCHAR(255) NOT NULL,
                match_data TIMESTAMP NOT NULL,
                match_valor DECIMAL(10, 2) NOT NULL,
                match_publico BOOLEAN NOT NULL,
                esporte VARCHAR(50) NOT NULL,
                tipo_competicao VARCHAR(50) NOT NULL,
                genero VARCHAR(10) NOT NULL,
                faixa_idade_min INT NOT NULL,
                faixa_idade_max INT NOT NULL,
                nivel_expertise VARCHAR(50) NOT NULL,
                numero_total_pessoas INT NOT NULL,
                partida_gratuita BOOLEAN NOT NULL,
                acessivel BOOLEAN NOT NULL,
                participantes TEXT[] NOT NULL
            );
        `);

        await client.query(`
            CREATE TABLE IF NOT EXISTS Grupo (
                shipment_id INT NOT NULL PRIMARY KEY,
                match_id INT NOT NULL,
                user_id INT NOT NULL,
                horario DATE NOT NULL,
                FOREIGN KEY (match_id) REFERENCES Partida(match_id),
                FOREIGN KEY (user_id) REFERENCES Usuario(user_id)
            );
        `);

        console.log('Tabelas criadas/verificadas com sucesso.');
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    } catch (err) {
        console.error('Erro ao verificar/criar tabelas:', err);
        Error.captureStackTrace(err);
    } finally {
        client.release();
    }
})();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para lidar com CORS
app.use(cors());

// Middleware para lidar com requisições JSON
app.use(express.json());

// Middleware para lidar com requisições URL encoded
app.use(express.urlencoded({ extended: true }));

// Middleware para verificar se o token é válido
function verificaToken(req, res, next) {

    const authHeader = req.headers['authorization'];
    const token = req.header('Authorization')?.replace('Bearer ', '');
   //const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send('Acesso negado. Token não fornecido.');
    }
    jwt.verify(token, 'secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).send('Token inválido.');
        }
        req.userId = decoded.userId;
        next();
    });
    //try {
        //const decoded = jwt.verify(token, 'secret_key');
        //req.userId = decoded.userId;
        //next();
    //} catch (err) {
        //res.status(400).send('Token inválido.');
   // }
}

// Middleware para autenticação do usuário
// app.use((req, res, next) => {
//     const token = req.headers['authorization'];
//     if (!token) {
//         return res.status(401).send('Acesso negado. Token não fornecido.');
//     }
//     try {
//         const decoded = jwt.verify(token, 'secret_key');
//         req.userId = decoded.userId;
//         next();
//     } catch (err) {
//         res.status(400).send('Token inválido.');
//     }
// });

// ROTAS DOS USUÁRIOS *********************

// Rota para receber dados do front-end e cadastrar no banco de dados
app.post('/api/usuario', async (req, res) => {
    const { user_id, user_nome, user_email, user_senha } = req.body;

    console.log(req.body);

    try {

        // Obtenha o último ID (maior valor) da tabela
        const lastIdResult = await matchpool.query('SELECT MAX(user_id) as lastId FROM Usuario');
        const lastId = lastIdResult.rows[0].lastid || 0; // Se não houver registros, inicie do zero

        const newId = lastId + 1; // Incrementa para criar o próximo ID

        const hashedPassword = await bcrypt.hash(user_senha, 10);
        const result = await matchpool.query(
            'INSERT INTO Usuario (user_id, user_nome, user_email, user_senha) VALUES ($1, $2, $3, $4) RETURNING *',
            [user_id, user_nome, user_email, hashedPassword]
        );
        return res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// Retorna as informações de um usuário específico
app.get('/api/usuario/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await matchpool.query('SELECT * FROM Usuario WHERE user_id = $1', [id]);
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
    const { user_email} = req.body; 
    const { user_senha } = req.body;

    try {
        const result = await matchpool.query('SELECT * FROM Usuario WHERE user_email = $1', [user_email]);
        console.log('result: ', result)
        if (result.rows.length === 0) {
            return res.status(404).send('Usuário não encontrado.');
        }
        const user = result.rows[0];
        const userID = user.user_id;
        const passwordValidado = await bcrypt.compare(user_senha, user.user_senha);
        if (passwordValidado) {
            const token = jwt.sign({ userId: user.user_id }, 'secret_key', { expiresIn: '1h' });
            console.log(token);
            return res.status(200).json({ token, userID});
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
        const result = await matchpool.query('SELECT * FROM Usuario WHERE user_id = $1', [userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/', async (req, res) => { //raiz da aplicação
    try {
        const result = await matchpool.query('SELECT * FROM Usuario');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ROTAS DAS PARTIDAS *********************

// Inserir uma nova partida (necessita de)
app.post('/api/partida', async (req, res) => {
    const match_id = req.body.randomNumber;
    const {host_id} = req.body;
    const { match_local } = req.body;
    const { match_data } = req.body;
    const { match_valor } = req.body;
    const { match_publico } = req.body;
    const { esporte } = req.body;
    const tipo_competicao = req.body.tipoCompeticao;
    const { genero } = req.body;
    const faixa_idade_min = req.body.faixaIdadeMin;
    const faixa_idade_max = req.body.faixaIdadeMax;
    const nivel_expertise = req.body.nivelExpertise;
    const numero_total_pessoas = req.body.numeroTotalPessoas;
    const partida_gratuita = req.body.match_publico;
    const { acessivel } = req.body;
    const { participantes } = req.body;

    try {
        const result = await matchpool.query(
            'INSERT INTO Partida (match_id, user_id, match_local, match_data, match_valor, match_publico, esporte, tipo_competicao, genero, faixa_idade_min, faixa_idade_max, nivel_expertise, numero_total_pessoas, partida_gratuita, acessivel, participantes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *',
            [match_id, host_id, match_local, match_data, match_valor, match_publico, esporte, tipo_competicao, genero, faixa_idade_min, faixa_idade_max, nivel_expertise, numero_total_pessoas, partida_gratuita, acessivel, participantes]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
});

// Retorna as informações de uma partida específica
app.get('/api/partida/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await matchpool.query('SELECT * FROM Partida WHERE match_id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Partida não encontrada' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/partida', verificaToken, async (req, res) => {
    try {
        const result = await matchpool.query('SELECT * FROM Partida');
        console.log('result: ', result)
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Editar informações de uma partida existente
app.put('/api/partida/:id', async (req, res) => {
    const { id } = req.params;
    const { match_data, match_local, match_valor, match_publico } = req.body;
    try {
        const result = await matchpool.query(
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

// Deletar uma partida
app.delete('/api/partida/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await matchpool.query('DELETE FROM Partida WHERE match_id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Partida não encontrada' });
        }
        res.status(200).json({ message: 'Partida deletada com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ROTAS DOS GRUPOS *********************

// Inserir um novo grupo
app.post('/api/grupo', async (req, res) => {
    const { shipment_id, match_id, user_id, horario } = req.body;
    try {
        const result = await matchpool.query(
            'INSERT INTO Grupo (shipment_id, match_id, user_id, horario) VALUES ($1, $2, $3, $4) RETURNING *',
            [shipment_id, match_id, user_id, horario]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Retorna as informações de um grupo específico
app.get('/api/grupo/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await matchpool.query('SELECT * FROM Grupo WHERE shipment_id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Grupo não encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/grupo', async (req, res) => {
    try {
        const result = await matchpool.query('SELECT * FROM Grupo');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/grupo/historico/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const result = await matchpool.query('SELECT p.esporte, p.match_local, p.match_data FROM Grupo g INNER JOIN Partida p ON g.match_id = p.match_id WHERE g.user_id = $1', [userId]) 
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }   
});

// Editar informações de um grupo existente
app.put('/api/grupo/:id', async (req, res) => {
    const { id } = req.params;
    const { shipment_id, match_id, user_id, horario } = req.body;
    try {
        const result = await matchpool.query(
            'UPDATE Grupo SET shipment_id = $1, match_id = $2, user_id = $3, horario = $4 WHERE shipment_id = $5 RETURNING *',
            [shipment_id, match_id, user_id, horario, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Grupo não encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Deletar um grupo
app.delete('/api/grupo/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await matchpool.query('DELETE FROM Grupo WHERE shipment_id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Grupo não encontrado' });
        }
        res.status(200).json({ message: 'Grupo deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rota para buscar todas as partidas
app.get('/api/encontrarmatch', async (req, res) => {
    try {
        // Consulta para buscar todas as partidas
        const result = await matchpool.query('SELECT * FROM Partidas ORDER BY partida_id ASC');

        // Retorna as partidas como JSON
        return res.status(200).json(result.rows);
    } catch (err) {
        // Em caso de erro, retorna o erro ao cliente
        res.status(500).json({ error: err.message });
    }
});


const router = express.Router();
const knex = require('../database/knex'); // Configuração do Knex.js para conexão com o banco

// Rota para buscar partidas
router.get('/buscar_partidas', async (req, res) => {
  try {
    // Obtém os filtros da query string
    const {
      host_id,
      match_local,
      match_data,
      match_valor,
      match_publico,
      esporte,
      tipo_competicao,
      genero,
      faixa_idade_min,
      faixa_idade_max,
      nivel_expertise,
      numero_total_pessoas,
      partida_gratuita,
      acessivel,
    } = req.query;

    // Inicializa a query
    let query = knex('Match').select('*');

    // Aplica os filtros conforme forem enviados
    if (host_id) query = query.where('host_id', host_id);
    if (match_local) query = query.where('match_local', 'like', `%${match_local}%`);
    if (match_data) query = query.where('match_data', match_data);
    if (match_valor) query = query.where('match_valor', '<=', parseFloat(match_valor));
    if (match_publico !== undefined) query = query.where('match_publico', match_publico === 'true');
    if (esporte) query = query.where('esporte', esporte);
    if (tipo_competicao) query = query.where('tipo_competicao', tipo_competicao);
    if (genero) query = query.where('genero', genero);
    if (faixa_idade_min) query = query.where('faixa_idade_min', '>=', parseInt(faixa_idade_min));
    if (faixa_idade_max) query = query.where('faixa_idade_max', '<=', parseInt(faixa_idade_max));
    if (nivel_expertise) query = query.where('nivel_expertise', nivel_expertise);
    if (numero_total_pessoas) query = query.where('numero_total_pessoas', '<=', parseInt(numero_total_pessoas));
    if (partida_gratuita !== undefined) query = query.where('partida_gratuita', partida_gratuita === 'true');
    if (acessivel !== undefined) query = query.where('acessivel', acessivel === 'true');

    // Executa a query
    const matches = await query;

    res.status(200).json(matches);
  } catch (err) {
    console.error('Erro ao buscar partidas:', err);
    res.status(500).json({ error: 'Erro ao buscar partidas' });
  }
});

module.exports = router;


// Inicia o servidor na porta 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
