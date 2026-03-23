import db from '../config/db.js';

// Listar todos os pacientes
export const listarTodos = (req, res) => {
  const query = 'SELECT * FROM pacientes';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao listar pacientes' });
    }
    res.json(results);
  });
};

// Obter paciente por ID
export const obterPaciente = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM pacientes WHERE id_paciente = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao obter paciente' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }
    res.json(results[0]);
  });
};

// Criar novo paciente
export const criarPaciente = (req, res) => {
  const { nome_completo, cpf, data_nascimento, sexo, contato } = req.body;
  const query = 'INSERT INTO pacientes (nome_completo, cpf, data_nascimento, sexo, contato) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [nome_completo, cpf, data_nascimento, sexo, contato], (err, results) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'CPF já cadastrado' });
      }
      return res.status(500).json({ error: 'Erro ao criar paciente' });
    }
    res.status(201).json({ id: results.insertId, message: 'Paciente criado com sucesso' });
  });
};

// Atualizar paciente
export const atualizarPaciente = (req, res) => {
  const { id } = req.params;
  const { nome_completo, cpf, data_nascimento, sexo, contato } = req.body;
  const query = 'UPDATE pacientes SET nome_completo = ?, cpf = ?, data_nascimento = ?, sexo = ?, contato = ? WHERE id_paciente = ?';
  db.query(query, [nome_completo, cpf, data_nascimento, sexo, contato, id], (err, results) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'CPF já cadastrado' });
      }
      return res.status(500).json({ error: 'Erro ao atualizar paciente' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }
    res.json({ message: 'Paciente atualizado com sucesso' });
  });
};

// Deletar paciente
export const deletarPaciente = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM pacientes WHERE id_paciente = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao deletar paciente' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }
    res.json({ message: 'Paciente deletado com sucesso' });
  });
};