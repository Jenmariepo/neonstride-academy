# NEONSTRIDE Academy

Videojuego educativo de percepción visual y velocidad desarrollado con HTML, CSS, JavaScript, Node.js, Express y SQLite.

## Integrantes

- Diego Heredia
- Jenmarie Polanco
- Asignatura: Desarrollo e implementación de soluciones web y multimedia
- Docente: Carlos Escalante
- Institución: Politécnico San Valero

## Ejecutar el proyecto

Requiere Node.js 22.22.2+ (rama 22), 24.15+ (rama 24) o 26+.

```bash
npm ci
cp .env.example .env
npm start
```

En Windows PowerShell usa `Copy-Item .env.example .env` en lugar de `cp`.

Abre `http://localhost:3000`. Express sirve el frontend y la API desde el mismo origen. SQLite se crea automáticamente en `backend/data/neonstride.sqlite`.

## Comandos

```bash
npm start
npm run dev
npm test
npm run check
npm run build
```

## Estructura

```text
frontend/   interfaz y lógica del juego
backend/    API REST y persistencia SQLite
scripts/    build y comprobaciones
tests/      pruebas automáticas
```

## API

- `GET/POST /api/players`
- `PUT /api/players/:id`
- `GET/POST /api/games`
- `GET /api/players/:id/games`
- `GET /api/players/:id/statistics`
- `GET /api/leaderboard`

Las operaciones privadas usan `Authorization: Bearer TOKEN`.

## Despliegue

`render.yaml` permite desplegar la aplicación completa. `npm run build` genera `dist/` cuando se necesita una copia estática del frontend.

## Calidad

`npm run check` ejecuta ESLint, la auditoría estructural y las pruebas Node.
