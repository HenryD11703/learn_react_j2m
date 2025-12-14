// app/content/react-basics/01-contador.ts
import { Exercise } from "@/types";

export const contadorExercise: Exercise = {
  slug: "contador-simple",
  title: "Intro: El Estado en React",
  difficulty: "junior",

  // Contenido estructurado
  objective:
    "Vamos a empezar por lo básico. Los componentes en React necesitan 'recordar' cosas. En este ejercicio aprenderás a usar useState para crear un contador interactivo.",

  steps: [
    "Importa `useState` desde React",
    "Crea un estado inicializado en 0 usando `useState`",
    "Muestra el número del contador en pantalla dentro del `<h1>`",
    "Agrega un botón que incremente el contador en +1 al hacer click",
  ],

  hints: [
    {
      question: "¿Cómo importo useState?",
      answer: "import { useState } from 'react';",
    },
    {
      question: "¿Cómo creo el estado?",
      answer:
        "const [contador, setContador] = useState(0);\n\nEl primer valor (contador) es la variable que contiene el estado actual.\nEl segundo (setContador) es la función para actualizarlo.",
    },
    {
      question: "¿Cómo actualizo el estado al hacer click?",
      answer:
        "onClick={() => setContador(contador + 1)}\n\nNunca hagas contador++ directamente, eso es mutación y React no detectará el cambio.",
    },
  ],

  theory: {
    title: "¿Qué es useState?",
    content: `
useState es un Hook que te permite agregar estado a tus componentes funcionales.

**¿Qué es el estado?**
El estado es información que tu componente "recuerda" entre renders. Por ejemplo:
- Un contador que va aumentando
- Si un modal está abierto o cerrado
- El texto que el usuario escribió en un input

**Sintaxis básica:**
\`\`\`javascript
const [variable, setVariable] = useState(valorInicial);
\`\`\`

**Reglas importantes:**
1. Solo puedes llamar Hooks en el nivel superior del componente
2. No modifiques el estado directamente (❌ contador++)
3. Usa la función set para actualizar (✅ setContador(contador + 1))
`,
    examples: [
      "const [count, setCount] = useState(0);",
      "const [isOpen, setIsOpen] = useState(false);",
      "const [text, setText] = useState('');",
    ],
  },

  // Configuración técnica
  startingCode: `import React from 'react';

export default function Contador() {
  // 👻 Tu código va aquí
  
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Contador: ???</h1>
      {/* Agrega tu botón aquí */}
    </div>
  );
}`,

  aiInstruction: `
El estudiante debe crear un contador simple usando useState.

Verifica que:
1. Importe useState correctamente desde React
2. Declare el estado con useState(0) o similar
3. Muestre el valor del estado en el JSX
4. Tenga un botón con onClick que use la función set del estado
5. NO mute el estado directamente (ej: count++ está prohibido)

Si todo está correcto, responde con:
{ "aprobado": true, "mensaje": "¡Perfecto! Entiendes cómo funciona useState. El contador funciona correctamente." }

Si hay errores, explica qué está mal y da una pista constructiva.
`,

  estimatedTime: 5,
  tags: ["hooks", "useState", "eventos"],
};
