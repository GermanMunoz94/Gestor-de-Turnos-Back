class Turno {
constructor({ id, fecha, hora, medicoId, pacienteId, estado = 'reservado' }) {
this.id = id;
this.fecha = fecha; // YYYY-MM-DD
this.hora = hora; // HH:mm
this.medicoId = medicoId;
this.pacienteId = pacienteId;
this.estado = estado; // reservado | cancelado
}
}


export default Turno;