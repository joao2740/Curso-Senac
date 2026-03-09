const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'segredo';

function autenticar(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ mensagem: 'Token não encontrado' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ mensagem: 'Token mal formatado' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ mensagem: 'Token inválido' });
    req.userId = decoded.id;
    next();
  });
}

module.exports = autenticar;