import repo from '../repositories/usuariosRepo.js';
import bcrypt from 'bcryptjs';
import { generarToken, autenticar, autorizar } from '../config/middleware/auth.js';


export default {
    login: async (req, res) => {
        const { username, password } = req.body;
        const user = repo.findByUsername(username);
        if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });


        const valido = await bcrypt.compare(password, user.passwordHash);
        if (!valido) return res.status(401).json({ error: 'Credenciales inválidas' });


        const token = generarToken(user);
        res.json({ token, role: user.role });
    },


    register: async (req, res) => {
        const { username, password, role } = req.body;
        if (!['admin', 'medico', 'paciente'].includes(role)) {
            return res.status(400).json({ error: 'Rol inválido' });
        }
        const user = await repo.create({ username, password, role });
        res.status(201).json({ id: user.id, username: user.username, role: user.role });
    },
};