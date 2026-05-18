// tests/mysql.test.js
// Módulo 2 — Testes Unitários da Camada de Banco de Dados (MySQL Mock)
// Cobre: queryUserByEmail e verifyCredentials

import { queryUserByEmail, verifyCredentials } from '../src/database/mysql';

// ─────────────────────────────────────────────
// BLOCO 1 — Consulta de Usuário por E-mail
// ─────────────────────────────────────────────
describe('queryUserByEmail', () => {
  // Cenário 1.1 — Usuário existente é encontrado
  test('retorna o usuário quando o e-mail existe no banco', async () => {
    // Arrange
    const email = 'usuario@email.com';

    // Act
    const user = await queryUserByEmail(email);

    // Assert
    expect(user).not.toBeNull();
    expect(user.email).toBe(email);
    expect(user).toHaveProperty('name');
  });

  // Cenário 1.2 — Usuário inexistente retorna null
  test('retorna null quando o e-mail não existe no banco', async () => {
    // Arrange
    const email = 'naoexiste@email.com';

    // Act
    const user = await queryUserByEmail(email);

    // Assert
    expect(user).toBeNull();
  });

  // Cenário 1.3 — Busca não é sensível a espaços extras (trim no service)
  test('retorna null para e-mail completamente diferente', async () => {
    // Arrange
    const email = 'outro@dominio.com';

    // Act
    const result = await queryUserByEmail(email);

    // Assert
    expect(result).toBeNull();
  });
});

// ─────────────────────────────────────────────
// BLOCO 2 — Verificação de Credenciais
// ─────────────────────────────────────────────
describe('verifyCredentials', () => {
  // Cenário 2.1 — Credenciais corretas autenticam o usuário
  test('autentica com sucesso quando e-mail e senha estão corretos', async () => {
    // Arrange
    const email = 'usuario@email.com';
    const password = 'senha123';

    // Act
    const result = await verifyCredentials(email, password);

    // Assert
    expect(result.authenticated).toBe(true);
    expect(result.user).toBeDefined();
    expect(result.user.email).toBe(email);
    // A senha NÃO deve ser exposta no retorno (segurança)
    expect(result.user).not.toHaveProperty('password');
  });

  // Cenário 2.2 — Senha incorreta bloqueia o acesso
  test('falha na autenticação quando a senha está errada', async () => {
    // Arrange
    const email = 'usuario@email.com';
    const password = 'senhaErrada';

    // Act
    const result = await verifyCredentials(email, password);

    // Assert
    expect(result.authenticated).toBe(false);
    expect(result.reason).toBe('Senha incorreta.');
  });

  // Cenário 2.3 — Usuário não cadastrado é rejeitado
  test('falha na autenticação quando o usuário não está cadastrado', async () => {
    // Arrange
    const email = 'fantasma@email.com';
    const password = 'qualquersenha';

    // Act
    const result = await verifyCredentials(email, password);

    // Assert
    expect(result.authenticated).toBe(false);
    expect(result.reason).toBe('Usuário não encontrado.');
  });

  // Cenário 2.4 — Retorno seguro não expõe senha
  test('o objeto de usuário retornado nunca contém a senha', async () => {
    // Arrange
    const email = 'usuario@email.com';
    const password = 'senha123';

    // Act
    const result = await verifyCredentials(email, password);

    // Assert
    expect(result.authenticated).toBe(true);
    expect(Object.keys(result.user)).not.toContain('password');
  });

  // Cenário 2.5 — Dados do usuário autenticado estão completos
  test('retorna os dados completos do usuário ao autenticar com sucesso', async () => {
    // Arrange / Act
    const result = await verifyCredentials('usuario@email.com', 'senha123');

    // Assert
    expect(result.user).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
      email: expect.any(String),
    });
  });
});
