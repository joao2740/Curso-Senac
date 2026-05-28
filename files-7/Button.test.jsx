// src/tests/components/Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import Button from '../../components/Button'

// ============================================================
// TESTES DO COMPONENTE: Button
// ============================================================
describe('Componente Button', () => {

  // ----------------------------------------------------------
  // GRUPO 1: Renderização básica
  // ----------------------------------------------------------
  describe('Renderização básica', () => {

    test('deve renderizar o botão na tela', () => {
      render(<Button label="Clique aqui" />)

      // getByRole('button') busca um elemento com papel semântico de botão
      const botao = screen.getByRole('button')
      expect(botao).toBeInTheDocument()
    })

    test('deve exibir o texto correto passado via prop label', () => {
      render(<Button label="Saiba Mais" />)

      const botao = screen.getByRole('button', { name: /saiba mais/i })
      expect(botao).toBeInTheDocument()
    })

    test('deve exibir texto padrão quando label não for fornecido', () => {
      render(<Button />)

      const botao = screen.getByRole('button', { name: /clique aqui/i })
      expect(botao).toBeInTheDocument()
    })

  })

  // ----------------------------------------------------------
  // GRUPO 2: Props e variantes
  // ----------------------------------------------------------
  describe('Props e variantes', () => {

    test('deve aplicar a classe CSS correta para variante primary', () => {
      render(<Button label="Primary" variant="primary" />)

      const botao = screen.getByRole('button', { name: /primary/i })
      expect(botao).toHaveClass('btn--primary')
    })

    test('deve aplicar a classe CSS correta para variante secondary', () => {
      render(<Button label="Secondary" variant="secondary" />)

      const botao = screen.getByRole('button', { name: /secondary/i })
      expect(botao).toHaveClass('btn--secondary')
    })

    test('deve aplicar a classe CSS correta para variante outline', () => {
      render(<Button label="Outline" variant="outline" />)

      const botao = screen.getByRole('button', { name: /outline/i })
      expect(botao).toHaveClass('btn--outline')
    })

  })

  // ----------------------------------------------------------
  // GRUPO 3: Estado disabled
  // ----------------------------------------------------------
  describe('Estado desabilitado', () => {

    test('deve estar desabilitado quando a prop disabled for true', () => {
      render(<Button label="Desabilitado" disabled={true} />)

      const botao = screen.getByRole('button', { name: /desabilitado/i })
      expect(botao).toBeDisabled()
    })

    test('deve estar habilitado por padrão (disabled=false)', () => {
      render(<Button label="Habilitado" />)

      const botao = screen.getByRole('button', { name: /habilitado/i })
      expect(botao).not.toBeDisabled()
    })

  })

  // ----------------------------------------------------------
  // GRUPO 4: Interação — clique
  // ----------------------------------------------------------
  describe('Interação com clique', () => {

    test('deve chamar a função onClick ao ser clicado', () => {
      // vi.fn() cria uma função "espiã" que registra chamadas
      const handleClick = vi.fn()
      render(<Button label="Clicar" onClick={handleClick} />)

      const botao = screen.getByRole('button', { name: /clicar/i })
      fireEvent.click(botao)

      // Verifica se a função foi chamada exatamente 1 vez
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    test('NÃO deve chamar onClick quando o botão está desabilitado', () => {
      const handleClick = vi.fn()
      render(<Button label="Desabilitado" disabled={true} onClick={handleClick} />)

      const botao = screen.getByRole('button', { name: /desabilitado/i })
      fireEvent.click(botao)

      // Botão desabilitado não deve disparar o evento
      expect(handleClick).not.toHaveBeenCalled()
    })

    test('deve chamar onClick múltiplas vezes quando clicado várias vezes', () => {
      const handleClick = vi.fn()
      render(<Button label="Multi" onClick={handleClick} />)

      const botao = screen.getByRole('button', { name: /multi/i })
      fireEvent.click(botao)
      fireEvent.click(botao)
      fireEvent.click(botao)

      expect(handleClick).toHaveBeenCalledTimes(3)
    })

  })

})
