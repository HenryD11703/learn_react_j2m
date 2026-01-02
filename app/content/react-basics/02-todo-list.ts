import { Exercise } from "@/types";

export const todoListExercise: Exercise = {
  slug: "todo-list-basico",
  title: "Listas y Keys: Renderizando Arrays",
  difficulty: "easy",

  objective:
    "Aprenderás a transformar arreglos de datos en elementos visuales usando .map() y a manipular el estado de forma inmutable para eliminar elementos.",

  steps: [
    "Define un estado inicial con un arreglo de objetos (cada uno con `id` y `texto`).",
    "Usa el método `.map()` para recorrer el arreglo y devolver JSX por cada tarea.",
    "Asigna una `key` única a cada elemento de la lista usando el `id` del objeto.",
    "Implementa una función para eliminar tareas que filtre el arreglo basándose en el `id`.",
    "Asegúrate de actualizar el estado usando la forma funcional (`prev => ...`).",
  ],

  hints: [
    {
      question: "¿Cómo debe verse mi estado inicial?",
      answer: `Puedes empezar con algo así:
const [tareas, setTareas] = useState([
  { id: 1, texto: "Aprender React" },
  { id: 2, texto: "Hacer ejercicio" }
]);`,
    },
    {
      question: "¿Cómo uso .map() dentro del return?",
      answer: `Recuerda envolver la lógica entre llaves {}:
{tareas.map((tarea) => (
  <div key={tarea.id}>
    {tarea.texto}
  </div>
))}`,
    },
    {
      question: "¿Cuál es la forma más segura de eliminar un elemento?",
      answer: `Usa .filter() para crear un nuevo arreglo sin el elemento que quieres quitar:
const nuevaLista = tareas.filter(t => t.id !== idAEliminar);

💡 Tip: Para mayor seguridad en React, usa la función de actualización:
setTareas(prevTareas => prevTareas.filter(...));`,
    },
  ],

  theory: {
    title: "Renderizado de Listas y el Poder de las Keys",
    introduction:
      "En las aplicaciones modernas, casi toda la información viene en forma de listas (mensajes, productos, tareas). React necesita una forma eficiente de saber qué elemento ha cambiado o desaparecido sin tener que volver a dibujar toda la lista desde cero.",
    goodPractices: [
      "El método .map(): Es el estándar en React para transformar datos en componentes.",
      "Keys únicas: Usar identificadores estables (IDs de base de datos o UUIDs).",
      "Inmutabilidad: Usar métodos que devuelven un nuevo arreglo como `.filter()` o `.map()` en lugar de modificar el original.",
    ],
    badPractices: [
      "Usar el 'index' como key: Si la lista se reordena o se elimina un elemento, los índices cambian y React puede mezclar el estado de componentes diferentes.",
      "Mutar el estado: Nunca uses `push()`, `pop()` o `splice()` directamente sobre el estado.",
      "Keys aleatorias: Generar una key con `Math.random()` en el render causará que toda la lista se destruya y recree en cada actualización.",
    ],
    examples: [
      "// Eliminar con filter\nsetItems(prev => prev.filter(i => i.id !== targetId));",
      "// Estructura de objeto recomendada\n{ id: crypto.randomUUID(), texto: 'Tarea' }",
    ],
  },

  files: {
    "App.js": `import React, { useState } from 'react';

export default function TodoList() {
  // 💡 Tip: Inicializa tu estado con algunas tareas de prueba
  const [tareas, setTareas] = useState([
    { id: 1, texto: "Aprender .map()" },
    { id: 2, texto: "Entender las Keys" }
  ]);

  const eliminarTarea = (id) => {
    // 💡 Tip: Usa .filter() y recuerda la inmutabilidad
  };
  
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '500px' }}>
      <h1>Mi Lista de Tareas</h1>
      <div style={{ marginTop: '20px' }}>
        {/* Renderiza aquí tus tareas */}
        {/* Cada tarea debe tener su botón de eliminar */}
      </div>
    </div>
  );
}`,
  },

  aiInstruction: `
El estudiante debe renderizar una lista dinámica y permitir la eliminación de elementos.

LISTA DE CHEQUEO:
1. ¿Usa .map() para iterar sobre el array de tareas?
2. ¿Asignó una key? 
   - Si usó el index, explícale que esto causará problemas de renderizado.
3. ¿La función de eliminar es inmutable?
   - Si usó .splice(), dile que use .filter().
4. ¿Usó la forma funcional en el set? (prev => ...)
`,

  estimatedTime: 12,
  tags: ["arrays", "map", "keys", "inmutabilidad"],
};
