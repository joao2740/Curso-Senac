// src/tests/components/CardArea.test.jsx
import { render, screen } from '@testing-library/react'
import CardArea from '../../components/CardArea'

// ============================================================
// TESTES DO COMPONENTE: CardArea
// ============================================================
describe('Componente CardArea', () => {

  // ----------------------------------------------------------
  // GRUPO 1: Renderização básica
  // ----------------------------------------------------------
  describe('Renderização básica', () => {

    test('deve renderizar o card na tela', () => {
      render(<CardArea titulo="Desenvolvimento" descricao="Criamos aplicações." icone="💻" />)

      // getByRole('article') busca elemento <article>
      const card = screen.getByRole('article')
      expect(card).toBeInTheDocument()
    })

    test('deve exibir o título passado via props', () => {
      render(<CardArea titulo="Design UI/UX" descricao="Interfaces modernas." icone="🎨" />)

      expect(screen.getByText('Design UI/UX')).toBeInTheDocument()
    })

    test('deve exibir a descrição passada via props', () => {
      render(<CardArea titulo="Consultoria" descricao="Orientação especializada." icone="🧩" />)

      expect(screen.getByText('Orientação especializada.')).toBeInTheDocument()
    })

    test('deve exibir o ícone passado via props', () => {
      render(<CardArea titulo="DevOps" descricao="Infraestrutura moderna." icone="🚀" />)

      expect(screen.getByText('🚀')).toBeInTheDocument()
    })

  })

  // ----------------------------------------------------------
  // GRUPO 2: Valores padrão (props opcionais)
  // ----------------------------------------------------------
  describe('Valores padrão', () => {

    test('deve exibir valores padrão quando nenhuma prop for passada', () => {
      render(<CardArea />)

      expect(screen.getByText('Área')).toBeInTheDocument()
      expect(screen.getByText('Descrição da área.')).toBeInTheDocument()
      expect(screen.getByText('📌')).toBeInTheDocument()
    })

  })

  // ----------------------------------------------------------
  // GRUPO 3: Acessibilidade
  // ----------------------------------------------------------
  describe('Acessibilidade', () => {

    test('o card deve ter aria-label descritivo com o título', () => {
      render(<CardArea titulo="Desenvolvimento Web" descricao="Apps modernas." icone="💻" />)

      const card = screen.getByRole('article', { name: /Área: Desenvolvimento Web/i })
      expect(card).toBeInTheDocument()
    })

    test('o título deve ser um elemento h3', () => {
      render(<CardArea titulo="Minha Área" descricao="Descrição." icone="⚡" />)

      // getByRole('heading', level: 3) busca especificamente um <h3>
      const heading = screen.getByRole('heading', { level: 3, name: /minha área/i })
      expect(heading).toBeInTheDocument()
    })

  })

  // ----------------------------------------------------------
  // GRUPO 4: Múltiplos cards
  // ----------------------------------------------------------
  describe('Múltiplos cards', () => {

    test('deve renderizar corretamente quando há múltiplos cards na página', () => {
      render(
        <>
          <CardArea titulo="Web" descricao="Sites." icone="💻" />
          <CardArea titulo="Mobile" descricao="Apps." icone="📱" />
          <CardArea titulo="Cloud" descricao="Infraestrutura." icone="☁️" />
        </>
      )

      const cards = screen.getAllByRole('article')
      expect(cards).toHaveLength(3)

      expect(screen.getByText('Web')).toBeInTheDocument()
      expect(screen.getByText('Mobile')).toBeInTheDocument()
      expect(screen.getByText('Cloud')).toBeInTheDocument()
    })

  })

})
