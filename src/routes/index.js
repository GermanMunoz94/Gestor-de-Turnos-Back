import { Router } from 'express';
import pacientesRoutes from './pacientesRoutes.js';
import medicosRoutes from './medicosRoutes.js';
import turnosRoutes from './turnosRoutes.js';
import authRoutes from './authRoutes.js';
import { autenticar, autorizar } from '../config/middleware/auth.js';


const router = Router();


router.get('/status', (req, res) => {
res.json({ ok: true, timestamp: new Date().toISOString() });
});


router.use('/auth', authRoutes);


// Rutas protegidas
router.use('/pacientes', autenticar, autorizar('admin'), pacientesRoutes);
router.use('/medicos', autenticar, autorizar('admin'), medicosRoutes);
router.use('/turnos', autenticar, autorizar('admin','paciente','medico'), turnosRoutes);


export default router;