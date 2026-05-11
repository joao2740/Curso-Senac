/**
 * ============================================================
 * Testes Unitários — Módulo de Autenticação (auth.js)
 * Ferramenta: Jest
 * Padrão utilizado: AAA (Arrange → Act → Assert)
 * ============================================================
 *
 * CENÁRIOS COBERTOS:
 *  1. Sucesso na Autenticação
 *  2. Tratamento de Erro (senha incorreta)
 *  3. Validação de Campo (e-mail vazio ou inválido)
 */

const { validarEmail, realizarLogin } = require("../src/services/auth");

// ============================================================
// CENÁRIO 1 — Sucesso na Autenticação
// ============================================================
describe("Cenário 1: Sucesso na Autenticação", () => {
  test("deve retornar um token válido quando as credenciais estão corretas", () => {
    // ARRANGE — prepara os dados e o mock do banco de dados
    const emailValido = "admin@loja.com";
    const senhaValida = "senha123";
    const usuarioMock = { id: 1, email: emailValido, senha: senhaValida, nome: "Administrador" };
    const buscarUsuarioMock = jest.fn().mockReturnValue(usuarioMock);

    // ACT — executa a função que queremos testar
    const resultado = realizarLogin(emailValido, senhaValida, buscarUsuarioMock);

    // ASSERT — verifica se o resultado é o esperado
    expect(resultado.sucesso).toBe(true);
    expect(resultado.token).toBeDefined();
    expect(typeof resultado.token).toBe("string");
    expect(resultado.token.length).toBeGreaterThan(0);
    expect(resultado.usuario.email).toBe(emailValido);
    expect(resultado.usuario.nome).toBe("Administrador");
  });

  test("deve incluir os dados do usuário (sem a senha) no retorno de sucesso", () => {
    // ARRANGE
    const emailValido = "cliente@email.com";
    const senhaValida = "minha_senha";
    const usuarioMock = { id: 2, email: emailValido, senha: senhaValida, nome: "Cliente Exemplo" };
    const buscarUsuarioMock = jest.fn().mockReturnValue(usuarioMock);

    // ACT
    const resultado = realizarLogin(emailValido, senhaValida, buscarUsuarioMock);

    // ASSERT
    expect(resultado.sucesso).toBe(true);
    expect(resultado.usuario).toBeDefined();
    expect(resultado.usuario.id).toBe(2);
    expect(resultado.usuario.senha).toBeUndefined(); // senha NÃO deve ser exposta
  });
});

// ============================================================
// CENÁRIO 2 — Tratamento de Erro
// ============================================================
describe("Cenário 2: Tratamento de Erro", () => {
  test("deve retornar erro ao inserir uma senha incorreta", () => {
    // ARRANGE — usuário existe, mas a senha está errada
    const email = "admin@loja.com";
    const senhaErrada = "senha_errada_456";
    const usuarioMock = { id: 1, email, senha: "senha123", nome: "Administrador" };
    const buscarUsuarioMock = jest.fn().mockReturnValue(usuarioMock);

    // ACT
    const resultado = realizarLogin(email, senhaErrada, buscarUsuarioMock);

    // ASSERT
    expect(resultado.sucesso).toBe(false);
    expect(resultado.token).toBeUndefined();
    expect(resultado.erro).toBe("E-mail ou senha incorretos.");
  });

  test("deve retornar erro quando o e-mail não está cadastrado no sistema", () => {
    // ARRANGE — simula banco que não encontra o usuário
    const emailNaoCadastrado = "fantasma@email.com";
    const buscarUsuarioMock = jest.fn().mockReturnValue(undefined);

    // ACT
    const resultado = realizarLogin(emailNaoCadastrado, "qualquer_senha", buscarUsuarioMock);

    // ASSERT
    expect(resultado.sucesso).toBe(false);
    expect(resultado.erro).toBe("E-mail ou senha incorretos.");
  });
});

// ============================================================
// CENÁRIO 3 — Validação de Campo
// ============================================================
describe("Cenário 3: Validação de Campo", () => {
  test("não deve disparar o login quando o e-mail está vazio", () => {
    // ARRANGE
    const emailVazio = "";
    const buscarUsuarioMock = jest.fn();

    // ACT
    const resultado = realizarLogin(emailVazio, "senha123", buscarUsuarioMock);

    // ASSERT
    expect(resultado.sucesso).toBe(false);
    expect(resultado.erro).toBe("O campo de e-mail é obrigatório.");
    expect(buscarUsuarioMock).not.toHaveBeenCalled(); // banco não deve ser consultado
  });

  test("não deve disparar o login quando o e-mail está em formato inválido", () => {
    // ARRANGE
    const emailInvalido = "email-sem-arroba.com";
    const buscarUsuarioMock = jest.fn();

    // ACT
    const resultado = realizarLogin(emailInvalido, "senha123", buscarUsuarioMock);

    // ASSERT
    expect(resultado.sucesso).toBe(false);
    expect(resultado.erro).toBe("Formato de e-mail inválido.");
    expect(buscarUsuarioMock).not.toHaveBeenCalled();
  });

  test("não deve disparar o login quando a senha está vazia", () => {
    // ARRANGE
    const emailValido = "usuario@email.com";
    const senhaVazia = "";
    const buscarUsuarioMock = jest.fn();

    // ACT
    const resultado = realizarLogin(emailValido, senhaVazia, buscarUsuarioMock);

    // ASSERT
    expect(resultado.sucesso).toBe(false);
    expect(resultado.erro).toBe("O campo de senha é obrigatório.");
    expect(buscarUsuarioMock).not.toHaveBeenCalled();
  });

  // Testes adicionais para a função validarEmail()
  describe("validarEmail() — casos de borda", () => {
    test("deve aceitar e-mails no formato correto", () => {
      expect(validarEmail("usuario@dominio.com")).toBe(true);
      expect(validarEmail("nome.sobrenome@empresa.com.br")).toBe(true);
    });

    test("deve rejeitar formatos inválidos de e-mail", () => {
      expect(validarEmail("semArroba.com")).toBe(false);
      expect(validarEmail("@semUsuario.com")).toBe(false);
      expect(validarEmail("sem@dominio")).toBe(false);
      expect(validarEmail("")).toBe(false);
      expect(validarEmail(null)).toBe(false);
    });
  });
});
