import Usuario from '../models/Usuario.js';
import bcrypt from 'bcryptjs';


let seq = 1;
const store = new Map();


// Creamos un usuario admin por defecto
const defaultAdmin = new Usuario({
    id: seq++,
    username: 'admin',
    passwordHash: bcrypt.hashSync('admin123', 10),
    role: 'admin'
});
store.set(defaultAdmin.id, defaultAdmin);


export default {
    create: async ({ username, password, role }) => {
        const id = seq++;
        const passwordHash = await bcrypt.hash(password, 10);
        const user = new Usuario({ id, username, passwordHash, role });
        store.set(id, user);
        return user;
    },
    findByUsername: (username) => {
        return Array.from(store.values()).find((u) => u.username === username);
    },
    findById: (id) => store.get(Number(id)),
};