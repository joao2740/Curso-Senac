import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Button from '../Button';

describe('Componente Button', () => {
  it('deve renderizar o botão na tela', () => {
    render(<Button text="Clique aqui" />);
    const button = screen.getByRole('button', { name: /clique aqui/i });
    expect(button).toBeInTheDocument();
  });

  it('deve exibir o texto passado via prop', () => {
    render(<Button text="Agendar Consulta" />);
    const button = screen.getByRole('button', { name: /agendar consulta/i });
    expect(button).toBeInTheDocument();
  });

  it('deve possuir a classe CSS correta', () => {
    render(<Button text="Teste" />);
    const button = screen.getByRole('button', { name: /teste/i });
    expect(button).toHaveClass('btn-primary');
  });

  it('deve renderizar com texto diferente sem conflito', () => {
    render(<Button text="Saiba Mais" />);
    expect(screen.getByRole('button', { name: /saiba mais/i })).toBeInTheDocument();
  });
});
