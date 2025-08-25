import Medico from '../models/Medicos.js';


let seq = 1;
const store = new Map();


export function create(data) {
    const id = seq++;
    const entity = new Medico({ id, ...data });
    store.set(id, entity);
    return entity;
}
export function findAll() {
    return Array.from(store.values());
}
export function findById(id) {
    return store.get(Number(id));
}
export function remove(id) {
    return store.delete(Number(id));
}