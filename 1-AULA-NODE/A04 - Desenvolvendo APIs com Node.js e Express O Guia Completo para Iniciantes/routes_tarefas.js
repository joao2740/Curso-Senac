const express = require('express');
const { body, param, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const autenticar = require('../middleware/auth');
const db = require('../db');

const router = express.Router();

// Listar tarefas
router.get('/', (req, res) => {
  const tarefas = db.getTarefas();
  res.json(tarefas);
});

// Criar tarefa (autenticado)
router.post('/',
  autenticar,
  body('nome').isString().notEmpty(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { nome } = req.body;
    const tarefas = db.getTarefas();
    const nova = { id: uuidv4(), nome, criadoEm: new Date().toISOString(), ownerId: req.userId };
    tarefas.push(nova);
    db.saveTarefas(tarefas);
    res.status(201).json(nova);
  }
);

// Atualizar tarefa (autenticado, só dono)
router.put('/:id',
  autenticar,
  param('id').isString().notEmpty(),
  body('nome').isString().notEmpty(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { id } = req.params;
    const { nome } = req.body;
    const tarefas = db.getTarefas();
    const tarefa = tarefas.find(t => t.id === id);
    if (!tarefa) return res.status(404).json({ mensagem: 'Tarefa não encontrada' });
    if (tarefa.ownerId !== req.userId) return res.status(403).json({ mensagem: 'Ação não permitida' });

    tarefa.nome = nome;
    tarefa.atualizadoEm = new Date().toISOString();
    db.saveTarefas(tarefas);
    res.json(tarefa);
  }
);

// Deletar tarefa (autenticado, só dono)
router.delete('/:id',
  autenticar,
  param('id').isString().notEmpty(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { id } = req.params;
    let tarefas = db.getTarefas();
    const tarefa = tarefas.find(t => t.id === id);
    if (!tarefa) return res.status(404).json({ mensagem: 'Tarefa não encontrada' });
    if (tarefa.ownerId !== req.userId) return res.status(403).json({ mensagem: 'Ação não permitida' });

    tarefas = tarefas.filter(t => t.id !== id);
    db.saveTarefas(tarefas);
    res.status(204).send();
  }
);

module.exports = router;