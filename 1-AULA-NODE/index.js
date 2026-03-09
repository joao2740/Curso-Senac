// Importando o Express
import express from "express";

// Inicializando o app
const app = express();

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Lista de usuários simulando um banco de dados
let users = [
  { id: 1, nome: "João Vitor" },
  { id: 2, nome: "Luis Eduardo" },
  { id: 3, nome: "Caue" },
  { id: 4, nome: "Guilherme" }
];

// Rota GET - Retorna todos os usuários
app.get("/users", (req, res) => {
  res.json(users);
});

// Definição da porta (usa variável de ambiente ou padrão 3000)
const port = process.env.PORT ?? 3000;

// Inicia o servidor
app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});