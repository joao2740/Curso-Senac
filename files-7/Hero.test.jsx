// src/tests/sections/Hero.test.jsx
import { render, screen } from '@testing-library/react'
import Hero from '../../sections/Hero'

// ============================================================
// TESTES DA SEÇÃO: Hero
// ============================================================
describe('Seção Hero', () => {

  // ----------------------------------------------------------
  // GRUPO 1: Renderização básica
  // ----------------------------------------------------------
  describe('Renderização básica', () => {

    test('deve renderizar a seção hero na tela', () => {
      render(<Hero />)

      const secao = screen.getByRole('region', { name: /seção hero/i })
      expect(secao).toBeInTheDocument()
    })

    test('deve exibir o título principal (h1) com o texto padrão', () => {
      render(<Hero />)

      const h1 = screen.getByRole('heading', { level: 1, name: /bem-vindo ao nosso site/i })
      expect(h1).toBeInTheDocument()
    })

    test('deve exibir o subtítulo padrão', () => {
      render(<Hero />)

      expect(screen.getByText(/soluções modernas para o seu negócio/i)).toBeInTheDocument()
    })

  })

  // ----------------------------------------------------------
  // GRUPO 2: Props customizadas
  // ----------------------------------------------------------
  describe('Props customizadas', () => {

    test('deve exibir o título passado via prop', () => {
      render(<Hero titulo="Olá, Mundo!" subtitulo="Texto de apoio." />)

      expect(screen.getByRole('heading', { level: 1, name: /olá, mundo!/i })).toBeInTheDocument()
    })

    test('deve exibir o subtítulo passado via prop', () => {
      render(<Hero titulo="Título" subtitulo="Subtítulo customizado." />)

      expect(screen.getByText(/subtítulo customizado/i)).toBeInTheDocument()
    })

  })

  // ----------------------------------------------------------
  // GRUPO 3: Botões de ação
  // ----------------------------------------------------------
  describe('Botões de ação', () => {

    test('deve exibir o botão "Saiba Mais"', () => {
      render(<Hero />)

      const botao = screen.getByRole('button', { name: /saiba mais/i })
      expect(botao).toBeInTheDocument()
    })

    test('deve exibir o botão "Entre em Contato"', () => {
      render(<Hero />)

      const botao = screen.getByRole('button', { name: /entre em contato/i })
      expect(botao).toBeInTheDocument()
    })

    test('deve exibir exatamente 2 botões na seção Hero', () => {
      render(<Hero />)

      const botoes = screen.getAllByRole('button')
      expect(botoes).toHaveLength(2)
    })

  })

})
