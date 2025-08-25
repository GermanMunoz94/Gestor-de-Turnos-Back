import { findAll, create as _create, findById, remove as _remove } from '../repositories/pacientesRepo.js';
import { z } from 'zod';


const schema = z.object({
nombre: z.string().min(1),
apellido: z.string().min(1),
dni: z.string().min(6),
telefono: z.string().min(6),
email: z.string().email(),
});


export function list(req, res) {
    res.json(findAll());
}
export function create(req, res, next) {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: 'Datos inválidos', detalles: parsed.error.errors });
    }
    const created = _create(parsed.data);
    res.status(201).json(created);
}
export function getById(req, res) {
    const item = findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Paciente no encontrado' });
    res.json(item);
}
export function remove(req, res) {
    const ok = _remove(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Paciente no encontrado' });
    res.status(204).send();
}