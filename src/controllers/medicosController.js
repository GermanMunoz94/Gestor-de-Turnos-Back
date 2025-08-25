import { findAll, create as _create, findById, remove as _remove } from '../repositories/medicosRepo.js';
import { z } from 'zod';


const schema = z.object({
nombre: z.string().min(1),
apellido: z.string().min(1),
especialidad: z.string().min(1),
matricula: z.string().min(1),
});


export function list(req, res) {
    res.json(findAll());
}
export function create(req, res) {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: 'Datos inválidos', detalles: parsed.error.errors });
    }
    const created = _create(parsed.data);
    res.status(201).json(created);
}
export function getById(req, res) {
    const item = findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Médico no encontrado' });
    res.json(item);
}
export function remove(req, res) {
    const ok = _remove(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Médico no encontrado' });
    res.status(204).send();
}