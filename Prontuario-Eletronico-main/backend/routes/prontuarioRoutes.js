import express from 'express';
import { 
    iniciarAtendimento, 
    salvarProntuario, 
    listarHistoricoPaciente, 
    buscarAtendimentoDetalhado 
} from '../controllers/prontuarioController.js';
import auth from '../middleware/autenticacaoMiddleware.js';

const router = express.Router();

// Rotas de Atendimento e Prontuário (Protegidas)
router.post('/iniciar', auth, iniciarAtendimento);
router.post('/salvar', auth, salvarProntuario);
router.get('/paciente/:id_paciente', auth, listarHistoricoPaciente);
router.get('/:id', auth, buscarAtendimentoDetalhado);

export default router;