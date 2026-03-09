const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'segredo';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

// Register (cria usuário)
router.post('/register',
  body('username').isString().notEmpty(),
  body('password').isString().isLength({ min: 6 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { username, password } = req.body;
    const users = db.getUsers();
    if (users.find(u => u.username === username)) {
      return res.status(409).json({ mensagem: 'Usuário já existe' });
    }

    const hashed = bcrypt.hashSync(password, 8);
    const user = { id: uuidv4(), username, password: hashed };
    users.push(user);
    db.saveUsers(users);
    res.status(201).json({ id: user.id, username: user.username });
  }
);

// Login
router.post('/login',
  body('username').isString().notEmpty(),
  body('password').isString().notEmpty(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { username, password } = req.body;
    const users = db.getUsers();
    const user = users.find(u => u.username === username);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ mensagem: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    res.json({ token });
  }
);

module.exports = router;