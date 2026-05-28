# 📋 Guia Completo — Testes Automatizados com Vitest e React Testing Library

> **Atividade 09 — Implementação de Testes Automatizados em Aplicações React**

---

## 🚀 1. Instalação e Configuração do Ambiente

### 1.1 — Instalar dependências de teste

Execute no terminal, **na pasta raiz do projeto**:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @vitest/coverage-v8
```

| Pacote | Função |
|---|---|
| `vitest` | Framework de testes (substitui Jest) |
| `@testing-library/react` | Utilitários para renderizar componentes React |
| `@testing-library/jest-dom` | Matchers extras: `toBeInTheDocument()`, `toHaveClass()`, etc. |
| `@testing-library/user-event` | Simula interações reais do usuário |
| `jsdom` | Simula o ambiente do browser (DOM) |
| `@vitest/coverage-v8` | Gera relatório de cobertura de código |

---

### 1.2 — Configurar `vite.config.js`

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',        // Simula o DOM do browser
    setupFiles: ['./src/tests/setupTests.js'],
    globals: true,               // Permite usar describe/it/expect sem imports
  },
})
```

---

### 1.3 — Configurar `package.json` (scripts)

```json
{
  "scripts": {
    "dev":           "vite",
    "test":          "vitest",
    "test:run":      "vitest run",
    "test:coverage": "vitest run --coverage"
  }
}
```

---

### 1.4 — Criar `src/tests/setupTests.js`

```js
import '@testing-library/jest-dom'
```

---

## 📁 2. Estrutura do Projeto

```
src/
├── components/
│   ├── Button.jsx
│   ├── CardArea.jsx
│   └── Header.jsx
├── sections/
│   ├── Hero.jsx
│   ├── Sobre.jsx
│   └── Areas.jsx
├── tests/
│   ├── setupTests.js              ← Configuração global
│   ├── App.test.jsx               ← Teste de integração
│   ├── components/
│   │   ├── Button.test.jsx
│   │   ├── CardArea.test.jsx
│   │   └── Header.test.jsx
│   └── sections/
│       ├── Hero.test.jsx
│       ├── Sobre.test.jsx
│       └── Areas.test.jsx
└── App.jsx
```

---

## ▶️ 3. Executando os Testes

```bash
# Modo watch (re-executa ao salvar)
npm test

# Execução única (para entrega)
npm run test:run

# Com relatório de cobertura de código
npm run test:coverage
```

---

## 🧪 4. Conceitos Fundamentais

### `render()` — Renderiza o componente

```jsx
import { render } from '@testing-library/react'
render(<Button label="Clique aqui" />)
```

### `screen` — Acessa elementos renderizados

```jsx
import { screen } from '@testing-library/react'
const botao = screen.getByRole('button', { name: /clique aqui/i })
```

### `expect()` + matchers — Verifica comportamento

```jsx
expect(botao).toBeInTheDocument()   // elemento existe no DOM
expect(botao).toHaveClass('btn--primary')  // tem a classe CSS
expect(botao).toBeDisabled()        // está desabilitado
expect(botao).not.toBeDisabled()    // NÃO está desabilitado
```

### `fireEvent` — Simula eventos

```jsx
import { fireEvent } from '@testing-library/react'
fireEvent.click(botao)
```

### `vi.fn()` — Função espiã (mock)

```jsx
const handleClick = vi.fn()
render(<Button onClick={handleClick} />)
fireEvent.click(screen.getByRole('button'))
expect(handleClick).toHaveBeenCalledTimes(1)
```

---

## 🔍 5. Queries do `screen` — Como buscar elementos

| Query | Quando usar |
|---|---|
| `getByRole('button')` | Elemento tem papel semântico |
| `getByRole('heading', { level: 1 })` | Título h1 específico |
| `getByRole('link', { name: /texto/i })` | Link com texto |
| `getByRole('banner')` | Elemento `<header>` |
| `getByRole('navigation')` | Elemento `<nav>` |
| `getByRole('region')` | Elemento `<section>` com aria-label |
| `getByRole('article')` | Elemento `<article>` |
| `getByText(/texto/i)` | Texto visível na tela |
| `getAllByRole(...)` | Retorna array de todos os encontrados |
| `queryByText(...)` | Retorna null se não encontrar (sem erro) |

> 💡 **Sempre prefira `getByRole` — segue a acessibilidade real do usuário!**

---

## ✅ 6. Matchers do `jest-dom`

```js
expect(el).toBeInTheDocument()        // existe no DOM
expect(el).toBeVisible()              // está visível
expect(el).toBeDisabled()             // está desabilitado
expect(el).toHaveClass('minha-classe')// tem a classe CSS
expect(el).toHaveAttribute('href', '#home') // tem atributo
expect(el).toHaveTextContent('texto') // contém texto
expect(fn).toHaveBeenCalledTimes(1)   // função foi chamada N vezes
expect(fn).not.toHaveBeenCalled()     // função não foi chamada
expect(array).toHaveLength(3)         // array tem N itens
```

---

## 📊 7. Resumo dos Testes Implementados

| Arquivo de Teste | Nº de Testes | O que valida |
|---|---|---|
| `Button.test.jsx` | 11 | Renderização, variantes, disabled, click |
| `Header.test.jsx` | 9 | Logo, navegação, links, atributos |
| `CardArea.test.jsx` | 8 | Título, descrição, ícone, acessibilidade |
| `Hero.test.jsx` | 7 | Seção, h1, subtítulo, botões |
| `Sobre.test.jsx` | 8 | Título, descrição, lista de destaques |
| `Areas.test.jsx` | 9 | Seção, cards padrão, props customizadas |
| `App.test.jsx` | 14 | Integração completa da aplicação |
| **Total** | **66 testes** | Cobertura completa da aplicação |

---

## ⚠️ 8. Boas Práticas

1. **Teste comportamento, não implementação** — verifique o que o usuário vê/faz
2. **Use `getByRole`** — reflete a acessibilidade real
3. **Use `/regex/i`** — case-insensitive é mais robusto
4. **Um teste = uma responsabilidade** — testes pequenos e focados
5. **Use `describe` para agrupar** — organização clara
6. **Prefira `queryBy*` para checar ausência** — não lança erro
7. **`beforeEach` para setup repetitivo** — evita duplicação

---

## 🐛 9. Erros Comuns e Soluções

### ❌ `TestingLibraryElementError: Unable to find an accessible element`
**Causa:** O elemento não foi encontrado pelo role/texto especificado.  
**Solução:** Verifique o aria-label, role ou texto. Use `screen.debug()` para inspecionar o DOM.

```jsx
// Debug: imprime o HTML renderizado no console
screen.debug()
```

### ❌ `ReferenceError: describe is not defined`
**Causa:** `globals: true` não está no `vite.config.js`.  
**Solução:** Adicione `globals: true` dentro de `test: {}`.

### ❌ `Error: Could not find declaration of 'jest-dom'`
**Causa:** `setupFiles` não aponta para `setupTests.js`.  
**Solução:** Verifique o caminho em `setupFiles` no `vite.config.js`.

---

## 📦 10. Entrega — Checklist

- [ ] `npm run test:run` executa todos os testes sem falhas
- [ ] Arquivo `vite.config.js` configurado com `test`
- [ ] `setupTests.js` importa `@testing-library/jest-dom`
- [ ] Testes para `Button`, `CardArea`, `Header`
- [ ] Testes para seções `Hero`, `Sobre`, `Areas`
- [ ] Teste de integração `App.test.jsx`
- [ ] Repositório GitHub atualizado com evidência dos testes
