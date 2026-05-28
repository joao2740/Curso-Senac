// src/tests/sections/Sobre.test.jsx
import { render, screen } from '@testing-library/react'
import Sobre from '../../sections/Sobre'

// ============================================================
// TESTES DA SEÇÃO: Sobre
// ============================================================
describe('Seção Sobre', () => {

  // ----------------------------------------------------------
  // GRUPO 1: Renderização básica
  // ----------------------------------------------------------
  describe('Renderização básica', () => {

    test('deve renderizar a seção Sobre na tela', () => {
      render(<Sobre />)

      const secao = screen.getByRole('region', { name: /seção sobre/i })
      expect(secao).toBeInTheDocument()
    })

    test('deve exibir o título com o nome padrão', () => {
      render(<Sobre />)

      // O título é composto: "Sobre " + nome
      const titulo = screen.getByRole('heading', { name: /sobre nossa empresa/i })
      expect(titulo).toBeInTheDocument()
    })

    test('deve exibir a descrição padrão', () => {
      render(<Sobre />)

      expect(
        screen.getByText(/somos uma empresa inovadora focada em entregar soluções de alta qualidade/i)
      ).toBeInTheDocument()
    })

  })

  // ----------------------------------------------------------
  // GRUPO 2: Props customizadas
  // ----------------------------------------------------------
  describe('Props customizadas', () => {

    test('deve exibir o nome customizado no título', () => {
      render(<Sobre nome="ReactPro" descricao="Especialistas em React." />)

      expect(screen.getByRole('heading', { name: /sobre reactpro/i })).toBeInTheDocument()
    })

    test('deve exibir a descrição customizada', () => {
      render(<Sobre nome="Tech" descricao="Inovamos com tecnologia." />)

      expect(screen.getByText(/inovamos com tecnologia/i)).toBeInTheDocument()
    })

  })

  // ----------------------------------------------------------
  // GRUPO 3: Lista de destaques
  // ----------------------------------------------------------
  describe('Lista de destaques', () => {

    test('deve exibir os 3 destaques padrão', () => {
      render(<Sobre />)

      expect(screen.getByText(/experiência comprovada/i)).toBeInTheDocument()
      expect(screen.getByText(/equipe especializada/i)).toBeInTheDocument()
      expect(screen.getByText(/resultados garantidos/i)).toBeInTheDocument()
    })

    test('deve exibir destaques customizados passados via props', () => {
      const destaques = ['Teste automatizado', 'CI/CD configurado', 'Deploy contínuo']
      render(<Sobre destaques={destaques} />)

      expect(screen.getByText(/teste automatizado/i)).toBeInTheDocument()
      expect(screen.getByText(/ci\/cd configurado/i)).toBeInTheDocument()
      expect(screen.getByText(/deploy contínuo/i)).toBeInTheDocument()
    })

    test('deve renderizar a lista de destaques com aria-label', () => {
      render(<Sobre />)

      const lista = screen.getByRole('list', { name: /destaques/i })
      expect(lista).toBeInTheDocument()
    })

    test('deve ter a quantidade correta de itens na lista de destaques', () => {
      const destaques = ['Item 1', 'Item 2', 'Item 3', 'Item 4']
      render(<Sobre destaques={destaques} />)

      const itens = screen.getAllByRole('listitem')
      expect(itens).toHaveLength(4)
    })

  })

})
