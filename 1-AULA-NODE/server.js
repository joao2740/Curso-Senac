

// Criando API Node JS
const express = require('express');
const app = express();

app.use(express.json());

const port = 3000;

// Criando Rotas
let users = [
    {id: 1, nome: 'Cleber'},
    {id: 2, nome: 'Mario'},
    {id: 3, nome: 'Jão'}
];

// Rota GET
app.get("/usuarios", (req, res) => {
    res.json(users);
})

// Rota POST
app.post("/usuarios", (req, res) => {
    const novoUsuario = {
        id: users.length + 1,
        nome: req.body.nome
    };

    users.push(novoUsuario);
    res.status(201).json(`Novo usuario adicionado ${novoUsuario}`);
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});