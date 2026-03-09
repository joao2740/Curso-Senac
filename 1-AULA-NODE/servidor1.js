

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json())

let usuarios = [
    {id:1, nome: 'Cleber', email:'cleber123@gmail.com'},
    {id:2, nome: 'Pedro', email:'pedro4002@gmail.com'},
    {id:3, nome: 'João', email:'jao7878@gmail.com'}
];

app.get("/usuarios", (req, res) => {
    res.json({
        mensagem: "Lista de usuários",
        data: usuarios,
        total: usuarios.length
    });
});

app.get("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === id);

    if(!usuario) {
        return res.status(404).json({
            mensagem: "Usuário não encontrado",
            error: true
        });
    }

    res.json({
        mensagem: "Usuário encontrado",
        data: usuario
    });
});

app.post("/usuarios", (req, res) => {
    const {nome, email} = req.body;
    
    if(!nome || !email) {
        return res.status(400).json({mensagem: "Nome e email são campos obrigatórios."});
    }

    const novoId = usuarios.length ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
    const novoUsuario = {id: novoId, nome, email};
    usuarios.push(novoUsuario);

    res.status(200).json({mensagem: "Novo usuário adicionado", data: novoUsuario});
});

app.put("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const usuarioIndex = usuarios.findIndex(u => u.id === id);

    if(usuarioIndex === -1) {
        return res.status(401).json({
            mensagem: "Usuário não encontrado",
            error: true
        });
    }

    const {nome, email} = req.body;

    if(!nome || !email) {
        return res.status(400).json({
            mensagem: "Nome e email são obrigatórios",
            error: true
        });
    }

    usuarios[usuarioIndex] = { id, nome, email };

    res.json({
        mensagem: "Usuário atualizado com sucesso",
        data: usuarios[usuarioIndex]
    });
});

app.delete("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    
    const usuarioIndex = usuarios.findIndex(u => u.id === id);
    
    if (usuarioIndex === -1) {
        return res.status(404).json({
        mensagem: "Usuário não encontrado",
        error: true
        });
    }
    
    const usuarioRemovido = usuarios.splice(usuarioIndex, 1)[0];
    
    res.json({
        mensagem: "Usuário removido com sucesso",
        data: usuarioRemovido
    });
})


// Abrindo o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})