import { Router } from 'express';
import { list, create, getById, remove } from '../controllers/pacientesController.js';

const router = Router();

router.get('/', list);
router.post('/', create);
router.get('/:id', getById);
router.delete('/:id', remove);

export default router;