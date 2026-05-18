// tests/LoginForm.test.js
// Módulo 3 — Testes Estruturais do Componente LoginForm
// Cobre: renderização, interação do usuário, estados e validações visuais

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginForm from '../src/components/LoginForm';

// Mock do serviço de autenticação para isolar o componente
jest.mock('../src/services/authService', () => ({
  validateEmail: jest.fn((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)),
  validatePassword: jest.fn((pass) => typeof pass === 'string' && pass.length >= 6),
  authenticateUser: jest.fn(),
}));

import { authenticateUser } from '../src/services/authService';

// ─────────────────────────────────────────────
// BLOCO 1 — Renderização dos Elementos
// ─────────────────────────────────────────────
describe('LoginForm — Renderização da Interface', () => {
  // Cenário 1.1 — Todos os elementos essenciais estão presentes
  test('renderiza o título, campos de entrada e botão de login', () => {
    // Arrange
    const onLoginSuccess = jest.fn();

    // Act
    const { getByTestId, getByText } = render(<LoginForm onLoginSuccess={onLoginSuccess} />);

    // Assert
    expect(getByText('Entrar')).toBeTruthy();           // Título
    expect(getByTestId('input-email')).toBeTruthy();    // Campo e-mail
    expect(getByTestId('input-password')).toBeTruthy(); // Campo senha
    expect(getByTestId('btn-login')).toBeTruthy();      // Botão de login
  });

  // Cenário 1.2 — Mensagem de erro NÃO aparece no estado inicial
  test('não exibe mensagem de erro ao renderizar pela primeira vez', () => {
    // Arrange / Act
    const { queryByTestId } = render(<LoginForm onLoginSuccess={jest.fn()} />);

    // Assert
    expect(queryByTestId('error-message')).toBeNull();
  });

  // Cenário 1.3 — Indicador de loading NÃO aparece no estado inicial
  test('não exibe loading indicator no carregamento inicial', () => {
    // Arrange / Act
    const { queryByTestId } = render(<LoginForm onLoginSuccess={jest.fn()} />);

    // Assert
    expect(queryByTestId('loading-indicator')).toBeNull();
  });
});

// ─────────────────────────────────────────────
// BLOCO 2 — Interação e Validação de Entradas
// ─────────────────────────────────────────────
describe('LoginForm — Interação e Validação de Campos', () => {
  // Cenário 2.1 — Submeter sem e-mail exibe erro de campo obrigatório
  test('exibe erro "e-mail é obrigatório" ao tentar login com e-mail vazio', () => {
    // Arrange
    const { getByTestId } = render(<LoginForm onLoginSuccess={jest.fn()} />);

    // Act — submete sem preencher nada
    fireEvent.press(getByTestId('btn-login'));

    // Assert
    expect(getByTestId('error-message').props.children).toBe('O e-mail é obrigatório.');
  });

  // Cenário 2.2 — E-mail com formato inválido exibe erro específico
  test('exibe erro de formato inválido para e-mail sem @', () => {
    // Arrange
    const { getByTestId } = render(<LoginForm onLoginSuccess={jest.fn()} />);

    // Act
    fireEvent.changeText(getByTestId('input-email'), 'emailinvalido');
    fireEvent.press(getByTestId('btn-login'));

    // Assert
    expect(getByTestId('error-message').props.children).toBe('Formato de e-mail inválido.');
  });

  // Cenário 2.3 — Senha curta exibe mensagem de validação
  test('exibe erro de senha curta quando senha tem menos de 6 caracteres', () => {
    // Arrange
    const { getByTestId } = render(<LoginForm onLoginSuccess={jest.fn()} />);

    // Act
    fireEvent.changeText(getByTestId('input-email'), 'usuario@email.com');
    fireEvent.changeText(getByTestId('input-password'), '123');
    fireEvent.press(getByTestId('btn-login'));

    // Assert
    expect(getByTestId('error-message').props.children).toBe(
      'A senha deve ter pelo menos 6 caracteres.'
    );
  });

  // Cenário 2.4 — Campos aceitam texto digitado pelo usuário
  test('atualiza o valor do campo e-mail ao digitar', () => {
    // Arrange
    const { getByTestId } = render(<LoginForm onLoginSuccess={jest.fn()} />);

    // Act
    fireEvent.changeText(getByTestId('input-email'), 'novo@email.com');

    // Assert
    expect(getByTestId('input-email').props.value).toBe('novo@email.com');
  });
});

// ─────────────────────────────────────────────
// BLOCO 3 — Estados: Loading, Sucesso e Erro de API
// ─────────────────────────────────────────────
describe('LoginForm — Estados da Aplicação', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Cenário 3.1 — Login com sucesso chama callback onLoginSuccess
  test('chama onLoginSuccess com dados do usuário após autenticação válida', async () => {
    // Arrange
    const mockUser = { id: 1, name: 'Usuário Teste' };
    authenticateUser.mockResolvedValueOnce({ success: true, user: mockUser });
    const onLoginSuccess = jest.fn();

    const { getByTestId } = render(<LoginForm onLoginSuccess={onLoginSuccess} />);

    // Act
    fireEvent.changeText(getByTestId('input-email'), 'usuario@email.com');
    fireEvent.changeText(getByTestId('input-password'), 'senha123');
    fireEvent.press(getByTestId('btn-login'));

    // Assert
    await waitFor(() => {
      expect(onLoginSuccess).toHaveBeenCalledWith(mockUser);
    });
  });

  // Cenário 3.2 — Erro de API é exibido na tela
  test('exibe mensagem de erro da API quando autenticação falha', async () => {
    // Arrange
    authenticateUser.mockResolvedValueOnce({
      success: false,
      message: 'Credenciais inválidas.',
    });

    const { getByTestId } = render(<LoginForm onLoginSuccess={jest.fn()} />);

    // Act
    fireEvent.changeText(getByTestId('input-email'), 'usuario@email.com');
    fireEvent.changeText(getByTestId('input-password'), 'senhaErrada');
    fireEvent.press(getByTestId('btn-login'));

    // Assert
    await waitFor(() => {
      expect(getByTestId('error-message').props.children).toBe('Credenciais inválidas.');
    });
  });

  // Cenário 3.3 — Indicador de loading aparece durante a requisição
  test('exibe loading indicator enquanto a autenticação está em progresso', async () => {
    // Arrange — promessa que nunca resolve (simula loading)
    authenticateUser.mockImplementationOnce(() => new Promise(() => {}));

    const { getByTestId } = render(<LoginForm onLoginSuccess={jest.fn()} />);

    // Act
    fireEvent.changeText(getByTestId('input-email'), 'usuario@email.com');
    fireEvent.changeText(getByTestId('input-password'), 'senha123');
    fireEvent.press(getByTestId('btn-login'));

    // Assert
    await waitFor(() => {
      expect(getByTestId('loading-indicator')).toBeTruthy();
    });
  });

  // Cenário 3.4 — Botão de login desaparece durante o loading
  test('oculta o botão de login enquanto está carregando', async () => {
    // Arrange
    authenticateUser.mockImplementationOnce(() => new Promise(() => {}));

    const { getByTestId, queryByTestId } = render(<LoginForm onLoginSuccess={jest.fn()} />);

    // Act
    fireEvent.changeText(getByTestId('input-email'), 'usuario@email.com');
    fireEvent.changeText(getByTestId('input-password'), 'senha123');
    fireEvent.press(getByTestId('btn-login'));

    // Assert
    await waitFor(() => {
      expect(queryByTestId('btn-login')).toBeNull();
      expect(getByTestId('loading-indicator')).toBeTruthy();
    });
  });
});
