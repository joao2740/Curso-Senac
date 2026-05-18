# Relatório de Testes Unitários e Estruturais

> **Projeto Integrador — Qualidade e Testes em React Native**  
> Tecnologias: React Native · Expo · Jest · Testing Library · MySQL (mock)

---

## Estrutura do Projeto

```
📂 projeto-testes
 ├── 📂 src
 │    ├── 📂 components
 │    │     └── LoginForm.js          # Componente de formulário de login
 │    ├── 📂 screens
 │    │     └── LoginScreen.js        # Tela de login (envolve LoginForm)
 │    ├── 📂 services
 │    │     └── authService.js        # Lógica de validação e autenticação
 │    └── 📂 database
 │          └── mysql.js              # Simulação de consultas ao MySQL
 │
 ├── 📂 tests
 │    ├── authService.test.js         # Módulo 1 — Testes unitários do serviço
 │    ├── mysql.test.js               # Módulo 2 — Testes da camada de banco
 │    └── LoginForm.test.js           # Módulo 3 — Testes estruturais do componente
 │
 ├── README.md
 └── package.json
```

---

## Como Executar os Testes

### Instalação das dependências

```bash
npm install --save-dev jest jest-expo @testing-library/react-native @testing-library/jest-native
```

### Executar todos os testes

```bash
npm test
```

### Executar com relatório de cobertura

```bash
npm run test:coverage
```

### Modo interativo (watch)

```bash
npm run test:watch
```

---

## O que está sendo testado?

### Módulo 1 — `authService.test.js` — Serviço de Autenticação

Testa a lógica de negócio pura da aplicação, isolada de qualquer interface ou banco de dados.

| # | Cenário | Tipo |
|---|---------|------|
| 1.1 | E-mail com formato correto retorna `true` | Unitário |
| 1.2 | E-mail sem `@` retorna `false` | Unitário |
| 1.3 | E-mail vazio retorna `false` | Unitário |
| 1.4 | E-mail nulo retorna `false` | Unitário |
| 1.5 | E-mail sem domínio retorna `false` | Unitário |
| 2.1 | Senha com 6+ caracteres é válida | Unitário |
| 2.2 | Senha com menos de 6 caracteres é inválida | Unitário |
| 2.3 | Senha vazia retorna `false` | Unitário |
| 2.4 | Senha nula retorna `false` | Unitário |
| 3.1 | Login com credenciais válidas retorna sucesso (mock API 200) | Unitário + Mock |
| 3.2 | Senha incorreta retorna mensagem de erro (mock API 401) | Unitário + Mock |
| 3.3 | E-mail inválido não dispara requisição HTTP | Unitário |
| 3.4 | Senha curta não dispara requisição HTTP | Unitário |
| 3.5 | Falha de rede retorna mensagem de erro de conexão | Unitário + Mock |

---

### Módulo 2 — `mysql.test.js` — Camada de Banco de Dados

Testa a camada de acesso a dados com mock do MySQL, verificando regras de negócio do banco.

| # | Cenário | Tipo |
|---|---------|------|
| 1.1 | Usuário existente é encontrado pelo e-mail | Unitário (DB Mock) |
| 1.2 | E-mail inexistente retorna `null` | Unitário (DB Mock) |
| 1.3 | E-mail diferente retorna `null` | Unitário (DB Mock) |
| 2.1 | Credenciais corretas autenticam o usuário | Unitário (DB Mock) |
| 2.2 | Senha incorreta bloqueia o acesso | Unitário (DB Mock) |
| 2.3 | Usuário inexistente é rejeitado | Unitário (DB Mock) |
| 2.4 | Senha nunca é exposta no retorno (segurança) | Unitário (DB Mock) |
| 2.5 | Dados completos do usuário são retornados no sucesso | Unitário (DB Mock) |

---

### Módulo 3 — `LoginForm.test.js` — Componente de Interface

Testa a estrutura visual e o comportamento interativo do componente React Native.

| # | Cenário | Tipo |
|---|---------|------|
| 1.1 | Título, campos e botão renderizam corretamente | Estrutural |
| 1.2 | Nenhuma mensagem de erro no estado inicial | Estrutural |
| 1.3 | Nenhum loading no estado inicial | Estrutural |
| 2.1 | Erro "e-mail obrigatório" ao submeter vazio | Estrutural + Interação |
| 2.2 | Erro de formato para e-mail sem `@` | Estrutural + Interação |
| 2.3 | Erro de senha curta | Estrutural + Interação |
| 2.4 | Campo e-mail aceita texto digitado | Estrutural + Interação |
| 3.1 | `onLoginSuccess` é chamado com dados do usuário | Estrutural + Estado |
| 3.2 | Mensagem de erro da API é exibida na tela | Estrutural + Estado |
| 3.3 | Loading indicator aparece durante requisição | Estrutural + Estado |
| 3.4 | Botão de login some durante o loading | Estrutural + Estado |

---

## O que NÃO está sendo testado?

### Banco de Dados Real
Os testes utilizam **mocks** para simular o MySQL. O módulo `src/database/mysql.js` atua como
uma camada de abstração; em produção seria substituído por chamadas reais à API.
Os testes validam **a lógica da aplicação**, não a infraestrutura.

### APIs Externas Reais
Todas as chamadas HTTP são simuladas com `jest.fn()` para evitar:
- Dependência de conectividade
- Flakiness causada por servidores instáveis
- Custos de requisições em ambiente de CI/CD

### Build e Deploy
Não são realizados testes de publicação nas lojas (App Store / Google Play).
O escopo desta atividade cobre apenas **testes de unidade e estrutura**.

---

## Padrão AAA — Arrange · Act · Assert

Todos os testes seguem o padrão **AAA** para garantir clareza e manutenção:

```javascript
test('descrição clara do que está sendo testado', async () => {
  // Arrange — Preparar dados, mocks e ambiente
  const mockUser = { id: 1, name: 'Usuário Teste' };
  authenticateUser.mockResolvedValueOnce({ success: true, user: mockUser });

  // Act — Executar a ação ou função
  const result = await authenticateUser('usuario@email.com', 'senha123');

  // Assert — Verificar o resultado esperado
  expect(result.success).toBe(true);
  expect(result.user).toEqual(mockUser);
});
```

---

## Uso de Mocks

Os mocks são usados para **isolar unidades lógicas** e evitar dependências externas:

```javascript
// Mock de fetch (chamada HTTP)
const mockFetch = jest.fn().mockResolvedValue({
  ok: true,
  json: async () => ({ user: { id: 1, name: 'Usuário Teste' } }),
});

// Mock de módulo inteiro
jest.mock('../src/services/authService', () => ({
  authenticateUser: jest.fn(),
  validateEmail: jest.fn(),
  validatePassword: jest.fn(),
}));
```

---

## Tecnologias Utilizadas

| Tecnologia | Versão | Função |
|------------|--------|--------|
| React Native | 0.74+ | Framework mobile |
| Expo | 51+ | Ambiente de desenvolvimento |
| Jest | 29+ | Framework de testes |
| jest-expo | 51+ | Preset Jest para Expo |
| @testing-library/react-native | 12+ | Testes de componentes |
| @testing-library/jest-native | 5+ | Matchers customizados |
| MySQL | — | Banco de dados (mockado nos testes) |
| JavaScript (ES Modules) | ES2022 | Linguagem |
