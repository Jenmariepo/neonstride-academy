# Fases 1 y 2 · Análisis de la versión original

Se leyeron `index.html`, `style.css` y `script.js` de la carpeta `fusion/cambio`. Se conservaron intactos. El nuevo proyecto se encuentra en otra carpeta.

## Funciones encontradas

| Área       | Versión inicial                                             | Decisión                                                             |
| ---------- | ----------------------------------------------------------- | -------------------------------------------------------------------- |
| Diseño     | Fondo oscuro, cian/rosa/violeta, paneles, menú y cuadrícula | Conservar lenguaje visual, mejorar jerarquía y espaciado.            |
| Modos      | Letras, emojis, mezcla y práctica                           | Conservar los pares de símbolos; separar datos.                      |
| Dificultad | Cuatro tiempos iniciales y tamaños                          | Mantener 20/15/11/8 s, configurar progresión.                        |
| Carrera    | Progreso de jugador y PRISM                                 | Separar entidades y añadir victoria al alcanzar meta.                |
| Mecánicas  | Vida, pista, racha, puntuación, precisión, nivel            | Reglas puras y constantes descriptivas.                              |
| Preguntas  | Diez preguntas de seis áreas, cuatro respuestas             | Preservar contenido, separar temporizador y límite de oportunidades. |
| Perfil     | Nombre, emoji, preferencias                                 | Validación frontend/backend y perfil persistente.                    |
| Extras     | Sonido, confeti, pausa, resultados y atajos                 | Mantener; pausar al editar perfil o cambiar de pestaña.              |
| Récords    | `localStorage`, clasificación de cinco entradas             | Reemplazar por REST + SQLite; TOP 5 de pilotos únicos.               |
| Logros     | Doce definiciones                                           | Ampliar a catorce, calcular con historial competitivo real.          |

## Cumplimientos previos

HTML, CSS y JavaScript separados; interfaz en español; diseño adaptable mediante media queries; abundantes funcionalidades del concepto. Existían arrays de datos y un objeto con tiempos iniciales. No había eventos inline en el HTML, pero sí asignaciones `.onclick` en JavaScript.

## Incumplimientos y defectos concretos

- `script.js` unía dominio, DOM, entrada, temporizadores, audio y persistencia; sin imports/exports.
- No existían backend, endpoints, base de datos, validación del servidor ni consultas SQL.
- Motor dependiente de `document`, `innerHTML`, clases CSS y estilos de elementos.
- Estado mutable global, nombres mezclados en español/inglés y números de reglas dispersos.
- `correct()` podía llevar el progreso del jugador al 100 % sin llamar a un final de victoria.
- `setTimeout(createRound, ...)` no se cancelaba al abandonar; podía crear rondas fuera de partida.
- El selector de dificultad empleaba atributos y nombres inconsistentes (`data-diff` frente a `data-difficulty`).
- El bonus, los récords y los logros no estaban separados del resto del juego.
- El logro de exploración estaba definido sin completarse en la comprobación de logros.
- Se comprobaba la racha final en lugar de la mejor racha para algunos logros.
- El cronómetro se descontaba según el multiplicador de dificultad; su cifra inicial no representaba segundos reales.
- La práctica podía alcanzar lógica educativa/puntos no debidamente aislada.
- No se aportaban herramientas de auditoría, pruebas, documentación ni preparación de despliegue.

## Refactorización real

`GameEngine` recibe opciones y tiempo transcurrido y calcula datos sin navegador. `Player` y `Prism` tienen las reglas propias de sus entidades. `Board`, `Quiz`, `Scoring` y `Difficulty` encapsulan responsabilidades distintas. `InputManager` traduce eventos a acciones; las vistas reflejan snapshots. `Application` coordina navegación y ciclo de vida, mientras `main.js` solo inicia la aplicación.

La persistencia distingue ajustes locales de resultados oficiales. Las peticiones pasan por services HTTP del frontend y por route → controller → service → repository → SQLite en backend. Los logros se derivan de partidas competitivas: no hace falta duplicar su estado en otra tabla.

## Orden de implementación

1. Lectura e inventario de originales.
2. Diagnóstico y decisiones anteriores.
3. Árbol propuesto: frontend modular, backend por capas, scripts, tests y docs.
4. Motor ES6 independiente y módulos de juego.
5. Express, SQLite y validación.
6. Servicios HTTP e interfaz.
7. Persistencia, reintento e historial competitivo.
8. Archivos de configuración, README y checklist.
9. Contenido del documento técnico.
10. Pruebas automatizadas y auditoría honesta de pendientes.
