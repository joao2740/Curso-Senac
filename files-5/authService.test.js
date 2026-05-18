// tests/authService.test.js
// Módulo 1 — Testes Unitários do Serviço de Autenticação
// Cobre: validateEmail, validatePassword e authenticateUser

import { validateEmail, validatePassword, authenticateUser } from '../src/services/authService';

// ─────────────────────────────────────────────
// BLOCO 1 — Validação de E-mail
// ─────────────────────────────────────────────
describe('validateEmail', () => {
  // Cenário 1.1 — E-mail válido retorna true
  test('retorna true para e-mail com formato correto', () => {
    // Arrange
    const email = 'usuario@email.com';

    // Act
    const result = validateEmail(email);

    // Assert
    expect(result).toBe(true);
  });

  // Cenário 1.2 — E-mail sem @ retorna false
  test('retorna false para e-mail sem @', () => {
    // Arrange
    const email = 'usuarioemail.com';

    // Act
    const result = validateEmail(email);

    // Assert
    expect(result).toBe(false);
  });

  // Cenário 1.3 — E-mail vazio retorna false
  test('retorna false para e-mail vazio', () => {
    // Arrange
    const email = '';

    // Act
    const result = validateEmail(email);

    // Assert
    expect(result).toBe(false);
  });

  // Cenário 1.4 — E-mail nulo retorna false
  test('retorna false para e-mail nulo', () => {
    // Arrange / Act / Assert
    expect(validateEmail(null)).toBe(false);
  });

  // Cenário 1.5 — E-mail sem domínio retorna false
  test('retorna false para e-mail sem domínio', () => {
    expect(validateEmail('usuario@')).toBe(false);
  });
});

// ─────────────────────────────────────────────
// BLOCO 2 — Validação de Senha
// ─────────────────────────────────────────────
describe('validatePassword', () => {
  // Cenário 2.1 — Senha com 6+ caracteres é válida
  test('retorna true para senha com 6 ou mais caracteres', () => {
    // Arrange
    const password = 'senha123';

    // Act
    const result = validatePassword(password);

    // Assert
    expect(result).toBe(true);
  });

  // Cenário 2.2 — Senha com menos de 6 caracteres é inválida
  test('retorna false para senha com menos de 6 caracteres', () => {
    // Arrange
    const password = '123';

    // Act
    const result = validatePassword(password);

    // Assert
    expect(result).toBe(false);
  });

  // Cenário 2.3 — Senha vazia retorna false
  test('retorna false para senha vazia', () => {
    expect(validatePassword('')).toBe(false);
  });

  // Cenário 2.4 — Senha nula retorna false
  test('retorna false para senha nula', () => {
    expect(validatePassword(null)).toBe(false);
  });
});

// ─────────────────────────────────────────────
// BLOCO 3 — Autenticação com Mock de API
// ─────────────────────────────────────────────
describe('authenticateUser', () => {
  // Cenário 3.1 — Login com sucesso (mock retorna 200)
  test('retorna sucesso quando credenciais são válidas', async () => {
    // Arrange
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ user: { id: 1, name: 'Usuário Teste' } }),
    });

    // Act
    const result = await authenticateUser('usuario@email.com', 'senha123', mockFetch);

    // Assert
    expect(result.success).toBe(true);
    expect(result.user).toEqual({ id: 1, name: 'Usuário Teste' });
  });

  // Cenário 3.2 — Senha incorreta (mock retorna 401)
  test('retorna erro quando a senha está incorreta', async () => {
    // Arrange
    const mockFetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ message: 'Credenciais inválidas.' }),
    });

    // Act
    const result = await authenticateUser('usuario@email.com', 'senhaerrada', mockFetch);

    // Assert
    expect(result.success).toBe(false);
    expect(result.message).toBe('Credenciais inválidas.');
  });

  // Cenário 3.3 — E-mail inválido não faz requisição
  test('retorna erro imediato para e-mail com formato inválido', async () => {
    // Arrange
    const mockFetch = jest.fn();

    // Act
    const result = await authenticateUser('emailinvalido', 'senha123', mockFetch);

    // Assert
    expect(result.success).toBe(false);
    expect(result.message).toBe('E-mail inválido.');
    expect(mockFetch).not.toHaveBeenCalled(); // Nenhuma requisição deve ser feita
  });

  // Cenário 3.4 — Senha muito curta não faz requisição
  test('retorna erro imediato para senha com menos de 6 caracteres', async () => {
    // Arrange
    const mockFetch = jest.fn();

    // Act
    const result = await authenticateUser('usuario@email.com', '123', mockFetch);

    // Assert
    expect(result.success).toBe(false);
    expect(result.message).toBe('Senha deve ter pelo menos 6 caracteres.');
    expect(mockFetch).not.toHaveBeenCalled();
  });

  // Cenário 3.5 — Falha de rede retorna mensagem de erro de conexão
  test('retorna erro de conexão quando a requisição falha', async () => {
    // Arrange
    const mockFetch = jest.fn().mockRejectedValue(new Error('Network Error'));

    // Act
    const result = await authenticateUser('usuario@email.com', 'senha123', mockFetch);

    // Assert
    expect(result.success).toBe(false);
    expect(result.message).toBe('Erro de conexão com o servidor.');
  });
});
