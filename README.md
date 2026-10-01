# ¿DÓNDE ESTÁ? × NEONSTRIDE

Videojuego educativo de percepción visual y velocidad. Encuentra el único elemento diferente de la cuadrícula antes de que PRISM complete su carrera. Conserva el concepto y los colores de la versión inicial y separa motor, interfaz, entrada, HTTP y persistencia.

## Objetivo e integrantes

Construir una aplicación completa y explicable que combine programación modular, una API REST y una base de datos persistente.

- **Integrante A:** `Diego Heredia`.
- **Integrante B:** `Jenmarie Polanco`.
- **Asignatura:** Desarrollo e implementación de soluciones web y multimedia.
- **Docente:** Carlos Escalante.
- **Institución:** Politécnico San Valero.

Se inicializó el repositorio Git local en la carpeta del proyecto, para registrar la entrega inicial y los aportes posteriores con identidades reales. El ZIP no contiene el directorio .git. Véase [trabajo en equipo](docs/team-work.md).

**Repositorio:** [Jenmariepo/neonstride-academy](https://github.com/Jenmariepo/neonstride-academy).

## Tecnologías y características

HTML5, CSS3, JavaScript con módulos ES6, Node.js, Express 5 y SQLite mediante `node:sqlite`. Sin framework de interfaz, compilador obligatorio ni ORM.

- Letras, emojis, mezcla y práctica; cuatro dificultades y tableros de 3 × 3 a 8 × 8.
- PRISM, cronómetro, vidas, puntos, bonus, rachas, niveles y precisión.
- Pistas, preguntas de seis categorías, dos oportunidades de recuperación y victoria real.
- Perfil con avatar, cinco temas, sonido sintetizado con Web Audio, animaciones y confeti.
- TOP 5 por piloto con filtros, récords personales por modo/dificultad y 14 logros.
- SQLite como fuente de verdad de partidas, récords y logros; práctica excluida de estadísticas competitivas.
- Reintento de envío idempotente, pausa automática al ocultar la pestaña y modales accesibles.

## Requisitos previos

Node.js **22.22.2+ (rama 22), 24.15+ (rama 24) o 26+** y npm; se verificó con Node 26.2. Navegador moderno con módulos, `dialog`, `fetch` y Web Audio. Para las pruebas visuales opcionales, Google Chrome instalado.

SQLite viene con Node. No necesitas instalar MySQL ni crear un usuario o contraseña de base de datos. En Node 22 puede aparecer una advertencia experimental de `node:sqlite`; no es un fallo del juego.

## Instalación y ejecución local

Desde esta carpeta, donde está el `package.json` principal:

```powershell
npm ci
Copy-Item .env.example .env
npm start
```

En macOS/Linux, reemplaza `Copy-Item .env.example .env` por `cp .env.example .env`.

Abre **http://localhost:3000**. Express sirve el frontend y la API desde el mismo origen. No abras `frontend/index.html` mediante `file://`: los módulos y la API requieren HTTP. La primera pantalla solicita nombre y avatar y los registra en el servidor.

Para reinicio automático del backend durante desarrollo: `npm run dev`.

Si el puerto 3000 está ocupado, cambia `PORT` y `CLIENT_URL` juntos, por ejemplo a `3187` y `http://localhost:3187`. Reinicia el servidor. No detengas procesos ajenos.

### Configuración de .env

| Variable                                                  | Uso                                                                          |
| --------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `PORT`                                                    | Puerto HTTP, por defecto 3000.                                               |
| `DB_PATH`                                                 | Archivo SQLite; las rutas relativas se resuelven desde la raíz del proyecto. |
| `CLIENT_URL`                                              | Orígenes permitidos separados por coma, sin barra final.                     |
| `NODE_ENV`                                                | Entorno de ejecución.                                                        |
| `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` | Marcadores sin uso en SQLite. No rellenarlos.                                |

`.env` está ignorado por Git. El token de cada perfil se genera aleatoriamente; no hay credenciales incrustadas.

### Base de datos

Al arrancar, se crea `backend/data/neonstride.sqlite` y se aplica automáticamente [schema.sql](backend/src/models/schema.sql). El esquema es idempotente e incluye claves foráneas, restricciones e índices. Los archivos WAL auxiliares también están ignorados por Git.

Los datos sobreviven al reinicio del servidor. Para una copia de seguridad sencilla, detén el servidor y copia el archivo SQLite. No elimines la base para restablecer opciones: el botón de configuración solo restaura las preferencias del navegador. Los perfiles de una base eliminada dejan de existir; utiliza un nuevo almacenamiento del navegador si creas una base nueva.

## Frontend y backend por separado

Localmente `npm start` levanta ambos; no se requiere segundo servidor. También puedes ejecutar `npm start --workspace backend` desde la raíz para iniciar el backend, que igualmente sirve los archivos estáticos.

Para generar un frontend estático destinado a otro dominio:

```powershell
$env:API_BASE_URL="https://tu-api.example.com"
npm run build
```

Publica `dist/`. En bash usa `API_BASE_URL=https://tu-api.example.com npm run build`. Esta URL es pública y debe coincidir con el backend publicado; configura `CLIENT_URL` en el backend con el origen del frontend. El script solo modifica la copia de `dist/`.

## API REST

| Método | Ruta                          | Propósito                                                  |
| ------ | ----------------------------- | ---------------------------------------------------------- |
| GET    | `/api/players`                | Últimos 50 jugadores, sin secretos.                        |
| POST   | `/api/players`                | Registrar nombre/avatar; devuelve ID y token una sola vez. |
| PUT    | `/api/players/:id`            | Editar perfil con token propio.                            |
| GET    | `/api/games`                  | Últimas 50 partidas.                                       |
| POST   | `/api/games`                  | Guardar partida con token propio; envío idempotente.       |
| GET    | `/api/players/:id/games`      | Últimas 50 partidas del piloto.                            |
| GET    | `/api/players/:id/statistics` | Todos sus récords y logros competitivos.                   |
| GET    | `/api/leaderboard`            | Cinco pilotos por mejor puntuación.                        |

El leaderboard admite `?mode=letters&difficulty=easy`; ambos filtros son opcionales. Desempata por mejor racha y después por ID. Un piloto aparece una sola vez. Práctica no participa.

Crear jugador: `{"name":"Alex","avatar":"🦊"}`. Para editar o enviar partidas, usa `Authorization: Bearer TOKEN`.

Ejemplo de partida válida (sustituye el ID por el registrado):

```json
{
  "submission_id": "91cb1975-9a80-4112-9a43-0eaec9472c10",
  "player_id": 1,
  "score": 160,
  "mode": "letters",
  "difficulty": "easy",
  "practice": false,
  "outcome": "abandoned",
  "level": 1,
  "rounds": 1,
  "hits": 1,
  "misses": 0,
  "best_streak": 1
}
```

El servidor calcula `accuracy`. Reenviar el mismo `submission_id` no duplica la partida. Respuestas: `{"success":true,"data":{},"message":"Operación completada."}` o `{"success":false,"data":null,"message":"..."}`. Códigos: 200, 201, 400, 401, 404, 409, 413 y 500.

Validación manual en `backend/src/models/validation.js`: tipo, rango, nombre, avatar, enums y coherencia entre intentos, nivel, racha y puntuación. SQL parametrizado en repositorios. Los services no conocen HTTP y los controllers no contienen SQL.

## Cómo jugar

1. Registra tu nombre y avatar; elige modo y dificultad.
2. Selecciona el intruso. Cada acierto da 100 puntos, hasta 50 por velocidad y hasta 150 por racha.
3. Cada acierto avanza 3 %; gana el jugador al alcanzar 100 %. Cada tres aciertos sube un nivel.
4. Error: −25 puntos y una vida. Tiempo agotado: −40 y una vida. Los puntos nunca son negativos.
5. H: pista de 1,3 segundos, −50 puntos. P: pausa. M: sonido. Tab/Enter también activan botones.
6. Si PRISM llega primero o pierdes las tres vidas, responde una pregunta en 12 segundos. Hay dos oportunidades por partida. Acertar garantiza una vida y devuelve a PRISM al 35 %. Agotarlas termina la partida.
7. Práctica no tiene cronómetro ni presión del rival; conserva vidas y pistas. Se puede terminar con el botón correspondiente. Se guarda con `practice=true`, pero no modifica récords, partidas competitivas ni logros.

Salir termina la partida y conserva el resultado. Cambiar de pestaña pausa incluso la pregunta. Una partida pendiente de envío bloquea comenzar otra hasta sincronizarla, para evitar perderla.

### Progresión de dificultad por nivel

En cada nivel, PRISM acelera con una curva creciente y cada acierto lo hace retroceder menos. La dificultad seleccionada multiplica su velocidad y también reduce el efecto de los aciertos. El tiempo disminuye más deprisa en dificultades altas, hasta un mínimo de 4 segundos; el tablero mantiene su límite de 8 × 8. Incluso alcanzados esos límites, PRISM sigue ganando ventaja con cada nivel.

| Nivel | Multiplicador de velocidad respecto al nivel 1 | Retroceso por acierto en Fácil |
| ----- | ---------------------------------------------- | ------------------------------ |
| 1     | 1,00 ×                                         | 4,00 puntos de carrera         |
| 5     | 2,28 ×                                         | 1,67 puntos de carrera         |
| 10    | 5,46 ×                                         | 0,96 puntos de carrera         |

La velocidad también crece con el progreso del jugador. Los valores se definen en `utils/constants.js` y se calculan en `modules/difficulty.js`. La recuperación no reinicia el nivel ni reduce esta presión. Práctica sigue sin reloj ni avance de PRISM. La victoria continúa siendo posible con respuestas suficientemente rápidas; no se fuerza una derrota aleatoria.

## Estructura

```text
frontend/
  index.html
  src/css/                  base, layout, components, game, responsive
  src/js/
    main.js                 punto de entrada
    core/                   motor, reloj, bucle
    entities/               jugador y PRISM
    states/                 vistas de cada pantalla
    input/                  eventos y atajos
    modules/                reglas de dominio
    services/               HTTP y almacenamiento de preferencias
    utils/                  constantes, validadores y azar
    data/                   símbolos y preguntas
    ui/                     DOM, renderizado y coordinación
  src/assets/               images, sounds, fonts
backend/
  server.js                 inicio y cierre del servidor
  package.json
  src/                      app, config, routes, controllers,
                            services, repositories, models,
                            middlewares, utils
scripts/                    auditoría y build estático
tests/                      motor, API, interfaz y navegador
docs/                       análisis, documento, auditoría y defensa
```

El [árbol completo](docs/folder-tree.md) contiene todos los módulos. Los recursos visuales usan CSS y emojis; los sonidos se sintetizan, sin descargas de fuentes ni assets externos.

## Pruebas y calidad

```sh
npm run check
npm run format:check
npm run build
```

`check` ejecuta ESLint, auditoría estructural con AST y pruebas Node. Verifica funciones de máximo 40 líneas, archivos JS/CSS de máximo 300, profundidad de bloques de máximo 3, ausencia de `console` y constantes numéricas de dominio. Las pruebas usan una base temporal y no alteran la base del juego.

`npm test` ejecuta sin subprocesos aislados para admitir este entorno. Los valores numéricos esperados de las pruebas no se consideran constantes de negocio.

Para verificación visual, con el servidor activo y Chrome instalado: `npm run test:browser`. Acepta `TEST_URL` para otro puerto y `CDP_URL` para un Chrome de pruebas ya iniciado. Genera capturas en `docs/screenshots/`. **La apariencia y el audio en dispositivos reales siguen pendientes de verificación.**

## Capturas de pantalla

**PENDIENTE DE ACCIÓN HUMANA:** ejecutar la prueba de navegador o tomar y revisar las capturas.

- `[CAPTURA 1: menú de escritorio]` → `docs/screenshots/menu-desktop.png`.
- `[CAPTURA 2: partida y PRISM]` → `docs/screenshots/game-desktop.png`.
- `[CAPTURA 3: recuperación]` → `docs/screenshots/recovery.png`.
- `[CAPTURA 4: resultados y persistencia]` → `docs/screenshots/results.png`.
- `[CAPTURA 5: móvil]` → `docs/screenshots/game-mobile.png`.

## Despliegue

Se incluyen `netlify.toml`, `vercel.json` y `render.yaml`. Sigue [despliegue](docs/deployment.md). **Publicación pendiente de acción humana**: no se crearon cuentas ni servicios ni se contrataron planes.

SQLite requiere almacenamiento persistente. En Render, el blueprint prepara un disco y un plan que lo admite; revisa sus costes antes de desplegar. En Railway, monta un volumen y establece `DB_PATH` dentro de él. Un disco efímero perdería las partidas tras una sustitución del contenedor.

## Alcance y decisiones

El token protege la modificación del perfil, pero no implementa cuentas con contraseña ni recuperación entre dispositivos. No publiques ese token. Las consultas de clasificación son públicas. El servidor valida coherencia, pero no reproduce toda la partida: este proyecto académico no es una plataforma antitrampas para premios o competición económica.

No se migra automáticamente el `localStorage` antiguo al leaderboard global: importar marcas no verificadas alteraría la clasificación. Tampoco se mantiene el botón antiguo de borrar una clasificación compartida desde cualquier navegador. Los ajustes, perfil y un envío pendiente usan almacenamiento local; los récords oficiales se consultan en SQLite.

## Documentación y autores

- [Análisis de la versión original](docs/initial-analysis.md).
- [Documento técnico en Word](docs/technical-document.docx).
- [Documento técnico PDF de cuatro páginas](docs/technical-document.pdf).
- [Fuente editable y diagramas Mermaid](docs/technical-document.md).
- [Auditoría requisito por requisito](docs/final-audit.md).
- [CHECKLIST académico](CHECKLIST.md).
- [Organización del trabajo académico](docs/team-work.md).

**Autores:** `Diego Heredia` y `Jenmarie Polanco`. Completar aportaciones individuales y evidencias antes de entregar.
