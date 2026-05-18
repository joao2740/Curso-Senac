// src/database/mysql.js

/**
 * Simula a consulta ao banco MySQL.
 * Em produção, este módulo seria substituído por uma chamada real à API/banco.
 */

const mockUsers = [
  { id: 1, email: 'usuario@email.com', password: 'senha123', name: 'Usuário Teste' },
];

export async function queryUserByEmail(email) {
  return mockUsers.find((u) => u.email === email) || null;
}

export async function verifyCredentials(email, password) {
  const user = await queryUserByEmail(email);
  if (!user) return { authenticated: false, reason: 'Usuário não encontrado.' };
  if (user.password !== password) return { authenticated: false, reason: 'Senha incorreta.' };
  const { password: _, ...safeUser } = user;
  return { authenticated: true, user: safeUser };
}
