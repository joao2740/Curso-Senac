// src/services/authService.js

/**
 * Valida o formato do e-mail.
 * @param {string} email
 * @returns {boolean}
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
}

/**
 * Valida a senha (mínimo 6 caracteres).
 * @param {string} password
 * @returns {boolean}
 */
export function validatePassword(password) {
  if (!password || typeof password !== 'string') return false;
  return password.length >= 6;
}

/**
 * Simula a autenticação do usuário via API/MySQL.
 * @param {string} email
 * @param {string} password
 * @param {Function} fetchFn - função de fetch (injetável para testes)
 * @returns {Promise<{success: boolean, user?: object, message?: string}>}
 */
export async function authenticateUser(email, password, fetchFn = fetch) {
  if (!validateEmail(email)) {
    return { success: false, message: 'E-mail inválido.' };
  }
  if (!validatePassword(password)) {
    return { success: false, message: 'Senha deve ter pelo menos 6 caracteres.' };
  }

  try {
    const response = await fetchFn('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, message: data.message || 'Credenciais inválidas.' };
    }

    return { success: true, user: data.user };
  } catch (error) {
    return { success: false, message: 'Erro de conexão com o servidor.' };
  }
}
