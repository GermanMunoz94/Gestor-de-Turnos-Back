import { Router } from 'express';
import ctrl from '../controllers/turnosController.js';


const router = Router();


router.get('/', ctrl.list);
router.post('/', ctrl.create);
router.get('/:id', ctrl.getById);
router.delete('/:id', ctrl.cancelar);
router.get('/medico/:medicoId', ctrl.agendaPorMedico);


export default router;