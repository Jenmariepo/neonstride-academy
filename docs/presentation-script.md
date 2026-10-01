# Guion de presentación y defensa

Duración objetivo: siete minutos. Los tiempos son una pauta para ensayar; el video debe mostrar la aplicación real y la voz de ambos integrantes. Sustituir los nombres antes de grabar.

## 0:00 a 0:40 · Presentación · Integrante A

«Somos Diego Heredia y Jenmarie Polanco. Presentamos ¿DÓNDE ESTÁ? × NEONSTRIDE, un videojuego de percepción visual. Cada ronda tiene muchos elementos iguales y uno distinto. Debemos encontrarlo mientras PRISM avanza hacia la meta. Nuestro objetivo técnico fue separar el motor, la interfaz y la persistencia para que el juego sea mantenible y comprobable.»

Mostrar el menú y el perfil. Explicar únicamente las funciones visibles; no afirmar que está publicado si todavía se utiliza localhost.

## 0:40 a 1:40 · Partida · Integrante A

«Podemos elegir letras, emojis o mezcla y cuatro dificultades. Los tiempos iniciales son 20, 15, 11 y 8 segundos. Un acierto suma puntos, mantiene la racha y avanza en la carrera. Un error resta puntos y una vida. La precisión es el porcentaje de aciertos sobre todos los intentos.»

Iniciar una partida, acertar, fallar y usar una pista. Mostrar puntos, vidas, racha y precisión. Pulsar P, esperar unos segundos y continuar para demostrar que la pausa congela la partida.

## 1:40 a 2:30 · Progresión y recuperación · Integrante B

«Cada tres aciertos subimos de nivel. PRISM acelera con una curva creciente y nuestros aciertos lo frenan menos. El tablero crece hasta ocho por ocho y el tiempo baja hasta cuatro segundos. Si PRISM llega primero o perdemos las vidas, aparece una pregunta educativa. Tenemos dos oportunidades por partida. Acertar garantiza al menos una vida y devuelve a PRISM al 35 %, conservando el nivel.»

Mostrar una recuperación real. Si durante el ensayo no aparece a tiempo, preparar otra partida para esa toma; no alterar el motor para fingir el resultado.

## 2:30 a 3:20 · Persistencia y práctica · Integrante B

«Al terminar, el resultado se envía al backend. Los récords y el TOP 5 se consultan en SQLite, no dependen solo del navegador. Cada piloto aparece una vez en la clasificación. La práctica guarda su condición de entrenamiento y queda excluida de récords, logros y partidas competitivas. Las preferencias personales sí se conservan localmente.»

Mostrar el mensaje de guardado, el TOP 5 y los logros. Recargar y consultar otra vez los récords. Mostrar práctica sin cronómetro ni pérdida de vidas.

## 3:20 a 4:30 · Frontend · Integrante A

«main.js es el punto de entrada. GameEngine recibe acciones y tiempo; no busca elementos HTML. Player y Prism son entidades. Board crea la cuadrícula, Difficulty calcula la progresión y Scoring calcula puntuaciones. InputManager convierte clics y teclas en acciones. Las vistas leen los datos del motor y actualizan el DOM.»

Abrir esos archivos y señalar un ejemplo breve: `select`, `difficultyFor` y el registro de eventos. Explicar por qué un cambio visual no exige modificar las reglas del juego.

## 4:30 a 5:40 · Backend y base · Integrante B

«La petición recorre ruta, controller, service y repository antes de llegar a SQLite. El controller maneja HTTP; el service valida y autoriza; el repository ejecuta SQL parametrizado. Los nombres, modos, dificultades y estadísticas se validan. La precisión la calcula el servidor. Un identificador único de envío evita duplicar la partida cuando reintentamos después de un fallo de conexión.»

Mostrar `/api/games`, el service y el INSERT con parámetros. Señalar las claves de `players` y `games`. No mostrar tokens reales, `.env` ni información de otras cuentas.

## 5:40 a 6:30 · Calidad y límites · Ambos

«La versión comprobada supera 31 pruebas. El análisis automático controla archivos de hasta 300 líneas y funciones de hasta 40; ESLint revisa la anidación y Prettier el formato. También probamos validación, pausa, recuperación y reintento. La validación de estadísticas no constituye un sistema antitrampas completo: para eso habría que validar las entradas de la partida en el servidor.»

Ejecutar `npm run check` y mostrar el resultado actual. No repetir un número antiguo si nuevas pruebas han cambiado el total. Mostrar capturas o una prueba real de dispositivos solo después de haberlas realizado.

## 6:30 a 7:00 · Cierre · Ambos

«El proyecto integra lógica de juego, una interfaz configurable y una API con persistencia. La separación de responsabilidades nos permite estudiar, probar y mejorar cada parte. [Cada integrante explica en una frase su aportación real.] El repositorio y la demostración están en [ENLACES VERIFICADOS].»

Si todavía falta el despliegue, decirlo y demostrar la ejecución local. No inventar enlaces, contribuciones ni commits.

## Respuestas breves para ensayar

| Pregunta                              | Respuesta que deben poder desarrollar                                                           |
| ------------------------------------- | ----------------------------------------------------------------------------------------------- |
| ¿Por qué no hay DOM en el motor?      | Permite probar reglas sin navegador y cambiar la interfaz de forma independiente.               |
| ¿Cómo hay un solo intruso?            | Se elige un par de símbolos y un único índice aleatorio; solo esa posición recibe el diferente. |
| ¿Qué evita el doble clic?             | La primera selección cambia la fase; las siguientes se ignoran mientras se muestra el feedback. |
| ¿Cómo se pausan las preguntas?        | El motor no consume tiempo mientras está pausado, también en la fase de quiz.                   |
| ¿Por qué SQLite?                      | Es persistente, relacional y sencilla de demostrar sin instalar un servidor adicional.          |
| ¿Qué evita la inyección SQL?          | Los valores se vinculan como parámetros y nunca se concatenan como SQL.                         |
| ¿Por qué no basta localStorage?       | No ofrece una clasificación compartida y persistente en servidor.                               |
| ¿Qué ocurre si falla la red?          | Se conserva un envío pendiente y se reintenta con el mismo identificador único.                 |
| ¿Cómo se excluye práctica?            | Las consultas y estadísticas del backend filtran las partidas competitivas.                     |
| ¿Cómo se conserva la BD al desplegar? | Se coloca el archivo SQLite en un volumen persistente, fuera del almacenamiento efímero.        |
