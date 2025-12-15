import { Exercise } from "@/types";

export const todoListExercise: Exercise = {
  slug: "todo-list-basico",
  title: "Listas y Keys: Renderizando Arrays",
  difficulty: "easy",

  objective:
    "Aprenderás a renderizar listas de elementos usando .map() y a manipular arrays en el estado. Crearás una lista de tareas donde podrás eliminar elementos individuales, entendiendo la importancia de usar keys únicas.",

  steps: [
    "Crea un estado con un array de tareas (cada tarea debe tener un id único y texto)",
    "Usa .map() para renderizar cada tarea en pantalla",
    "Asigna la prop `key` usando el `id` de cada tarea (NO uses el index)",
    "Agrega un botón de eliminar para cada tarea",
    "Implementa la función para eliminar usando .filter() y actualización basada en el estado previo",
  ],

  hints: [
    {
      question: "¿Cómo creo el estado inicial con las tareas?",
      answer: `const [tareas, setTareas] = useState([
  { id: 1, texto: "Aprender React" },
  { id: 2, texto: "Hacer ejercicio" },
  { id: 3, texto: "Leer un libro" }
]);`,
    },
    {
      question: "¿Cómo renderizo la lista de tareas?",
      answer: `tareas.map((tarea) => (
  <div key={tarea.id}>
    <span>{tarea.texto}</span>
    <button>Eliminar</button>
  </div>
))

⚠️ IMPORTANTE: Usa tarea.id como key, NO el index del array.`,
    },
    {
      question: "¿Por qué no debo usar el index como key?",
      answer: `Usar el index como key causa problemas cuando la lista cambia:
- React puede confundirse sobre qué elementos cambió
- Puede causar bugs de renderizado
- El estado de los componentes puede mezclarse

✅ Usa: key={tarea.id}
❌ Evita: key={index}`,
    },
    {
      question: "¿Cómo elimino una tarea específica?",
      answer: `const eliminarTarea = (id) => {
  setTareas(prev => prev.filter(tarea => tarea.id !== id));
};

Luego en el botón:
<button onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>

💡 Usamos "prev =>" para basar la actualización en el estado anterior, esto es más seguro.`,
    },
  ],

  theory: {
    title: "Renderizando Listas en React",
    content: `
**¿Por qué necesitamos keys?**
React usa keys para identificar qué elementos cambiaron, se agregaron o eliminaron. Las keys ayudan a React a actualizar eficientemente el DOM.

**Reglas de las Keys:**
1. Deben ser únicas entre hermanos
2. Deben ser estables (no cambiar entre renders)
3. Deben ser predecibles (no usar Math.random())

**¿Por qué el index es mala práctica?**
Si eliminas el primer elemento de [0, 1, 2], los índices se reordenan:
- Elemento con key=1 ahora es key=0
- React se confunde y puede renderizar mal

**Actualizaciones inmutables:**
Nunca modifiques el array directamente:
❌ tareas.splice(index, 1)
✅ setTareas(tareas.filter(t => t.id !== id))

**setState con función:**
Cuando el nuevo estado depende del anterior, usa la forma funcional:
✅ setTareas(prev => prev.filter(...))
Esto asegura que siempre trabajas con el estado más reciente.
`,
    examples: [
      "// Renderizar lista\nitems.map(item => <div key={item.id}>{item.name}</div>)",
      "// Eliminar elemento\nsetItems(prev => prev.filter(item => item.id !== idToRemove))",
      "// Agregar elemento\nsetItems(prev => [...prev, newItem])",
    ],
  },

  files: {
    "App.js": `import React, { useState } from 'react';

export default function TodoList() {
  // Crea aquí tu estado con un array de tareas
  // Ejemplo: [{ id: 1, texto: "Aprender React" }, ...]
  
  // Función para eliminar tarea
  const eliminarTarea = (id) => {
    // Tu código aquí
  };
  
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '500px' }}>
      <h1>Mi Lista de Tareas</h1>
      <div style={{ marginTop: '20px' }}>
        {/* Renderiza aquí tu lista de tareas usando .map() */}
        {/* Cada tarea debe tener un botón de eliminar */}
      </div>
    </div>
  );
}`,
  },

  aiInstruction: `
El estudiante debe crear una lista de tareas con capacidad de eliminar elementos.

Verifica estrictamente:
1. El estado inicial es un array de objetos con estructura {id: number, texto: string}
2. Usa .map() para renderizar la lista
3. Cada elemento mapeado tiene key={tarea.id} (NO key={index})
4. Implementa una función eliminarTarea que usa .filter()
5. La función de eliminar usa setTareas(prev => prev.filter(...)) con estado previo
6. Cada tarea tiene un botón que llama a eliminarTarea(tarea.id)

⚠️ ADVERTENCIAS CRÍTICAS:
- Si usa key={index}, responde: "❌ Usar el index como key es mala práctica. React puede confundirse cuando la lista cambia. Usa key={tarea.id} en su lugar."
- Si muta el array directamente (ej: tareas.splice()), advierte sobre inmutabilidad
- Si NO usa la forma funcional de setState (prev =>), menciona que es mejor práctica

Si todo está correcto:
{ "aprobado": true, "mensaje": "¡Excelente! Entiendes cómo renderizar listas correctamente con keys únicas y cómo manipular arrays de forma inmutable usando filter()." }

Si hay errores, explica específicamente qué está mal y da una pista constructiva sin dar la solución completa.
`,

  estimatedTime: 10,
  tags: ["lists", "keys", "map", "filter", "state-management"],
};
