# 🧪 Relatório de Testes Unitários — Projeto Integrador

> **Ferramenta:** Jest | **Padrão:** AAA (Arrange, Act, Assert) | **Status:** ![Tests](https://img.shields.io/badge/testes-9%20passando-brightgreen)

---

## 📁 Estrutura de Diretórios

```
📂 projeto-integrador
 ├── 📂 src
 │    └── 📂 services
 │         └── auth.js          ← Lógica de autenticação
 ├── 📂 tests
 │    └── auth.test.js          ← Testes unitários (Jest)
 ├── package.json
 └── README.md
```

---

## ✅ O que está sendo testado?

### Módulo de Autenticação (`auth.js`)

| # | Cenário | Descrição |
|---|---------|-----------|
| **1** | ✅ Sucesso na Autenticação | Verifica se a função retorna um token e os dados do usuário quando as credenciais são válidas |
| **2** | ❌ Tratamento de Erro | Verifica se o sistema retorna uma mensagem de erro ao inserir senha incorreta ou e-mail não cadastrado |
| **3** | 🔍 Validação de Campo | Garante que o login não é disparado com e-mail vazio, formato inválido ou senha vazia |

---

## ❌ O que NÃO está sendo testado?

| Item | Motivo |
|------|--------|
| **Banco de Dados real** | Os testes utilizam `jest.fn()` (mocks) para simular o banco, focando apenas na lógica da função |
| **Interface Gráfica (UI)** | Não testamos cliques em botões ou renderização — apenas a lógica JavaScript |
| **Chamadas de API Externas** | As respostas de APIs de terceiros são simuladas para evitar dependência de rede |
| **Criptografia de senhas** | O escopo cobre a lógica de fluxo; hash de senhas seria testado em módulo separado |

---

## 🚀 Como rodar os testes

**1. Instale as dependências:**
```bash
npm install
```

**2. Execute os testes:**
```bash
npm test
```

**3. Saída esperada:**
```
PASS tests/auth.test.js
  Cenário 1: Sucesso na Autenticação
    ✓ deve retornar um token válido quando as credenciais estão corretas
    ✓ deve incluir os dados do usuário (sem a senha) no retorno de sucesso
  Cenário 2: Tratamento de Erro
    ✓ deve retornar erro ao inserir uma senha incorreta
    ✓ deve retornar erro quando o e-mail não está cadastrado no sistema
  Cenário 3: Validação de Campo
    ✓ não deve disparar o login quando o e-mail está vazio
    ✓ não deve disparar o login quando o e-mail está em formato inválido
    ✓ não deve disparar o login quando a senha está vazia
    validarEmail() — casos de borda
      ✓ deve aceitar e-mails no formato correto
      ✓ deve rejeitar formatos inválidos de e-mail

Tests: 9 passed, 9 total
```

---

## 🏗️ Padrão AAA utilizado nos testes

Todos os testes seguem o padrão **Arrange → Act → Assert**:

```js
test("deve retornar um token válido quando as credenciais estão corretas", () => {
  // ARRANGE — prepara os dados e o mock do banco de dados
  const emailValido = "admin@loja.com";
  const senhaValida = "senha123";
  const buscarUsuarioMock = jest.fn().mockReturnValue({ id: 1, ... });

  // ACT — executa a função que queremos testar
  const resultado = realizarLogin(emailValido, senhaValida, buscarUsuarioMock);

  // ASSERT — verifica se o resultado é o esperado
  expect(resultado.sucesso).toBe(true);
  expect(resultado.token).toBeDefined();
});
```

---

## 🔑 Decisões Técnicas

- **Injeção de dependência:** A função `realizarLogin` aceita um parâmetro `buscarUsuario` opcional, permitindo substituir o acesso ao banco por um `jest.fn()` nos testes — sem alterar a lógica de produção.
- **Isolamento:** Cada teste é independente; nenhum compartilha estado com outro.
- **Segurança verificada:** O teste confirma que a senha **nunca** é exposta no retorno da função.

---

## 📦 Dependências

```json
{
  "devDependencies": {
    "jest": "^30.x"
  }
}
```
