import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Areas from '../Areas';

describe('Seção Areas', () => {
  it('deve renderizar o título da seção "Áreas de Atuação"', () => {
    render(<Areas />);
    expect(screen.getByText('Áreas de Atuação')).toBeInTheDocument();
  });

  it('deve renderizar a área "Direito Civil"', () => {
    render(<Areas />);
    expect(screen.getByText('Direito Civil')).toBeInTheDocument();
  });

  it('deve renderizar a área "Direito Trabalhista"', () => {
    render(<Areas />);
    expect(screen.getByText('Direito Trabalhista')).toBeInTheDocument();
  });

  it('deve renderizar a área "Direito Empresarial"', () => {
    render(<Areas />);
    expect(screen.getByText('Direito Empresarial')).toBeInTheDocument();
  });

  it('deve renderizar 3 cards de áreas de atuação', () => {
    render(<Areas />);
    const cards = document.querySelectorAll('.card-area');
    expect(cards).toHaveLength(3);
  });

  it('deve renderizar a descrição de Direito Civil', () => {
    render(<Areas />);
    expect(
      screen.getByText(/atuação em contratos, indenizações/i)
    ).toBeInTheDocument();
  });

  it('deve renderizar a descrição de Direito Trabalhista', () => {
    render(<Areas />);
    expect(
      screen.getByText(/defesa de direitos trabalhistas/i)
    ).toBeInTheDocument();
  });

  it('deve renderizar a descrição de Direito Empresarial', () => {
    render(<Areas />);
    expect(
      screen.getByText(/consultoria estratégica para empresas/i)
    ).toBeInTheDocument();
  });
});
