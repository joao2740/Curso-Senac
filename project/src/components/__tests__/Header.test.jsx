import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from '../Header';

describe('Componente Header', () => {
  it('deve renderizar o nome do escritório como logo', () => {
    render(<Header />);
    expect(screen.getByText('Oliveira & Mendes Advocacia')).toBeInTheDocument();
  });

  it('deve renderizar o link de navegação "Início"', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: /início/i })).toBeInTheDocument();
  });

  it('deve renderizar o link de navegação "Áreas de Atuação"', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: /áreas de atuação/i })).toBeInTheDocument();
  });

  it('deve renderizar o link de navegação "Sobre"', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: /sobre/i })).toBeInTheDocument();
  });

  it('deve renderizar o link de navegação "Contato"', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: /contato/i })).toBeInTheDocument();
  });

  it('deve renderizar 4 links de navegação no total', () => {
    render(<Header />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(4);
  });

  it('deve renderizar um elemento header semântico', () => {
    render(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});
