# Despliegue y demostración

## Estado

**⚠️ PENDIENTE DE ACCIÓN HUMANA.** Se entregan archivos de configuración e instrucciones. No existe una URL pública creada por esta entrega ni se han contratado recursos.

## Netlify o Vercel · Frontend

1. Sube el proyecto a un repositorio propio con contribuciones reales de ambos integrantes.
2. Importa la raíz del proyecto en el proveedor elegido.
3. Usa `npm run build` como construcción y `dist` como carpeta publicada. `netlify.toml` y `vercel.json` ya declaran esta configuración.
4. Define `API_BASE_URL=https://tu-backend.example.com`, sin ruta ni barra final. Vuelve a construir si cambia la URL.
5. Configura el backend para permitir exactamente el origen HTTPS del frontend mediante `CLIENT_URL`.
6. Comprueba registro, partida, recarga de récords y solicitudes de red desde el dominio público.

## Render · Backend

Importa `render.yaml` mediante Blueprint desde tu repositorio. Revisa el plan y el disco antes de aceptar: el archivo solicita un plan con disco persistente y podría tener coste. `CLIENT_URL` se introduce en el panel, sin credenciales en Git. La compilación instala dependencias de producción y `npm start` inicia Express.

El disco se monta en `/var/data`; `DB_PATH=/var/data/neonstride.sqlite`. El esquema se aplica al arrancar. No configures la raíz del servicio como `backend/`: el servidor comparte reglas puras con `frontend/src/js` y el workspace instala las dependencias desde la raíz.

## Railway · Alternativa de backend

Despliega el repositorio como servicio Node desde la raíz, con `npm ci --omit=dev` y `npm start`. Monta un volumen en `/data`; configura `DB_PATH=/data/neonstride.sqlite`, `CLIENT_URL` y `NODE_ENV=production`. Usa el `PORT` que proporcione el servicio. La persistencia del volumen es necesaria; no uses el filesystem temporal del contenedor para guardar resultados.

## Verificación después de publicar

- Registrar un piloto y editarlo usando su sesión.
- Completar una partida y encontrarla en `/api/players/:id/games`.
- Reiniciar el backend y comprobar que permanece.
- Comprobar que la práctica no modifica TOP 5 ni logros.
- Verificar HTTPS, CORS, errores normalizados y ausencia de archivos `.env` en el frontend.
- Tomar capturas desde escritorio, tablet y móvil.

## Referencias oficiales consultadas

- [SQLite en Node.js](https://nodejs.org/api/sqlite.html): API integrada y sentencias preparadas.
- [Discos persistentes de Render](https://render.com/docs/disks): comportamiento del almacenamiento.
- [Configuración de builds de Netlify](https://docs.netlify.com/build/configure-builds/overview/): build y directorio publicado.
- [Errores en Express](https://expressjs.com/en/guide/error-handling/): middleware de errores.
