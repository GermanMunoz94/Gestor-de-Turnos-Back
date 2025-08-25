import nodemailer from 'nodemailer';

// Usamos jsonTransport para simular envío (no manda correos reales, solo imprime en consola)
const transporter = nodemailer.createTransport({
    jsonTransport: true
});

export async function enviarRecordatorio(turno, pacienteEmail) {
    const info = await transporter.sendMail({
        from: 'noreply@gestor.com',
        to: pacienteEmail,
        subject: 'Recordatorio de turno',
        text: `Tiene un turno con el médico ${turno.medicoId} el día ${turno.fecha} a las ${turno.hora}`,
    });
    console.log('Recordatorio simulado:', info.message);
}