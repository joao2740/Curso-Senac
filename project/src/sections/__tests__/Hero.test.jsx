import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Hero from '../Hero';

describe('Seção Hero', () => {
  it('deve renderizar o título principal da seção', () => {
    render(<Hero />);
    expect(
      screen.getByText(/defesa jurídica estratégica com ética e excelência/i)
    ).toBeInTheDocument();
  });

  it('deve renderizar o parágrafo descritivo', () => {
    render(<Hero />);
    expect(
      screen.getByText(/atuamos com compromisso, responsabilidade/i)
    ).toBeInTheDocument();
  });

  it('deve renderizar o botão "Agendar Consulta"', () => {
    render(<Hero />);
    expect(
      screen.getByRole('button', { name: /agendar consulta/i })
    ).toBeInTheDocument();
  });

  it('o botão deve possuir a classe btn-primary', () => {
    render(<Hero />);
    const button = screen.getByRole('button', { name: /agendar consulta/i });
    expect(button).toHaveClass('btn-primary');
  });

  it('deve renderizar o título em um elemento h2', () => {
    render(<Hero />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
  });
});
