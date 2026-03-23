import express from 'express';
import { 
    registrar, 
    login, 
    listarTodosProfissionais, 
    obterProfissional, 
    atualizarProfissional, 
    desativarProfissional 
} from '../controllers/autenticacaoController.js';
import auth from '../middleware/autenticacaoMiddleware.js';

const router = express.Router();

router.post('/registrar', registrar);
router.post('/login', login);

// CRUD de Profissionais
router.get('/', auth, listarTodosProfissionais);
router.get('/:id', auth, obterProfissional);
router.put('/:id', auth, atualizarProfissional);
router.delete('/:id', auth, desativarProfissional);

export default router;