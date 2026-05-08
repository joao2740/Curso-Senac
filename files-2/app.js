/**
 * app.js
 * Ponto de entrada da aplicação — Secure Login API
 */

const express = require("express");
const { loginHandler } = require("./loginController");

const app = express();
app.use(express.json());

// Rota principal de login
app.post("/login", loginHandler);

// Rota de health check
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

module.exports = app;
