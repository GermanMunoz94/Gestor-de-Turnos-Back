class Usuario {
constructor({ id, username, passwordHash, role }) {
this.id = id;
this.username = username;
this.passwordHash = passwordHash; // almacenamos hash, no la contraseña
this.role = role; // 'admin' | 'medico' | 'paciente'
}
}


export default Usuario;