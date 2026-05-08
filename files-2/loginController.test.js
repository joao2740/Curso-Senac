/**
 * loginController.test.js
 * Testes Estruturais (de Integração) — POST /login
 *
 * Verifica todos os ramos condicionais do controlador,
 * garantindo cobertura de branches (branch coverage).
 *
 * Requer: jest + supertest
 */

const request = require("supertest");
const app = require("../src/app");

// ─────────────────────────────────────────────────────────────────────────────
// Testes Estruturais — Ramos do loginController
// ─────────────────────────────────────────────────────────────────────────────

describe("POST /login — Testes Estruturais", () => {
  // ── Ramo 1: falha de validação (400) ──────────────────────────────────────

  describe("Ramo 1 — Falha na validação de entrada (HTTP 400)", () => {
    test("CT01 — e-mail vazio deve retornar 400 com mensagem de erro", async () => {
      const res = await request(app)
        .post("/login")
        .send({ email: "", password: "Senha@123" });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("O e-mail é obrigatório.");
    });

    test("CT02 — e-mail com formato inválido deve retornar 400", async () => {
      const res = await request(app)
        .post("/login")
        .send({ email: "usuario-invalido", password: "Senha@123" });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("Formato de e-mail inválido.");
    });

    test("CT03 — senha vazia deve retornar 400", async () => {
      const res = await request(app)
        .post("/login")
        .send({ email: "usuario@dominio.com", password: "" });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("A senha é obrigatória.");
    });

    test("CT04 — senha abaixo do mínimo deve retornar 400", async () => {
      const res = await request(app)
        .post("/login")
        .send({ email: "usuario@dominio.com", password: "123" });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain("mínimo");
    });
  });

  // ── Ramo 2: credenciais inválidas (401) ───────────────────────────────────

  describe("Ramo 2 — Credenciais não encontradas (HTTP 401)", () => {
    test("deve retornar 401 para usuário inexistente com senha válida", async () => {
      const res = await request(app)
        .post("/login")
        .send({ email: "naoexiste@dominio.com", password: "Senha@123" });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("Credenciais inválidas.");
    });

    test("deve retornar 401 para usuário correto com senha errada", async () => {
      const res = await request(app)
        .post("/login")
        .send({ email: "usuario@dominio.com", password: "SenhaErrada!" });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });

  // ── Ramo 3: login bem-sucedido (200) ──────────────────────────────────────

  describe("Ramo 3 — Login válido (HTTP 200)", () => {
    test("CT05 — deve retornar 200 e token para credenciais corretas", async () => {
      const res = await request(app)
        .post("/login")
        .send({ email: "usuario@dominio.com", password: "Senha@123" });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe("Login realizado com sucesso.");
      expect(res.body.token).toBeDefined();
      expect(typeof res.body.token).toBe("string");
    });

    test("deve retornar 200 para o segundo usuário cadastrado", async () => {
      const res = await request(app)
        .post("/login")
        .send({ email: "admin@empresa.com", password: "Admin#456" });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Health check
// ─────────────────────────────────────────────────────────────────────────────

describe("GET /health", () => {
  test("deve retornar status ok", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });
});
