// Substitua pelo seu token JWT válido (agora não necessário)
// const TOKEN = 'SEU_TOKEN_JWT_AQUI';
const BASE_URL = 'http://localhost:3001/api/pacientes';

// Headers comuns (removido Authorization para testes sem auth)
// const headers = {
//   'Authorization': `Bearer ${TOKEN}`,
//   'Content-Type': 'application/json'
// };
const headers = {
  'Content-Type': 'application/json'
};

// Teste: Listar todos os pacientes
async function testarListarPacientes() {
  try {
    const response = await fetch(`${BASE_URL}/`, { headers });
    const data = await response.json();
    console.log('Listar pacientes:', data);
  } catch (error) {
    console.error('Erro:', error.message);
  }
}

// Teste: Criar paciente
async function testarCriarPaciente() {
  try {
    const novoPaciente = {
      nome_completo: 'João Silva',
      cpf: '12345678901',
      data_nascimento: '1990-01-01',
      sexo: 'M',
      contato: '11999999999'
    };
    const response = await fetch(`${BASE_URL}/cadastro`, {
      method: 'POST',
      headers,
      body: JSON.stringify(novoPaciente)
    });
    const data = await response.json();
    console.log('Paciente criado:', data);
  } catch (error) {
    console.error('Erro:', error.message);
  }
}

// Teste: Obter paciente por ID
async function testarObterPaciente(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, { headers });
    const data = await response.json();
    console.log('Paciente obtido:', data);
  } catch (error) {
    console.error('Erro:', error.message);
  }
}

// Teste: Atualizar paciente
async function testarAtualizarPaciente(id) {
  try {
    const dadosAtualizados = {
      nome_completo: 'João Silva Atualizado',
      contato: '11888888888'
    };
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(dadosAtualizados)
    });
    const data = await response.json();
    console.log('Paciente atualizado:', data);
  } catch (error) {
    console.error('Erro:', error.message);
  }
}

// Teste: Deletar paciente
async function testarDeletarPaciente(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers
    });
    const data = await response.json();
    console.log('Paciente deletado:', data);
  } catch (error) {
    console.error('Erro:', error.message);
  }
}

// Executar testes
async function executarTestes() {
  console.log('Iniciando testes das rotas de pacientes...\n');

  await testarListarPacientes();
  console.log('\n---\n');

  await testarCriarPaciente();
  console.log('\n---\n');

  // Assumindo que o ID do paciente criado é 1 (ajuste conforme necessário)
  await testarObterPaciente(1);
  console.log('\n---\n');

  await testarAtualizarPaciente(1);
  console.log('\n---\n');

  await testarDeletarPaciente(1);
  console.log('\n---\n');

  console.log('Testes concluídos.');
}

executarTestes();