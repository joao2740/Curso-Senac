import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CardArea from '../CardArea';

describe('Componente CardArea', () => {
  it('deve renderizar o título passado via prop', () => {
    render(<CardArea titulo="Direito Civil" descricao="Descrição de teste" />);
    expect(screen.getByText('Direito Civil')).toBeInTheDocument();
  });

  it('deve renderizar a descrição passada via prop', () => {
    render(<CardArea titulo="Título" descricao="Atuação em contratos e indenizações." />);
    expect(screen.getByText('Atuação em contratos e indenizações.')).toBeInTheDocument();
  });

  it('deve renderizar o título em um elemento h3', () => {
    render(<CardArea titulo="Direito Trabalhista" descricao="Defesa de direitos trabalhistas." />);
    const heading = screen.getByRole('heading', { level: 3, name: /direito trabalhista/i });
    expect(heading).toBeInTheDocument();
  });

  it('deve possuir a classe CSS card-area no container', () => {
    const { container } = render(
      <CardArea titulo="Título" descricao="Descrição" />
    );
    expect(container.firstChild).toHaveClass('card-area');
  });

  it('deve renderizar título e descrição juntos corretamente', () => {
    render(
      <CardArea
        titulo="Direito Empresarial"
        descricao="Consultoria estratégica para empresas."
      />
    );
    expect(screen.getByText('Direito Empresarial')).toBeInTheDocument();
    expect(screen.getByText('Consultoria estratégica para empresas.')).toBeInTheDocument();
  });
});
