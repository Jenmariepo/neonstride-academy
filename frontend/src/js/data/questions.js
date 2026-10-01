const THIRD_OPTION = 2;
const QUESTION_ROWS = [
  [
    'Informática',
    '¿Cuál es el cerebro de una computadora?',
    ['Monitor', 'CPU', 'Teclado', 'Impresora'],
    1,
  ],
  ['Matemáticas', '¿Cuál es el resultado de 7 × 8?', ['54', '56', '63', '48'], 1],
  [
    'Ciencias',
    '¿Qué planeta es conocido como el planeta rojo?',
    ['Venus', 'Marte', 'Júpiter', 'Mercurio'],
    1,
  ],
  ['Inglés', '¿Cómo se dice “libro” en inglés?', ['Book', 'Bridge', 'Blue', 'Bottle'], 0],
  ['Historia', '¿En qué año llegó el ser humano a la Luna?', ['1959', '1969', '1979', '1989'], 1],
  ['Ciencias', '¿Qué gas predomina en la atmósfera?', ['Oxígeno', 'Nitrógeno', 'Helio', 'CO₂'], 1],
  ['Informática', '¿Qué estructura usa LIFO?', ['Cola', 'Pila', 'Árbol', 'Grafo'], 1],
  [
    'Cultura General',
    '¿Cuál es el océano más grande?',
    ['Atlántico', 'Índico', 'Pacífico', 'Ártico'],
    THIRD_OPTION,
  ],
  ['Matemáticas', '¿Cuánto es el 15% de 200?', ['15', '30', '45', '60'], 1],
  ['Inglés', '¿Qué significa “bright”?', ['Rápido', 'Brillante', 'Silencioso', 'Antiguo'], 1],
];
export const QUESTIONS = QUESTION_ROWS.map(([category, text, options, answer]) => ({
  category,
  text,
  options,
  answer,
}));
