// src/tests/components/Header.test.jsx
import { render, screen } from '@testing-library/react'
import Header from '../../components/Header'

// ============================================================
// TESTES DO COMPONENTE: Header
// ============================================================
describe('Componente Header', () => {

  // ----------------------------------------------------------
  // GRUPO 1: Renderização
  // ----------------------------------------------------------
  describe('Renderização', () => {

    test('deve renderizar o header na tela', () => {
      render(<Header />)

      // Busca por role semântico "banner" = elemento <header>
      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()
    })

    test('deve exibir o nome do site passado via prop siteName', () => {
      render(<Header siteName="MeuPortfólio" />)

      expect(screen.getByText('MeuPortfólio')).toBeInTheDocument()
    })

    test('deve exibir o nome padrão quando siteName não for fornecido', () => {
      render(<Header />)

      expect(screen.getByText('MeuSite')).toBeInTheDocument()
    })

  })

  // ----------------------------------------------------------
  // GRUPO 2: Navegação
  // ----------------------------------------------------------
  describe('Navegação', () => {

    test('deve renderizar o elemento de navegação', () => {
      render(<Header />)

      // Busca por role "navigation" = elemento <nav>
      const nav = screen.getByRole('navigation', { name: /navegação principal/i })
      expect(nav).toBeInTheDocument()
    })

    test('deve exibir o link "Home"', () => {
      render(<Header />)

      const linkHome = screen.getByRole('link', { name: /home/i })
      expect(linkHome).toBeInTheDocument()
    })

    test('deve exibir o link "Sobre"', () => {
      render(<Header />)

      const linkSobre = screen.getByRole('link', { name: /sobre/i })
      expect(linkSobre).toBeInTheDocument()
    })

    test('deve exibir o link "Áreas"', () => {
      render(<Header />)

      const linkAreas = screen.getByRole('link', { name: /áreas/i })
      expect(linkAreas).toBeInTheDocument()
    })

    test('deve exibir o link "Contato"', () => {
      render(<Header />)

      const linkContato = screen.getByRole('link', { name: /contato/i })
      expect(linkContato).toBeInTheDocument()
    })

    test('deve conter exatamente 4 links de navegação', () => {
      render(<Header />)

      // queryAllByRole retorna um array de todos os elementos encontrados
      const links = screen.queryAllByRole('link')
      expect(links).toHaveLength(4)
    })

    test('o link Home deve apontar para #home', () => {
      render(<Header />)

      const linkHome = screen.getByRole('link', { name: /home/i })
      expect(linkHome).toHaveAttribute('href', '#home')
    })

  })

})
