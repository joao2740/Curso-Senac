# 🔐 Secure Login API

API de autenticação com validação de entrada, acompanhada de testes unitários e estruturais.

---

## 📁 Estrutura do Projeto

```
securelogin-api/
├── src/
│   ├── app.js              # Configuração Express + rotas
│   ├── server.js           # Inicialização do servidor
│   ├── loginValidator.js   # Módulo de validação (lógica pura)
│   └── loginController.js  # Controlador da rota POST /login
├── tests/
│   ├── loginValidator.test.js   # Testes Unitários
│   └── loginController.test.js  # Testes Estruturais (integração)
├── package.json
└── README.md
```

---

## 🚀 Instalação e Execução

```bash
# Instalar dependências
npm install

# Iniciar o servidor
npm start
# Servidor rodando em http://localhost:3000
```

---

## 🧪 Testes

```bash
# Todos os testes com cobertura
npm test

# Apenas testes unitários (loginValidator)
npm run test:unit

# Apenas testes estruturais (loginController / integração)
npm run test:structural
```

---

## 📋 Casos de Teste

| ID    | Tipo        | Entrada                                         | Resultado Esperado                              |
|-------|-------------|-------------------------------------------------|-------------------------------------------------|
| CT01  | Unitário    | `email: ""`                                     | HTTP 400 — "O e-mail é obrigatório."            |
| CT02  | Unitário    | `email: "usuario-invalido"`                     | HTTP 400 — "Formato de e-mail inválido."        |
| CT03  | Unitário    | `password: ""`                                  | HTTP 400 — "A senha é obrigatória."             |
| CT04  | Unitário    | `password: "123"` (< 6 chars)                   | HTTP 400 — "A senha deve ter no mínimo 6 caracteres." |
| CT05  | Positivo    | `email: "usuario@dominio.com"` `password: "Senha@123"` | HTTP 200 — Login com token             |

---

## 📡 Endpoint

### `POST /login`

**Body (JSON):**
```json
{
  "email": "usuario@dominio.com",
  "password": "Senha@123"
}
```

**Resposta de sucesso (200):**
```json
{
  "success": true,
  "message": "Login realizado com sucesso.",
  "token": "<base64-token>"
}
```

**Resposta de erro (400):**
```json
{
  "success": false,
  "message": "O e-mail é obrigatório."
}
```

---

## 🔍 Fluxo de Validação

```
Requisição POST /login
        │
        ├─ E-mail vazio? ──► 400 "O e-mail é obrigatório."
        │
        ├─ Formato inválido? ──► 400 "Formato de e-mail inválido."
        │
        ├─ Senha vazia? ──► 400 "A senha é obrigatória."
        │
        ├─ Senha < 6 chars? ──► 400 "A senha deve ter no mínimo 6 caracteres."
        │
        ├─ Credenciais erradas? ──► 401 "Credenciais inválidas."
        │
        └─ Tudo OK ──► 200 + token
```
