/**
 * loginController.js
 * Controlador da rota POST /login — Secure Login API
 */

const { validateLogin } = require("./loginValidator");

/**
 * Simula uma base de dados de usuários em memória.
 * Em produção, utilize um banco de dados real com senhas hasheadas.
 */
const MOCK_USERS = [
  { email: "usuario@dominio.com", password: "Senha@123" },
  { email: "admin@empresa.com", password: "Admin#456" },
];

/**
 * Handler para POST /login
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
function loginHandler(req, res) {
  const { email, password } = req.body;

  // 1. Validação de formato/preenchimento
  const validation = validateLogin(email, password);
  if (!validation.valid) {
    return res.status(400).json({ success: false, message: validation.error });
  }

  // 2. Verificação de credenciais
  const user = MOCK_USERS.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Credenciais inválidas." });
  }

  // 3. Login confirmado
  return res.status(200).json({
    success: true,
    message: "Login realizado com sucesso.",
    token: Buffer.from(`${email}:${Date.now()}`).toString("base64"),
  });
}

module.exports = { loginHandler };
