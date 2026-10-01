# Auditoría final requisito por requisito

## Alcance de la evidencia

Se verifican los archivos entregados; no se atribuye cumplimiento a acciones académicas que dependen de personas. Los originales permanecen intactos. Existe un repositorio Git local inicializado en main. El remoto configurado es https://github.com/Jenmariepo/neonstride-academy. El commit inicial registra la importación asistida del proyecto; el trabajo y los commits propios de ambos integrantes siguen pendientes. No se inventaron video ni despliegue.

Las rutas abreviadas de frontend parten de `frontend/src/js/`; las del servidor indican `backend/`. Consulta el árbol completo para ubicarlas.

| Requisito                                                             | Estado                                                   | Archivo/Evidencia                                                                                                           |
| --------------------------------------------------------------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| 1 · Concepto, intruso único y diseño neón                             | ✅                                                       | frontend/src/js/modules/board.js; frontend/src/css/                                                                         |
| 2 · Letras, emojis, mezcla y práctica                                 | ✅                                                       | data/symbols.js; core/game-engine.js; tests/engine.test.js                                                                  |
| 3 · Fácil, Normal, Difícil y Extremo                                  | ✅                                                       | utils/constants.js; modules/difficulty.js; pruebas de tiempos y tamaños                                                     |
| 4 · Acierto, error, timeout y ronda siguiente                         | ✅                                                       | core/game-engine.js; entities/player.js; ui/board-view.js                                                                   |
| 5 · Carrera automática de PRISM y estados                             | ✅                                                       | entities/prism.js; states/game-state.js                                                                                     |
| 6 · Recuperación, cuatro respuestas, reloj y consecuencias            | ✅                                                       | modules/quiz.js; data/questions.js; ui/quiz-view.js; pruebas de dos oportunidades                                           |
| 7 · Bonus, penalizaciones, HUD y precisión                            | ✅                                                       | modules/scoring.js; utils/constants.js; states/game-state.js                                                                |
| 8 · Niveles, banner, progresión y máximo 8 × 8                        | ✅                                                       | modules/difficulty.js; core/game-engine.js; css/game.css                                                                    |
| 9 · Pistas temporales, coste y práctica ilimitada                     | ✅                                                       | core/game-engine.js; tests/engine.test.js; tests/ui.test.js                                                                 |
| 10 · Nombre, avatar y doble validación                                | ✅                                                       | ui/profile-view.js; utils/validators.js; backend/src/models/validation.js                                                   |
| 11 · Nueve pantallas/estados separados                                | ✅                                                       | frontend/src/js/states/; ui/screens.js; ui/dialogs.js                                                                       |
| 12 · Menú, acciones, marcas y perfil                                  | ✅                                                       | frontend/index.html; states/menu-state.js                                                                                   |
| 13 · Récords por modo/dificultad, racha, partidas y TOP 5 persistente | ✅                                                       | backend/src/repositories/game-repository.js; services/statistics-service.js; states/records-state.js                        |
| 14 · Al menos doce logros completos                                   | ✅                                                       | modules/achievements.js: 14 definiciones; historial competitivo del servidor                                                |
| 15 · Configuración, cinco temas y restablecer                         | ✅                                                       | modules/settings.js; states/settings-state.js; ui/actions.js                                                                |
| 16 · Ratón/táctil y H/P/M en input independiente                      | ✅                                                       | input/input-manager.js; tests/ui.test.js                                                                                    |
| 17 · CSS responsivo sin estilos/eventos inline                        | ✅ implementación; ⚠️ revisión visual pendiente          | Cinco CSS; HTML semántico; tests/browser-check.js preparado, no ejecutado en Chrome                                         |
| 18 · Árbol frontend obligatorio y módulos ES6                         | ✅                                                       | docs/folder-tree.md; frontend/src/js/main.js; import/export en módulos                                                      |
| 19 · Motor separado del DOM y HTTP                                    | ✅                                                       | core/game-engine.js y entities; tests/engine.test.js sin navegador                                                          |
| 20 · Node + Express y backend por capas                               | ✅                                                       | backend/src/{routes,controllers,services,repositories}; server.js; app.js                                                   |
| 21 · SQLite, campos, esquema y consultas parametrizadas               | ✅                                                       | backend/src/models/schema.sql; config/database.js; repositories/                                                            |
| 22 · REST, sobre JSON y códigos HTTP                                  | ✅                                                       | routes/api-routes.js; utils/response.js; middlewares/errors.js; tests/api.test.js                                           |
| 23 · Validación, autorización, CORS y errores seguros                 | ✅                                                       | models/validation.js; services/player-service.js; middlewares/security.js; tests/api.test.js                                |
| 24 · .env.example sin secretos                                        | ✅                                                       | .env.example; config/environment.js                                                                                         |
| 25 · .gitignore                                                       | ✅                                                       | .gitignore: dependencias, entorno, BD, build y temporales                                                                   |
| 26 · Nombres técnicos en inglés, kebab-case y documentación española  | ✅                                                       | Árbol de código y documentación; se conservan los nombres README.md/CHECKLIST.md pedidos                                    |
| 27 · Funciones ≤ 40 líneas                                            | ✅                                                       | scripts/audit-code.js (AST) y docs/code-audit.json; ESLint                                                                  |
| 27 · Archivos JS/CSS ≤ 300 líneas                                     | ✅                                                       | docs/code-audit.json; scripts/audit-code.js; metadatos de dependencias excluidos                                            |
| 27 · Máximo tres niveles de anidación                                 | ✅                                                       | eslint.config.js: max-depth; ejecución de ESLint sin errores                                                                |
| 27 · Sin console de depuración ni reglas numéricas dispersas          | ✅                                                       | ESLint no-console/no-magic-numbers; constantes y umbrales descriptivos                                                      |
| 27 · Responsabilidades, estilo y duplicación                          | ✅ revisión de código                                    | BoardView, QuizView, Timer, metric, respond y validadores compartidos; Prettier; no se afirma detección universal de clones |
| 28 · Eventos con addEventListener                                     | ✅                                                       | input/input-manager.js; no handlers en HTML                                                                                 |
| 29 · README profesional                                               | ✅; datos académicos completos                           | README.md: instalación, API, juego, despliegue, autores y marcadores de capturas                                            |
| 30 · Contenido de documento técnico de 3–5 páginas                    | ✅ PDF de 4 páginas revisado; datos académicos completos | docs/technical-document.pdf (4 páginas verificadas) y fuente Markdown con Mermaid                                           |
| 31 · Autoevaluación y checklist                                       | ✅                                                       | CHECKLIST.md y esta tabla                                                                                                   |
| 32 · Distribución real del trabajo                                    | ✅ propuesta; ⚠️ aportaciones y Git pendientes           | docs/team-work.md; no se creó historial ni commits ficticios                                                                |
| 33 · Preparación local y despliegue                                   | ✅ configuración; ⚠️ publicación pendiente               | scripts/build-frontend.js; netlify.toml; vercel.json; render.yaml; docs/deployment.md                                       |
| 34 · Conservar funciones útiles                                       | ✅ con correcciones documentadas                         | docs/initial-analysis.md; README, alcance y decisiones; sonido/confeti/temas y mecánicas conservados                        |
| 35 · Preparación de evaluación y defensa                              | ✅ material; ⚠️ defensa pendiente                        | tests/; docs/team-work.md; auditoría; ambos deben estudiar y explicar                                                       |
| 36 · Fases, proyecto real y auditoría                                 | ✅                                                       | docs/initial-analysis.md; código ejecutable; esta auditoría                                                                 |
| 37 · Prioridades académicas y claridad                                | ✅ decisiones documentadas                               | Motor puro, ES6, Express, SQLite sin ORM ni framework de interfaz                                                           |

## Resultado automático

**31 pruebas aprobadas, 0 fallos.** ESLint y Prettier sin errores. Build verificado con origen local y con `API_BASE_URL` de prueba.

- Archivos fuente auditados (JS, CSS, HTML y SQL): **77**.
- Funciones inspeccionadas mediante AST: **356**.
- Archivo más largo: **270 líneas** (`frontend/src/css/layout.css`).
- Función más larga: **34 líneas** (`frontend/src/js/ui/actions.js`).
- También se comprueba ausencia de estilo/eventos inline y de referencias DOM en core/entities.

## Verificaciones ejecutadas

- Node 26.2: motor, HTTP/SQLite e integración DOM con API real. Véase `test-results.txt` para el resultado final.
- ESLint: límites de función, archivo, profundidad, variables, consola y números de dominio.
- AST con Acorn: recuento verificable en `code-audit.json`; no se miden funciones por expresiones regulares.
- Prettier: formato aplicado y comprobado.
- Build estático: ejecutado, publica únicamente frontend en `dist/`.
- Persistencia: prueba HTTP de idempotencia y lectura desde una segunda conexión al archivo SQLite temporal.
- UI: perfil, atajo, supresión al escribir, práctica, pausa, recuperación, récords, logros, reintento y edición durante partida.

## Ajuste de progresión

`tests/difficulty.test.js` comprueba mayor presión en cada nivel, ventaja adicional en dificultades altas, menor margen con el mismo tiempo de respuesta y conservación de la dificultad tras recuperar la carrera.

## Limitaciones explícitas

La revisión en navegador real sigue pendiente. Las pruebas JSDOM cubren integración y comportamiento, no composición visual ni audio perceptual. `tests/browser-check.js` contiene la prueba con Chrome y captura de pantallas que debe ejecutarse para completar esa evidencia.

El servidor no reejecuta las entradas de una partida, por lo que la validación de puntuación no constituye un sistema antitrampas completo. El TOP 5 sí excluye práctica y requiere el token del perfil para registrar sus resultados. Los tokens no implementan recuperación de cuentas entre dispositivos. Estas decisiones se explican en README.

## ⚠️ PENDIENTE DE ACCIÓN HUMANA

| Acción                              | Evidencia necesaria                                                    |
| ----------------------------------- | ---------------------------------------------------------------------- |
| Trabajo y commits de ambos          | Cambios y commits propios, no atribuciones ficticias.                  |
| Validación visual, audio y capturas | Escritorio, tablet y móvil; ejecutar `npm run test:browser` y revisar. |
| Desplegar                           | URL frontend/API y prueba de persistencia tras reinicio.               |
| Video de 5–8 minutos                | Enlace y participación de ambos.                                       |
| Defensa individual                  | Ambos explican todo el código y sus limitaciones.                      |

La aplicación es demostrable localmente con los comandos del README. Eso no equivale a estar publicada en Internet ni sustituye la revisión visual pendiente.

## Avances del cierre de entrega

- Git local inicializado en `main`; `.git` se excluye del ZIP.
- `technical-document.pdf` creado, con cuatro páginas y revisión visual completa; datos académicos completos.

El documento PDF sí se renderizó correctamente con Poppler. Esta revisión no equivale a revisar la interfaz del videojuego.

## Organización de la entrega

El repositorio remoto está publicado. El documento técnico en Word se encuentra en `technical-document.docx`; su paginación visual está pendiente de comprobación. Los guiones y las instrucciones personales se han separado del repositorio. La distribución académica permanece en `team-work.md`.
