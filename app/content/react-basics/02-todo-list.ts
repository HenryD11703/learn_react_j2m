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
    content: `
**¿Por qué es importante?**
En las aplicaciones modernas, casi toda la información viene en forma de listas (mensajes, productos, tareas). React necesita una forma eficiente de saber qué elemento ha cambiado o desaparecido sin tener que volver a dibujar toda la lista desde cero.

**1. Técnicas comunes:**
- **El método .map():** Es el estándar en React para transformar datos en componentes.
- **Keys únicas:** Usar identificadores estables (IDs de base de datos o UUIDs).
- **Inmutabilidad:** Usar métodos que devuelven un nuevo arreglo como \`.filter()\` o \`.map()\` en lugar de modificar el original.

**2. Anti-patrones comunes:**
- ❌ **Usar el "index" como key:** Si la lista se reordena o se elimina un elemento, los índices cambian y React puede mezclar el estado de componentes diferentes.
- ❌ **Mutar el estado:** Nunca uses \`push()\`, \`pop()\` o \`splice()\` directamente sobre el estado.
- ⚠️ **Keys aleatorias:** Generar una key con \`Math.random()\` en el render causará que toda la lista se destruya y recree en cada actualización.

**3. Ventajas de las buenas prácticas:**
- **Rendimiento:** React solo actualiza el elemento exacto que cambió.
- **Consistencia:** Evitas errores visuales donde el texto de una tarea se queda en el input de otra tras eliminar.
- **Mantenibilidad:** Tu lógica de datos es predecible y fácil de seguir.

**4. Ejemplos de código:**

✅ **Correcto (Uso de ID estable):**
\`\`\`javascript
{items.map(item => (
  <li key={item.id}>{item.name}</li>
))}
\`\`\`

❌ **Incorrecto (Uso de Index):**
\`\`\`javascript
{items.map((item, index) => (
  <li key={index}>{item.name}</li>
))}
\`\`\`
`,
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
   - ❌ Si usó el index: "⚠️ Estás usando el index como key. Esto causará problemas de renderizado. Usa mejor el tarea.id."
3. ¿La función de eliminar es inmutable?
   - ❌ Si usó .splice(): "⚠️ No uses .splice(), ya que modifica el array original. Usa .filter() para crear uno nuevo."
4. ¿Usó la forma funcional en el set? (prev => ...)
   - 💡 Si no lo hizo: "Tip: Cuando el nuevo estado depende del anterior (como en una lista), es más seguro usar setTareas(prev => ...)."

MENSAJE DE APROBACIÓN:
{ "aprobado": true, "mensaje": "✅ ¡Excelente! Has dominado el renderizado de listas. El uso de keys únicas y métodos inmutables es fundamental para el rendimiento en React." }
`,

  estimatedTime: 12,
  tags: ["arrays", "map", "keys", "inmutabilidad"],
};
