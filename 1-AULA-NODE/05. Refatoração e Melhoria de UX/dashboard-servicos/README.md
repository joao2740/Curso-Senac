# Dashboard de Serviços - Refatoração UX/UI

## 📋 Descrição do Projeto

Este projeto é uma **refatoração completa** de um Dashboard de Serviços desenvolvido em **React** com foco em melhorias de **experiência do usuário (UX)** e **refinamento visual (UI)**. O objetivo foi transformar uma interface funcional em uma interface centrada no usuário, aplicando conceitos de usabilidade, boas práticas de design e acessibilidade web.

**Instrutor:** Hudson Neves  
**Módulo:** Desenvolvimento Front-end com React  
**Curso:** Desenvolvimento de Sistemas

---

## 🎯 Melhorias de UX Implementadas

### ✅ 1. Semântica HTML e Acessibilidade
- Uso correto de tags semânticas: `<header>`, `<main>`, `<footer>`, `<section>`, `<article>`
- Atributos ARIA para melhor interpretação por leitores de tela
- Labels descritivos em botões para acessibilidade
- Suporte a navegação por teclado
- Suporte automático a modo escuro (prefers-color-scheme)

### ✅ 2. Paleta Harmônica de Cores
- Sistema de variáveis CSS com paleta profissional
- **Cores Principais**: Azul (#2563eb), Verde (#10b981), Âmbar (#f59e0b)
- Melhor contraste entre texto e fundo (WCAG AA)
- Cores neutras bem definidas para hierarquia visual

### ✅ 3. Tipografia e Hierarquia
- Definição clara de hierarquia de textos (H1-H6)
- Fonte moderna: Segoe UI, system-ui
- Tamanhos de fonte padronizados e escaláveis
- Line-height adequado para legibilidade (1.6-1.8)

### ✅ 4. Feedback Visual e Interatividade
- Estados hover melhorados em botões e cards
- Elevação visual (transform) ao passar mouse
- Animações suaves (transition: 0.3s)
- Indicador visual de navegação ativa
- Gradientes modernos em botões
- Box shadows para profundidade

### ✅ 5. Layout Responsivo
- Flexbox para alinhamento e distribuição
- CSS Grid com auto-fit para responsividade automática
- **Breakpoints**: Desktop (>768px), Tablet (481-768px), Mobile (≤480px)
- Botões fullwidth em mobile
- Navegação adaptável

### ✅ 6. Refinamento Visual
- Sombras CSS para profundidade
- Border radius consistente
- Espaçamento uniforme (sistema 8px)
- Animação do underline em links
- Efeito de barra colorida nos cards

---

## 🛠️ Tecnologias Utilizadas

- **React** 19.2.0
- **Vite** 7.3.1
- **CSS3** (Variáveis customizadas)
- **HTML5** (Semântica correta)
- **Git/GitHub**

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- Node.js 16+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/2025-08-53/dashboard-servicos.git

# Entre no diretório
cd dashboard-servicos

# Instale as dependências
npm install
```

### Desenvolvimento

```bash
# Inicie o servidor com hot reload
npm run dev

# Abrir em: http://localhost:5173
```

### Produção

```bash
# Build otimizado
npm run build

# Preview da build
npm run preview
```

---

## 📂 Estrutura do Projeto

```
src/
├── components/
│   ├── Header.jsx           # Cabeçalho com navegação
│   └── CardServico.jsx      # Card reutilizável
├── sections/
│   └── Servicos.jsx         # Seção de serviços
├── styles/
│   └── global.css           # Estilos globais
├── App.jsx                  # Componente raiz
├── index.css                # CSS base e variáveis
└── main.jsx                 # Ponto de entrada
```

---

## 🎨 Sistema de Design

### Paleta de Cores
```css
--color-primary:       #2563eb
--color-secondary:     #10b981
--color-accent:        #f59e0b
--color-text-primary:  #111827
--color-bg-primary:    #ffffff
```

### Espaçamento
```css
--spacing-md:   1rem
--spacing-lg:   1.5rem
--spacing-xl:   2rem
--spacing-2xl:  3rem
```

---

## 📝 Histórico de Commits

Seguindo Conventional Commits:

1. **refactor**: Melhoria semântica HTML e acessibilidade
   - Tags semânticas corretas
   - Atributos ARIA
   - Estrutura melhorada

2. **style**: Implementação de paleta harmônica e design visual
   - Sistema de cores
   - Variáveis CSS
   - Responsividade
   - Efeitos hover

3. **docs**: Documentação profissional completa
   - README detalhado
   - Sistema de design documentado
   - Instruções de execução

---

## ✨ Destaques

- 🎨 Design modular com variáveis CSS
- ♿ Acessibilidade WCAG conforme
- 📱 100% responsivo (mobile-first)
- 🌙 Suporte automático a dark mode
- ⚡ Animações suaves e profissionais
- 🔍 Código limpo e bem organizado

---

## 🎓 Objetivos Alcançados

✅ Identificar problemas de usabilidade  
✅ Aplicar princípios de Design Visual  
✅ Implementar Responsividade  
✅ Melhorar Acessibilidade  
✅ Dominar fluxo Git/GitHub profissional  
✅ Código limpo e bem estruturado  
✅ Documentação profissional  

---

**Desenvolvido em:** Março 2025  
**Status:** ✅ Completo e Pronto para Produção  
**Repositório:** https://github.com/2025-08-53/dashboard-servicos
