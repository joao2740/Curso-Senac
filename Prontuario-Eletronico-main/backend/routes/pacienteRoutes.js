import express from 'express';
import { listarTodos, obterPaciente, criarPaciente, atualizarPaciente, deletarPaciente } from '../controllers/pacienteController.js';
import auth from '../middleware/autenticacaoMiddleware.js'; // Importa o "segurança"

const router = express.Router();

// Opção A: Proteger TODAS as rotas deste arquivo
// router.use(auth); // DESATIVADO TEMPORARIAMENTE PARA TESTES

// Rotas CRUD de pacientes
router.get('/', listarTodos);
router.get('/:id', obterPaciente);
router.post('/cadastro', criarPaciente);
router.put('/:id', atualizarPaciente);
router.delete('/:id', deletarPaciente);

export default router;