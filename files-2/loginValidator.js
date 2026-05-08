/**
 * loginValidator.js
 * Módulo de validação de dados de login — Secure Login API
 */

const MIN_PASSWORD_LENGTH = 6;

/**
 * Valida os dados de entrada do formulário de login.
 * @param {string} email
 * @param {string} password
 * @returns {{ valid: boolean, error: string|null }}
 */
function validateLogin(email, password) {
  // CT01 — E-mail não informado
  if (!email || email.trim() === "") {
    return { valid: false, error: "O e-mail é obrigatório." };
  }

  // CT02 — Formato de e-mail inválido
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: "Formato de e-mail inválido." };
  }

  // CT03 — Senha vazia
  if (!password || password.trim() === "") {
    return { valid: false, error: "A senha é obrigatória." };
  }

  // CT04 — Senha abaixo do tamanho mínimo
  if (password.length < MIN_PASSWORD_LENGTH) {
    return {
      valid: false,
      error: `A senha deve ter no mínimo ${MIN_PASSWORD_LENGTH} caracteres.`,
    };
  }

  // CT05 — Login válido
  return { valid: true, error: null };
}

module.exports = { validateLogin, MIN_PASSWORD_LENGTH };
