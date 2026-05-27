# Implementação de Testes Automatizados — Evidências

## Ambiente Configurado

- **Framework de Testes:** Vitest v4
- **Biblioteca de UI:** React Testing Library
- **Ambiente:** jsdom
- **Configuração:** `vite.config.js` + `src/setupTests.js`

## Dependências Instaladas

```bash
npm install --save-dev vitest @vitest/coverage-v8 @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

## Scripts Disponíveis

```bash
npm test              # modo watch interativo
npm run test:run      # execução única (CI)
npm run test:coverage # relatório de cobertura
```

## Estrutura de Testes

```
src/
├── setupTests.js
├── components/
│   └── __tests__/
│       ├── Button.test.jsx    (4 testes)
│       ├── CardArea.test.jsx  (5 testes)
│       ├── Header.test.jsx    (7 testes)
│       └── App.test.jsx       (8 testes — integração)
└── sections/
    └── __tests__/
        ├── Areas.test.jsx     (8 testes)
        ├── Hero.test.jsx      (5 testes)
        └── Sobre.test.jsx     (7 testes)
```

## Resultado da Execução

```
 ✓ src/components/__tests__/App.test.jsx      (8 tests)
 ✓ src/components/__tests__/Header.test.jsx   (7 tests)
 ✓ src/sections/__tests__/Sobre.test.jsx      (7 tests)
 ✓ src/sections/__tests__/Hero.test.jsx       (5 tests)
 ✓ src/components/__tests__/Button.test.jsx   (4 tests)
 ✓ src/components/__tests__/CardArea.test.jsx (5 tests)
 ✓ src/sections/__tests__/Areas.test.jsx      (8 tests)

 Test Files  7 passed (7)
      Tests  44 passed (44)
```

## Falha Identificada e Corrigida

Durante o desenvolvimento, o teste de integração do `App` falhou com:

> `TestingLibraryElementError: Found multiple elements with the text: Áreas de Atuação`

**Causa:** O texto "Áreas de Atuação" aparece duas vezes no HTML completo — uma vez no `<a>` de navegação do `Header` e outra no `<h2>` da seção `Areas`.

**Correção:** Substituição de `getByText` por `getAllByText`, validando que ao menos uma ocorrência existe, e buscando os itens específicos da seção (`Direito Civil`, `Direito Trabalhista`, `Direito Empresarial`) individualmente.

**Lição:** Em testes de integração que renderizam a aplicação inteira, textos repetidos entre componentes exigem queries mais específicas (`getByRole`, `getAllByText`, `within`).

## Boas Práticas Aplicadas

- Testes focados em **comportamento visível ao usuário**, não em implementação interna
- Uso de `getByRole` com semântica acessível (`button`, `heading`, `link`, `banner`)
- Uso de `getByText` com regex (`/texto/i`) para tolerância a capitalização
- Separação entre testes de **componente isolado** e testes de **integração**
- Um `describe` por arquivo de teste com casos coesos
