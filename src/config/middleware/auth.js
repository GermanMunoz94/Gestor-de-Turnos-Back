import jwt from 'jsonwebtoken';


const SECRET = process.env.JWT_SECRET || 'secretkey';


export function generarToken(user) {
    return jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '1h' });
}


export function autenticar(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: 'Token requerido' });


    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, SECRET);
        req.user = payload;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }
}


export function autorizar(...roles) {
    return (req, res, next) => {
        if (!req.user) return res.status(401).json({ error: 'No autenticado' });
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'No autorizado' });
        }
        next();
    };
}