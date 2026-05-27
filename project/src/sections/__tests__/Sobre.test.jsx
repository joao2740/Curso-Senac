import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Sobre from '../Sobre';

describe('Seção Sobre', () => {
  it('deve renderizar o título "Sobre o Escritório"', () => {
    render(<Sobre />);
    expect(
      screen.getByRole('heading', { name: /sobre o escritório/i })
    ).toBeInTheDocument();
  });

  it('deve renderizar o texto sobre excelência e compromisso', () => {
    render(<Sobre />);
    expect(
      screen.getByText(/oliveira & mendes advocacia atua com excelência/i)
    ).toBeInTheDocument();
  });

  it('deve renderizar o texto sobre ética e responsabilidade', () => {
    render(<Sobre />);
    expect(
      screen.getByText(/nossa atuação é pautada na ética/i)
    ).toBeInTheDocument();
  });

  it('deve renderizar o destaque "+10 anos"', () => {
    render(<Sobre />);
    expect(screen.getByText('+10 anos')).toBeInTheDocument();
  });

  it('deve renderizar a descrição do destaque de experiência', () => {
    render(<Sobre />);
    expect(screen.getByText(/de experiência jurídica/i)).toBeInTheDocument();
  });

  it('deve renderizar o destaque "Atendimento"', () => {
    render(<Sobre />);
    expect(screen.getByText('Atendimento')).toBeInTheDocument();
  });

  it('deve renderizar 2 boxes de destaque', () => {
    render(<Sobre />);
    const boxes = document.querySelectorAll('.box-destaque');
    expect(boxes).toHaveLength(2);
  });
});
