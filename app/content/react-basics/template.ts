import { Exercise } from "@/types";
// Usar estos iconos ⚠️ ❌ ✅ para poner lo que esta bien o mal... o lo que dara problemas
// este para tips dentro del codigo, no los hints directamente 💡
export const TemplateExercise: Exercise = {
  slug: "nombre-del-ejercicio",
  title: "Título del Ejercicio",
  difficulty: "easy", // "easy" | "medium" | "hard"

  objective: "Describe el objetivo principal (ej: 'Aprenderás a optimizar re-renders usando useMemo').",

  steps: [
    "Paso 1: Describe la primera acción concreta.",
    "Paso 2: Describe la siguiente acción.",
    "Paso 3: Sé imperativo y claro.",
  ],

  hints: [
    {
      question: "¿Pregunta común que podría tener el estudiante?",
      answer: "Respuesta clara y concisa. Puedes usar markdown simple.",
    },
    {
      question: "💡 Tip: ¿Cómo debuggear?",
      answer: "Usa console.log o herramientas de desarrollo.",
    },
  ],

  // TEORÍA: Lo nuevo añadido recientemente
  theory: {
    title: "Título del Concepto Teórico",
    introduction:
      "Breve introducción al concepto. Explica EL PORQUÉ es importante antes del CÓMO.",
    goodPractices: [
      "Práctica recomendada 1: Explicación breve.",
      "Práctica recomendada 2: Explicación breve.",
    ],
    badPractices: [
      "Anti-patrón 1: Qué evitar y por qué.",
      "Anti-patrón 2: Ejemplo de código sucio o ineficiente.",
    ],
    examples: [
      "// Ejemplo de código bueno\nconst good = useMemo(() => heavy(a), [a]);",
      "// Ejemplo visual o sintaxis clave\n<Component prop={value} />",
    ],
  },

  files: {
    "App.js": `import React from 'react';

export default function App() {
  return (
    <div>
      <h1>Hola Mundo</h1>
    </div>
  );
}`,
    // Puedes añadir más archivos si es necesario
    // "utils.js": "export const sum = (a, b) => a + b;"
  },

  // Instrucciones para la IA (Prompt Engineering para el mentor)
  aiInstruction: `
El estudiante debe resolver el ejercicio siguiendo estos criterios:

1. Validar que use X hook correctamente.
2. Validar que no cometa Y error común.
3. Asegurarse de que el componente renderice Z.

Si encuentra errores de tipo A, sugiereles B.
`,

  estimatedTime: 15, // en minutos
  tags: ["tag1", "tag2", "concept"],
};

// Tambien para futuros ejercicios hay archivos que pueden estar ocultos
// Consultar el tipo Exercise en /types/index.ts para mas detalles
// Y seria para ejercicios en los que el estudiante no debe ver todo el codigo
// Por ejemplo un ejercicio de optimizacion donde el estudiante debe mejorar
// un codigo ya existente, pero no ver todo el codigo fuente
