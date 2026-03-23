import db from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'senha_padrao_secreta';

// --- Métodos de Autenticação ---

// 1. Login do Profissional
export const login = (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    const query = 'SELECT * FROM profissionais WHERE email = ? AND ativo = TRUE';
    db.query(query, [email], (err, results) => {
        if (err) return res.status(500).json({ error: 'Erro no servidor' });

        if (results.length === 0) {
            return res.status(401).json({ error: 'Email ou senha inválidos' });
        }

        const profissional = results[0];
        const senhaValida = bcrypt.compareSync(senha, profissional.senha);

        if (!senhaValida) {
            return res.status(401).json({ error: 'Email ou senha inválidos' });
        }

        const token = jwt.sign(
            { id: profissional.id_profissional, email: profissional.email },
            JWT_SECRET,
            { expiresIn: '5h' }
        );

        res.json({
            message: 'Login bem-sucedido',
            token,
            profissional: {
                id: profissional.id_profissional,
                nome: profissional.nome_completo,
                email: profissional.email
            }
        });
    });
};

// --- Métodos do CRUD de Profissionais ---

// 2. Criar Profissional (equivalente ao Registrar)
export const registrar = (req, res) => {
    const { nome_completo, email, senha, registro_conselho, especialidade } = req.body;

    if (!nome_completo || !email || !senha || !registro_conselho) {
        return res.status(400).json({ error: 'Campos obrigatórios: nome_completo, email, senha, registro_conselho' });
    }

    const salt = bcrypt.genSaltSync(10);
    const senhaHash = bcrypt.hashSync(senha, salt);

    const query = 'INSERT INTO profissionais (nome_completo, email, senha, registro_conselho, especialidade) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [nome_completo, email, senhaHash, registro_conselho, especialidade], (err, results) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'Email ou Registro já cadastrado' });
            }
            return res.status(500).json({ error: 'Erro ao cadastrar profissional' });
        }
        res.status(201).json({ message: 'Profissional cadastrado com sucesso!', id: results.insertId });
    });
};

// 3. Listar todos os profissionais
export const listarTodosProfissionais = (req, res) => {
    const query = 'SELECT id_profissional, nome_completo, email, registro_conselho, especialidade, ativo FROM profissionais';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: 'Erro ao listar profissionais' });
        res.json(results);
    });
};

// 4. Obter um profissional por ID
export const obterProfissional = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT id_profissional, nome_completo, email, registro_conselho, especialidade, ativo FROM profissionais WHERE id_profissional = ?';
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Erro ao buscar profissional' });
        if (results.length === 0) return res.status(404).json({ error: 'Profissional não encontrado' });
        res.json(results[0]);
    });
};

// 5. Atualizar profissional
export const atualizarProfissional = (req, res) => {
    const { id } = req.params;
    const { nome_completo, email, registro_conselho, especialidade, ativo } = req.body;

    const query = 'UPDATE profissionais SET nome_completo = ?, email = ?, registro_conselho = ?, especialidade = ?, ativo = ? WHERE id_profissional = ?';
    db.query(query, [nome_completo, email, registro_conselho, especialidade, ativo, id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Erro ao atualizar profissional' });
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Profissional não encontrado' });
        res.json({ message: 'Profissional atualizado com sucesso!' });
    });
};

// 6. Desativar profissional (Soft Delete)
export const desativarProfissional = (req, res) => {
    const { id } = req.params;
    const query = 'UPDATE profissionais SET ativo = FALSE WHERE id_profissional = ?';
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Erro ao desativar profissional' });
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Profissional não encontrado' });
        res.json({ message: 'Profissional desativado com sucesso!' });
    });
};
