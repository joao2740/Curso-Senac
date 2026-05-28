// src/tests/App.test.jsx
import { render, screen } from '@testing-library/react'
import App from '../App'

// ============================================================
// TESTES DE INTEGRAÇÃO: App (aplicação completa)
// Aqui verificamos se todos os componentes se integram corretamente
// ============================================================
describe('Aplicação App — Teste de Integração', () => {

  // beforeEach renderiza o App antes de cada teste deste describe
  beforeEach(() => {
    render(<App />)
  })

  // ----------------------------------------------------------
  // GRUPO 1: Estrutura geral da página
  // ----------------------------------------------------------
  describe('Estrutura geral da página', () => {

    test('deve renderizar o Header da aplicação', () => {
      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()
    })

    test('deve exibir o nome "ReactPro" no Header', () => {
      expect(screen.getByText('ReactPro')).toBeInTheDocument()
    })

    test('deve renderizar a seção Hero', () => {
      const hero = screen.getByRole('region', { name: /seção hero/i })
      expect(hero).toBeInTheDocument()
    })

    test('deve renderizar a seção Sobre', () => {
      const sobre = screen.getByRole('region', { name: /seção sobre/i })
      expect(sobre).toBeInTheDocument()
    })

    test('deve renderizar a seção Areas', () => {
      const areas = screen.getByRole('region', { name: /seção de áreas de atuação/i })
      expect(areas).toBeInTheDocument()
    })

  })

  // ----------------------------------------------------------
  // GRUPO 2: Conteúdo do Hero
  // ----------------------------------------------------------
  describe('Conteúdo do Hero', () => {

    test('deve exibir o título principal do Hero', () => {
      const h1 = screen.getByRole('heading', { level: 1, name: /bem-vindo ao reactpro/i })
      expect(h1).toBeInTheDocument()
    })

    test('deve exibir o subtítulo do Hero', () => {
      expect(
        screen.getByText(/desenvolvimento web moderno com react e boas práticas/i)
      ).toBeInTheDocument()
    })

    test('deve exibir os botões de ação no Hero', () => {
      const botaoSaibaMais  = screen.getByRole('button', { name: /saiba mais/i })
      const botaoContato    = screen.getByRole('button', { name: /entre em contato/i })
      expect(botaoSaibaMais).toBeInTheDocument()
      expect(botaoContato).toBeInTheDocument()
    })

  })

  // ----------------------------------------------------------
  // GRUPO 3: Conteúdo do Sobre
  // ----------------------------------------------------------
  describe('Conteúdo do Sobre', () => {

    test('deve exibir o título da seção Sobre com o nome "ReactPro"', () => {
      const titulo = screen.getByRole('heading', { name: /sobre reactpro/i })
      expect(titulo).toBeInTheDocument()
    })

    test('deve exibir a descrição da empresa no Sobre', () => {
      expect(
        screen.getByText(/especialistas em desenvolvimento de aplicações react/i)
      ).toBeInTheDocument()
    })

    test('deve exibir os destaques no Sobre', () => {
      expect(screen.getByText(/código limpo e testado/i)).toBeInTheDocument()
      expect(screen.getByText(/componentização eficiente/i)).toBeInTheDocument()
      expect(screen.getByText(/performance otimizada/i)).toBeInTheDocument()
    })

  })

  // ----------------------------------------------------------
  // GRUPO 4: Conteúdo das Areas
  // ----------------------------------------------------------
  describe('Conteúdo das Areas', () => {

    test('deve exibir o título da seção Areas', () => {
      const titulo = screen.getByRole('heading', { name: /nossas áreas de atuação/i })
      expect(titulo).toBeInTheDocument()
    })

    test('deve exibir os 3 cards de área na seção Areas', () => {
      const cards = screen.getAllByRole('article')
      expect(cards).toHaveLength(3)
    })

    test('deve exibir todos os cards de áreas padrão', () => {
      expect(screen.getByText('Desenvolvimento Web')).toBeInTheDocument()
      expect(screen.getByText('Design UI/UX')).toBeInTheDocument()
      expect(screen.getByText('Consultoria Técnica')).toBeInTheDocument()
    })

  })

  // ----------------------------------------------------------
  // GRUPO 5: Navegação da página
  // ----------------------------------------------------------
  describe('Navegação do Header', () => {

    test('deve exibir todos os 4 links de navegação', () => {
      const links = screen.getAllByRole('link')
      expect(links).toHaveLength(4)
    })

    test('deve ter links para todas as seções da página', () => {
      expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /sobre/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /áreas/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /contato/i })).toBeInTheDocument()
    })

  })

})
