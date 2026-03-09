const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const authRoutes = require('./routes/auth');
const tarefasRoutes = require('./routes/tarefas');

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 100
});
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tarefas', tarefasRoutes);

// Healthcheck
app.get('/', (req, res) => {
  res.send('Bem-vindo à API de Tarefas!');
});

// Error handler simples
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ mensagem: err.message || 'Erro interno' });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});