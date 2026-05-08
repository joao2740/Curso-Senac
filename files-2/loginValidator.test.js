/**
 * loginValidator.test.js
 * Testes Unitários — validateLogin()
 *
 * Cobertura:
 *   CT01  E-mail não informado
 *   CT02  Formato de e-mail inválido
 *   CT03  Senha vazia
 *   CT04  Senha abaixo do tamanho mínimo
 *   CT05  Login válido (cenário positivo)
 */

const { validateLogin, MIN_PASSWORD_LENGTH } = require("../src/loginValidator");

// ─────────────────────────────────────────────────────────────────────────────
// Grupo 1 — Validação do E-mail
// ─────────────────────────────────────────────────────────────────────────────

describe("CT01 — E-mail não informado", () => {
  test("deve retornar erro quando e-mail é string vazia", () => {
    const result = validateLogin("", "Senha@123");
    expect(result.valid).toBe(false);
    expect(result.error).toBe("O e-mail é obrigatório.");
  });

  test("deve retornar erro quando e-mail é null", () => {
    const result = validateLogin(null, "Senha@123");
    expect(result.valid).toBe(false);
    expect(result.error).toBe("O e-mail é obrigatório.");
  });

  test("deve retornar erro quando e-mail é undefined", () => {
    const result = validateLogin(undefined, "Senha@123");
    expect(result.valid).toBe(false);
    expect(result.error).toBe("O e-mail é obrigatório.");
  });

  test("deve retornar erro quando e-mail contém apenas espaços", () => {
    const result = validateLogin("   ", "Senha@123");
    expect(result.valid).toBe(false);
    expect(result.error).toBe("O e-mail é obrigatório.");
  });
});

describe("CT02 — Formato de e-mail inválido", () => {
  const invalidEmails = [
    "usuario-semdominio",
    "usuario@",
    "@dominio.com",
    "usuario@dominio",
    "usuariodominio.com",
    "usuario @dominio.com",
  ];

  invalidEmails.forEach((email) => {
    test(`deve retornar erro para e-mail inválido: "${email}"`, () => {
      const result = validateLogin(email, "Senha@123");
      expect(result.valid).toBe(false);
      expect(result.error).toBe("Formato de e-mail inválido.");
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Grupo 2 — Validação da Senha
// ─────────────────────────────────────────────────────────────────────────────

describe("CT03 — Senha vazia", () => {
  test("deve retornar erro quando senha é string vazia", () => {
    const result = validateLogin("usuario@dominio.com", "");
    expect(result.valid).toBe(false);
    expect(result.error).toBe("A senha é obrigatória.");
  });

  test("deve retornar erro quando senha é null", () => {
    const result = validateLogin("usuario@dominio.com", null);
    expect(result.valid).toBe(false);
    expect(result.error).toBe("A senha é obrigatória.");
  });

  test("deve retornar erro quando senha contém apenas espaços", () => {
    const result = validateLogin("usuario@dominio.com", "   ");
    expect(result.valid).toBe(false);
    expect(result.error).toBe("A senha é obrigatória.");
  });
});

describe("CT04 — Senha abaixo do tamanho mínimo", () => {
  test(`deve retornar erro para senha com menos de ${MIN_PASSWORD_LENGTH} caracteres`, () => {
    const result = validateLogin("usuario@dominio.com", "123");
    expect(result.valid).toBe(false);
    expect(result.error).toBe(
      `A senha deve ter no mínimo ${MIN_PASSWORD_LENGTH} caracteres.`
    );
  });

  test("deve retornar erro para senha com exatamente 1 caractere", () => {
    const result = validateLogin("usuario@dominio.com", "a");
    expect(result.valid).toBe(false);
    expect(result.error).toContain("mínimo");
  });

  test(`deve aceitar senha com exatamente ${MIN_PASSWORD_LENGTH} caracteres (limite mínimo exato)`, () => {
    const senhaLimite = "A".repeat(MIN_PASSWORD_LENGTH);
    const result = validateLogin("usuario@dominio.com", senhaLimite);
    expect(result.valid).toBe(true);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Grupo 3 — Cenário Positivo
// ─────────────────────────────────────────────────────────────────────────────

describe("CT05 — Login válido", () => {
  test("deve retornar válido para e-mail e senha corretos", () => {
    const result = validateLogin("usuario@dominio.com", "Senha@123");
    expect(result.valid).toBe(true);
    expect(result.error).toBeNull();
  });

  test("deve aceitar diferentes formatos de e-mail válidos", () => {
    const validEmails = [
      "user@example.com",
      "user.name+tag@sub.domain.org",
      "admin@empresa.com.br",
    ];
    validEmails.forEach((email) => {
      const result = validateLogin(email, "Senha@123");
      expect(result.valid).toBe(true);
    });
  });
});
