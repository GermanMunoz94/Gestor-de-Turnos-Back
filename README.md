## 🚀 Requisitos
- Node.js 18+
- npm 9+

## Instalación
```bash
cd gestor-turnos-backend
npm install
```

## Variables de entorno
Crea un archivo `.env` en la raíz:

```env
PORT=4000
JWT_SECRET=supersecreto
DB_HOST=localhost
DB_USER=root
DB_PASS=clave
DB_NAME=gestor_turnos
```

## Scripts
- `npm run dev` → iniciar en modo desarrollo
- `npm start` → iniciar en producción
- `npm run test` → ejecutar tests (Vitest + Supertest)

## Endpoints principales
- `POST /auth/register` → registrar paciente
- `POST /auth/register-medico` → registrar médico (solo admin)
- `POST /auth/login` → iniciar sesión (retorna JWT + rol)
- `GET /medicos` → listar médicos
- `GET /turnos` → listar turnos
- `POST /turnos/:id/reservar` → reservar turno (paciente)

## Roles
- **Admin**: crear médicos, gestionar usuarios.
- **Médico**: ver sus turnos.
- **Paciente**: registrarse y reservar turnos.
