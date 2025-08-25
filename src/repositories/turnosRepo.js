import Turno from '../models/Turno.js';


let seq = 1;
const store = new Map();


export default {
create(data) {
const id = seq++;
const entity = new Turno({ id, ...data });
store.set(id, entity);
return entity;
},
findAll() {
return Array.from(store.values());
},
findById(id) {
return store.get(Number(id));
},
findByMedicoAndFecha(medicoId, fecha) {
return Array.from(store.values()).filter(
(t) => t.medicoId === Number(medicoId) && t.fecha === fecha
);
},
remove(id) {
return store.delete(Number(id));
},
update(id, data) {
const turno = store.get(Number(id));
if (!turno) return null;
Object.assign(turno, data);
return turno;
},
};