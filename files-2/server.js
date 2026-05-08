/**
 * server.js
 * Inicialização do servidor — Secure Login API
 */

const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅  Secure Login API rodando em http://localhost:${PORT}`);
});
