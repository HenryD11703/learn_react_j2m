import { Exercise } from "@/types";

export const contadorExercise: Exercise = {
  slug: "contador-simple",
  title: "Intro: El Estado en React",
  difficulty: "easy",

  objective:
    "Aprenderás a usar el Hook useState para que tus componentes puedan 'recordar' y actualizar información en tiempo real.",

  steps: [
    "Importa el Hook `useState` directamente desde la librería de React.",
    "Declara una variable de estado inicializada en 0.",
    "Renderiza el valor actual del contador dentro de la etiqueta `<h1>`.",
    "Crea un botón que, al ser clickeado, ejecute la función de actualización para sumar +1.",
  ],

  hints: [
    {
      question: "¿Cómo importo el Hook de forma limpia?",
      answer:
        "Es mejor importar el Hook específicamente para evitar escribir 'React.' cada vez:\n\n`import { useState } from 'react';`",
    },
    {
      question: "No sé cómo funciona la destructuración del useState",
      answer:
        "La sintaxis es: `const [valor, setValor] = useState(inicial);` \n\n💡 Piensa en 'valor' como la foto actual y 'setValor' como el control remoto para cambiar esa foto.",
    },
    {
      question: "¿Por qué no puedo usar contador++?",
      answer:
        "En React, el estado es inmutable. Si haces `contador++`, React no se entera de que algo cambió. Debes usar la función set: `setContador(contador + 1)` para que React sepa que debe re-renderizar la pantalla.",
    },
  ],

  theory: {
    title: "El corazón de React: useState",
    content: `
**¿Por qué es importante?**
En una página web normal, las variables desaparecen cuando la función termina. El **Estado** es una memoria especial que tiene React para que tus componentes no "olviden" lo que el usuario está haciendo mientras navega.

**1. Técnicas comunes:**
- **Importación directa:** Usamos \`{ useState }\` para que el código sea más legible.
- **Estado inicial:** Siempre define un valor coherente (si es un contador, empieza en \`0\`).
- **Actualización reactiva:** Usar la función \`set\` dispara automáticamente una actualización de la interfaz.

**2. Anti-patrones comunes:**
- ❌ **Mutación directa:** Nunca hagas \`state = nuevoValor\`. Esto rompe el ciclo de vida de React.
- ⚠️ **Uso de React.useState:** Aunque funciona, es menos común y hace el código más pesado de leer. Es preferible importar el hook directamente.
- ❌ **Declarar Hooks en condicionales:** Los Hooks siempre van en la parte de arriba de tu componente, fuera de cualquier \`if\` o \`for\`.

**3. Ventajas de las buenas prácticas:**
- Tu código es más fácil de testear.
- Evitas bugs donde la pantalla no se actualiza aunque los datos cambien.
- Sigues el estándar que usan las empresas modernas.

**4. Ejemplos de código:**

✅ **Correcto (Limpio y legible):**
\`\`\`javascript
import { useState } from 'react';

const [count, setCount] = useState(0);
// Uso: setCount(count + 1);
\`\`\`

⚠️ **Evitar (Aunque sea válido):**
\`\`\`javascript
import React from 'react';

const [count, setCount] = React.useState(0);
\`\`\`
`,
    examples: [
      "// Definir estado inicial\nconst [score, setScore] = useState(0);",
      "// Actualizar basado en el anterior\n<button onClick={() => setScore(score + 1)}>Punto!</button>",
    ],
  },

  files: {
    "App.js": `import React from 'react';
// 💡 Tip: Importa useState aquí arriba

export default function Contador() {
  // 1. Crea tu estado aquí
  
  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>Contador: { /* 2. Muestra el estado aquí */ }</h1>
      
      {/* 3. Agrega el botón con su evento onClick */}
      <button>Incrementar</button>
    </div>
  );
}`,
  },

  aiInstruction: `
El estudiante debe implementar un contador funcional siguiendo las mejores prácticas de React.

LISTA DE CHEQUEO:
1. ¿Importó { useState } de 'react'? 
   - ⚠️ Si usa 'React.useState', dile: "💡 Tu código funciona, pero es mejor práctica importar { useState } directamente para que sea más limpio."
2. ¿Declaró correctamente [count, setCount]?
3. ¿El botón tiene el evento onClick?
4. ¿Evitó mutaciones como count++ o count = count + 1?
   - ❌ Si mutó el estado: "⚠️ ¡Cuidado! No modifiques la variable directamente. Usa la función setContador para que React pueda actualizar la pantalla."

MENSAJE DE APROBACIÓN:
{ "aprobado": true, "mensaje": "✅ ¡Excelente trabajo! Has dominado el concepto de estado. Recuerda siempre usar la función set para que React mantenga la interfaz sincronizada." }
`,

  estimatedTime: 10,
  tags: ["hooks", "useState", "principiante"],
};
