const fs = require('fs');
const path = require('path');

const dbDir = path.join(__dirname);
const tarefasFile = path.join(dbDir, 'tarefas.json');
const usersFile = path.join(dbDir, 'users.json');

function readJSON(file) {
  try {
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, JSON.stringify([], null, 2));
    }
    const raw = fs.readFileSync(file);
    return JSON.parse(raw);
  } catch (err) {
    console.error('Erro lendo arquivo JSON:', file, err);
    return [];
  }
}

function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

module.exports = {
  // Tarefas
  getTarefas: () => readJSON(tarefasFile),
  saveTarefas: (tarefas) => writeJSON(tarefasFile, tarefas),

  // Users
  getUsers: () => readJSON(usersFile),
  saveUsers: (users) => writeJSON(usersFile, users)
};