import { Router } from 'express';
import ctrl from '../controllers/authController.js';


const router = Router();


router.post('/login', ctrl.login);
router.post('/register', ctrl.register);


export default router;