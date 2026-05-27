import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../../App';

describe('Aplicação App — Teste de Integração', () => {
  it('deve renderizar o componente Header com o nome do escritório', () => {
    render(<App />);
    expect(screen.getByText('Oliveira & Mendes Advocacia')).toBeInTheDocument();
  });

  it('deve renderizar o título da seção Hero', () => {
    render(<App />);
    expect(
      screen.getByText(/defesa jurídica estratégica com ética e excelência/i)
    ).toBeInTheDocument();
  });

  it('deve renderizar o botão de agendamento na seção Hero', () => {
    render(<App />);
    expect(
      screen.getByRole('button', { name: /agendar consulta/i })
    ).toBeInTheDocument();
  });

  it('deve renderizar a seção Áreas de Atuação completa', () => {
    render(<App />);
    // "Áreas de Atuação" aparece duas vezes: no nav e no h2 da seção.
    // Usamos getAllByText e verificamos que ao menos uma ocorrência existe.
    const areasTexts = screen.getAllByText('Áreas de Atuação');
    expect(areasTexts.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Direito Civil')).toBeInTheDocument();
    expect(screen.getByText('Direito Trabalhista')).toBeInTheDocument();
    expect(screen.getByText('Direito Empresarial')).toBeInTheDocument();
  });

  it('deve renderizar a seção Sobre com título correto', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: /sobre o escritório/i })
    ).toBeInTheDocument();
  });

  it('deve renderizar o destaque de "+10 anos" na seção Sobre', () => {
    render(<App />);
    expect(screen.getByText('+10 anos')).toBeInTheDocument();
  });

  it('deve renderizar os links de navegação do Header', () => {
    render(<App />);
    expect(screen.getByRole('link', { name: /início/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contato/i })).toBeInTheDocument();
  });

  it('deve renderizar 3 cards de áreas de atuação na aplicação completa', () => {
    render(<App />);
    const cards = document.querySelectorAll('.card-area');
    expect(cards).toHaveLength(3);
  });
});
