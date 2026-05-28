// src/tests/sections/Areas.test.jsx
import { render, screen } from '@testing-library/react'
import Areas from '../../sections/Areas'

// ============================================================
// TESTES DA SEÇÃO: Areas
// ============================================================
describe('Seção Areas', () => {

  // ----------------------------------------------------------
  // GRUPO 1: Renderização da seção
  // ----------------------------------------------------------
  describe('Renderização da seção', () => {

    test('deve renderizar a seção de áreas na tela', () => {
      render(<Areas />)

      // Busca pelo aria-label atribuído à section
      const secao = screen.getByRole('region', { name: /seção de áreas de atuação/i })
      expect(secao).toBeInTheDocument()
    })

    test('deve exibir o título principal da seção', () => {
      render(<Areas />)

      const titulo = screen.getByRole('heading', { name: /nossas áreas de atuação/i })
      expect(titulo).toBeInTheDocument()
    })

    test('deve exibir o subtítulo da seção', () => {
      render(<Areas />)

      expect(screen.getByText(/conheça os serviços que oferecemos/i)).toBeInTheDocument()
    })

  })

  // ----------------------------------------------------------
  // GRUPO 2: Cards de áreas padrão
  // ----------------------------------------------------------
  describe('Cards de áreas padrão', () => {

    test('deve renderizar 3 cards com as áreas padrão', () => {
      render(<Areas />)

      const cards = screen.getAllByRole('article')
      expect(cards).toHaveLength(3)
    })

    test('deve exibir o card de Desenvolvimento Web', () => {
      render(<Areas />)

      expect(screen.getByText('Desenvolvimento Web')).toBeInTheDocument()
    })

    test('deve exibir o card de Design UI/UX', () => {
      render(<Areas />)

      expect(screen.getByText('Design UI/UX')).toBeInTheDocument()
    })

    test('deve exibir o card de Consultoria Técnica', () => {
      render(<Areas />)

      expect(screen.getByText('Consultoria Técnica')).toBeInTheDocument()
    })

  })

  // ----------------------------------------------------------
  // GRUPO 3: Props customizadas
  // ----------------------------------------------------------
  describe('Com props customizadas', () => {

    const areasCustomizadas = [
      { id: 1, titulo: 'React Native', descricao: 'Apps mobile.', icone: '📱' },
      { id: 2, titulo: 'Node.js',      descricao: 'Backend robusto.', icone: '🟢' },
    ]

    test('deve renderizar apenas os cards das áreas fornecidas', () => {
      render(<Areas areas={areasCustomizadas} />)

      const cards = screen.getAllByRole('article')
      expect(cards).toHaveLength(2)
    })

    test('deve exibir os títulos das áreas customizadas', () => {
      render(<Areas areas={areasCustomizadas} />)

      expect(screen.getByText('React Native')).toBeInTheDocument()
      expect(screen.getByText('Node.js')).toBeInTheDocument()
    })

    test('NÃO deve exibir as áreas padrão quando props customizadas são fornecidas', () => {
      render(<Areas areas={areasCustomizadas} />)

      // queryByText retorna null se não encontrar (sem lançar erro)
      expect(screen.queryByText('Desenvolvimento Web')).not.toBeInTheDocument()
    })

  })

  // ----------------------------------------------------------
  // GRUPO 4: Lista acessível
  // ----------------------------------------------------------
  describe('Acessibilidade', () => {

    test('deve ter uma lista de áreas com role="list"', () => {
      render(<Areas />)

      const lista = screen.getByRole('list')
      expect(lista).toBeInTheDocument()
    })

    test('deve ter itens de lista (listitem) para cada área', () => {
      render(<Areas />)

      const itens = screen.getAllByRole('listitem')
      expect(itens).toHaveLength(3)
    })

  })

})
