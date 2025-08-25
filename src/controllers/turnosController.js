import repo from '../repositories/turnosRepo.js';
import { z } from 'zod';
import { enviarRecordatorio } from '../services/emailService.js'; // <-- Agrega esta línea


const schema = z.object({
    fecha: z.string().regex(/\d{4}-\d{2}-\d{2}/),
    hora: z.string().regex(/\d{2}:\d{2}/),
    medicoId: z.number().int(),
    pacienteId: z.number().int(),
});


export default {
    list: (req, res) => {
        res.json(repo.findAll());
    },
    create: async (req, res) => { // <-- Cambia a async
        const parsed = schema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: 'Datos inválidos', detalles: parsed.error.errors });
        }


        // Validación de disponibilidad
        const { fecha, hora, medicoId } = parsed.data;
        const ocupados = repo.findByMedicoAndFecha(medicoId, fecha);
        if (ocupados.find((t) => t.hora === hora && t.estado === 'reservado')) {
            return res.status(409).json({ error: 'El turno ya está ocupado' });
        }


        const created = repo.create(parsed.data);


        // Simulamos enviar recordatorio al email del paciente
        await enviarRecordatorio(created, "paciente@example.com");

        res.status(201).json(created);

        
    },
    getById: (req, res) => {
        const item = repo.findById(req.params.id);
        if (!item) return res.status(404).json({ error: 'Turno no encontrado' });
        res.json(item);
    },
    cancelar: (req, res) => {
        const item = repo.findById(req.params.id);
        if (!item) return res.status(404).json({ error: 'Turno no encontrado' });
        repo.update(req.params.id, { estado: 'cancelado' });
        res.json({ message: 'Turno cancelado' });
    },
    agendaPorMedico: (req, res) => {
        const { medicoId } = req.params;
        const { fecha } = req.query;
        if (!fecha) return res.status(400).json({ error: 'Debe indicar fecha' });
        const lista = repo.findByMedicoAndFecha(Number(medicoId), fecha);
        res.json(lista);
    },
};