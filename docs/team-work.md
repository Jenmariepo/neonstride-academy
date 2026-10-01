# Trabajo de dos integrantes y defensa

## Distribución recomendada, no historial atribuido

| Responsable  | Trabajo que debe realizar y explicar                                                                                               |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| Integrante A | Estudiar y ajustar motor, tablero, reloj, dificultad, entidades e input. Ejecutar y ampliar pruebas con una mejora real.           |
| Integrante B | Estudiar y ajustar API, SQLite, validación, repositorios, leaderboard y despliegue. Ejecutar pruebas y completar documentación.    |
| Ambos        | Revisar el código del otro, verificar interfaz en dispositivos, realizar una partida completa, preparar video y practicar defensa. |

La base entregada sirve para estudiar y desarrollar; no sustituye aportaciones reales. No atribuyan el código ni commits generados automáticamente a un integrante como si hubiese realizado una modificación que no hizo.

## Git

Crear un repositorio propio, configurar cada autor con su identidad real y trabajar en ramas. Revisar `git status` antes de añadir archivos; `.env`, bases y `node_modules` están ignorados. Cada integrante debe hacer commits propios sobre cambios que haya realizado. Se ha ejecutado `git init -b main` en la carpeta de trabajo. El commit inicial registra la importación del proyecto generado con asistencia de IA, bajo la identidad de Jenmarie Polanco y con su autorización. No acredita por sí solo aportes individuales de ambos integrantes; estos deben documentarse mediante cambios reales posteriores. Si usan el ZIP, deben inicializar su propia copia porque no incluye .git.

Ejemplos de aportaciones posibles: mejorar un banco de preguntas con fuentes revisadas, ajustar el equilibrio de PRISM tras pruebas de usuarios, ampliar pruebas de límites, mejorar foco del teclado o completar una guía de despliegue tras publicarlo realmente.

## Guion del video · 7 minutos

| Minuto    | Demostración                                                         |
| --------- | -------------------------------------------------------------------- |
| 0:00–0:40 | Nombre, integrantes, objetivo y concepto.                            |
| 0:40–1:40 | Perfil, modos, dificultad, acierto/error y PRISM.                    |
| 1:40–2:30 | Pausa, pista, recuperación y práctica.                               |
| 2:30–3:20 | Resultados, récords persistentes, logros y configuración.            |
| 3:20–4:30 | Integrante A explica motor, input, vistas y constantes.              |
| 4:30–5:40 | Integrante B explica ruta, controller, service, repository y SQLite. |
| 5:40–6:30 | Pruebas, auditoría, validación y reinicio conservando datos.         |
| 6:30–7:00 | Conclusiones, enlace público y participación de ambos.               |

## Preguntas para ambos

1. ¿Por qué el motor se puede probar sin `document`?
2. ¿Cómo se garantiza que hay exactamente una respuesta distinta?
3. ¿Qué sucede si se hace doble clic o se pausa durante una pregunta?
4. ¿Qué cambia entre un repository y un service?
5. ¿Por qué no basta con guardar récords en `localStorage`?
6. ¿Por qué `submission_id` evita duplicados tras un fallo de conexión?
7. ¿Cómo se excluye práctica en el servidor?
8. ¿Qué limita la validación actual y qué requeriría un sistema antitrampas?
9. ¿Dónde se configura cada dificultad y cómo se calculan bonus y precisión?
10. ¿Qué ocurre con SQLite si el despliegue no tiene volumen persistente?

**Pendiente:** repositorio, aportaciones y commits verificables, capturas, URL pública, video de 5–8 minutos y defensa individual.
