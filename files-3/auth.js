/**
 * Módulo de Autenticação
 * Contém a lógica de negócio para login e validação de usuários.
 */

// Banco de dados simulado de usuários
const USUARIOS_MOCK = [
  { id: 1, email: "admin@loja.com", senha: "senha123", nome: "Administrador" },
  { id: 2, email: "cliente@email.com", senha: "minha_senha", nome: "Cliente Exemplo" },
];

/**
 * Valida se um endereço de e-mail está no formato correto.
 * @param {string} email - O e-mail a ser validado.
 * @returns {boolean} - true se válido, false caso contrário.
 */
function validarEmail(email) {
  if (!email || typeof email !== "string") return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
}

/**
 * Realiza o login de um usuário com base nas credenciais fornecidas.
 * @param {string} email - O e-mail do usuário.
 * @param {string} senha - A senha do usuário.
 * @param {Function} buscarUsuario - Função que busca o usuário (injetável para testes).
 * @returns {{ sucesso: boolean, token?: string, erro?: string }}
 */
function realizarLogin(email, senha, buscarUsuario = null) {
  // Cenário 3: Validação de campo - e-mail vazio ou inválido
  if (!email || !email.trim()) {
    return { sucesso: false, erro: "O campo de e-mail é obrigatório." };
  }

  if (!validarEmail(email)) {
    return { sucesso: false, erro: "Formato de e-mail inválido." };
  }

  if (!senha || !senha.trim()) {
    return { sucesso: false, erro: "O campo de senha é obrigatório." };
  }

  // Usa função injetada (mock nos testes) ou busca no mock padrão
  const fnBuscar = buscarUsuario || ((e) => USUARIOS_MOCK.find((u) => u.email === e));
  const usuario = fnBuscar(email.trim().toLowerCase());

  // Cenário 2: Tratamento de erro - credenciais inválidas
  if (!usuario || usuario.senha !== senha) {
    return { sucesso: false, erro: "E-mail ou senha incorretos." };
  }

  // Cenário 1: Sucesso - gera token simulado
  const token = `token_${usuario.id}_${Date.now()}`;
  return {
    sucesso: true,
    token,
    usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email },
  };
}

module.exports = { validarEmail, realizarLogin };
