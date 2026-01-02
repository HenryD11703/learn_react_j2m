import { Exercise } from "@/types";
// Usar estos iconos ⚠️ ❌ ✅ para poner lo que esta bien o mal... o lo que dara problemas
// este para tips dentro del codigo, no los hints directamente 💡
export const Example: Exercise = {
  slug: "nombre slug para la ruta",
  title: "titulo",
  difficulty: "easy",

  objective: "Empieza con un verbo asi como Aprenderás, o Optimizarás.",

  steps: [
    "Aca pones los pasos que el estudiante debe seguir para completar el ejercicio.",
    "Cada paso debe ser claro y concreto.",
    "Usa verbos en imperativo.",
    "No des demasiados detalles, solo lo necesario para guiar al estudiante.",
  ],

  hints: [
    {
      question:
        "¿Como hago algo... aca pon una pregunta que el estudiante podria tener",
      answer: `Aqui pones la respuesta a la pregunta anterior, puede incluir codigo si es necesario.`,
    },
    {
      question:
        "mas pistas que el estudiante podria necesitar, un ejemplo abajo:",
      answer: `Usa un objeto de mapeo:

const configs = {
  success: { color: 'green', icono: '✓', mensaje: 'Operación exitosa' },
  error: { color: 'red', icono: '✗', mensaje: 'Error al procesar' },
  loading: { color: 'orange', icono: '⟳', mensaje: 'Cargando...' }
};

Luego accede: configs[status].mensaje`,
    },
    {
      question: "¿Cuándo uso ternarios vs && ?",
      answer: `// Ternario: cuando hay dos opciones
{isLoggedIn ? <Dashboard /> : <Login />}

// &&: cuando solo renderizas si es true
{hasError && <ErrorMessage />}

// Objeto de mapeo: cuando hay 3+ opciones
{statusConfig[status].component}`,
    },
  ],

  theory: {
    // Aca va la teoria, todo lo que el estudiante debe aprender antes de hacer el ejercicio
    title: "Renderizado Condicional en React",
    // El contenido tiene que estar en markdown
    // Y contendra texto que explique el porque y como se usa el tema del ejercicio
    // Contiene ejemplos de codigo en bloques de ```javascript con el escape correcto
    // Utilizar los iconos de advertencia y correcto donde sea necesario

    // El orden tiene que ser
    // 1. Explicacion del tema
    // 2. Tecnicas comunes
    // 3. Anti-patrones comunes
    // 4. Ventajas de las buenas practicas
    // 5. Ejemplos de codigo

    // Si no se puede cumplir el patron por el tema del ejercicio esta bien, pero explicarlo
    introduction:
      "El renderizado condicional te permite mostrar diferentes UI según el estado de tu aplicación. Es fundamental para crear experiencias dinámicas.",
    goodPractices: [
      "Operador Ternario (? :): Perfecto para elegir entre dos opciones. Sintaxis: condición ? valorSiTrue : valorSiFalse",
      "Operador AND (&&): Renderiza solo si la condición es true. Sintaxis: condición && <Componente />",
      "Objetos de Mapeo: Ideal para 3+ estados diferentes. Evita 'spaghetti code' con muchos if/else.",
    ],
    badPractices: [
      "If/Else en JSX: No puedes usar bloques if/else dentro del JSX. Usa ternarios o funciones auxiliares.",
      "Anidación excesiva: Evita ternarios anidados (ternary hell). Mejor extrae la lógica a un componente o variable.",
    ],
    examples: [
      "// Ternario\n{isOnline ? <GreenDot /> : <GrayDot />}",
      "// AND operator\n{showModal && <Modal />}",
      "// Objeto de mapeo\nconst icons = { success: '✓', error: '✗' };\n<span>{icons[status]}</span>",
      "// Estilos dinámicos\nstyle={{ color: status === 'error' ? 'red' : 'green' }}",
    ],
  },
  // Esto son los archivos que el estudiante vera y editara
  // Puedes añadir multiples archivos si es necesario
  files: {
    "App.js": `import React, { useState } from 'react';

    export default function TodoList() {
    // Tu código aquí
    
    return (
        <div>
           <h1>Mi App</h1>
        </div>
    );
    }`,
  },
  // Esta es la instruccion para la IA que revisara el codigo del estudiante
  // NO incluyas formato JSON ni emojis aqui, solo la logica de revision
  aiInstruction: `
El estudiante debe crear un componente con renderizado condicional limpio.

Verifica que:
1. Tenga un estado con al menos 3 valores posibles
2. Use un objeto de mapeo/configuración en lugar de múltiples if/else
3. Renderice dinámicamente el contenido

Si hay errores de patrón (como if/else en JSX), señálalos claramente.
`,
  // La respuesta de la IA se puede especificar aqui tambien, pero la IA siempre devolvera un JSON con la estructura
  // { aprobado: boolean, mensaje: string }
  // estimatedTime es el tiempo estimado en minutos que le tomara al estudiante completar el ejercicio
  estimatedTime: 12,
  // tags son las etiquetas que ayudan a categorizar el ejercicio
  tags: ["choose", "the", "tags"],
};

// Tambien para futuros ejercicios hay archivos que pueden estar ocultos
// Consultar el tipo Exercise en /types/index.ts para mas detalles
// Y seria para ejercicios en los que el estudiante no debe ver todo el codigo
// Por ejemplo un ejercicio de optimizacion donde el estudiante debe mejorar
// un codigo ya existente, pero no ver todo el codigo fuente
