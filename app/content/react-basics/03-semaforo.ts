import { Exercise } from "@/types";

export const semaforoExercise: Exercise = {
  slug: "renderizado-condicional",
  title: "Renderizado Condicional: El Semáforo",
  difficulty: "easy",

  objective:
    "Aprenderás a mostrar diferentes elementos de la interfaz según el estado de la aplicación, utilizando técnicas limpias como el Operador Ternario, el cortocircuito (&&) y Objetos de Mapeo.",

  steps: [
    "Crea un estado llamado `status` inicializado en 'loading'.",
    "Define un objeto de configuración (fuera del return) que asocie cada estado ('success', 'error', 'loading') con un color, un icono y un mensaje.",
    "Aplica estilos dinámicos al contenedor principal usando el color del estado actual.",
    "Renderiza el icono y el mensaje accediendo a tu objeto de configuración.",
    "Crea botones que permitan al usuario cambiar el estado manualmente para probar la reactividad.",
  ],

  hints: [
    {
      question: "¿Cómo defino el objeto de configuración?",
      answer: `Es una buena práctica definirlo así:
const CONFIGS = {
  success: { color: '#2ecc71', icon: '✅', text: '¡Todo salió bien!' },
  error: { color: '#e74c3c', icon: '❌', text: 'Hubo un error' },
  loading: { color: '#f1c40f', icon: '⏳', text: 'Cargando...' }
};`,
    },
    {
      question: "¿Cómo accedo a los datos del objeto dinámicamente?",
      answer: `Si tu estado se llama 'status', puedes acceder a la configuración así:
      
const currentConfig = CONFIGS[status];
// Luego usas: currentConfig.color o currentConfig.text`,
    },
    {
      question: "¿Qué pasa si quiero mostrar algo solo en un caso?",
      answer: `Para eso usa el operador && (AND):
{status === 'loading' && <Spinner />}

💡 Esto solo renderizará el Spinner si la condición de la izquierda es verdadera.`,
    },
  ],

  theory: {
    title: "Renderizado Condicional Eficiente",
    introduction:
      "En una aplicación real, las interfaces no son estáticas. Necesitas mostrar un mensaje de carga mientras llegan los datos, o un error si algo falla. El renderizado condicional permite que tu UI sea una 'función de tu estado'.",
    goodPractices: [
      "Operador Ternario (`? :`): Ideal para elegir entre dos opciones (ej. botón de Login vs Logout).",
      "Cortocircuito (`&&`): Perfecto para mostrar algo o nada.",
      "Objetos de Mapeo (Lookup Tables): La técnica más limpia cuando tienes 3 o más estados posibles. Evita que tu código se llene de lógica compleja.",
    ],
    badPractices: [
      "Usar `if/else` dentro del return: JSX no permite sentencias de control de flujo directas, solo expresiones.",
      "Ternarios anidados: Hacer `condicion ? (otra ? a : b) : c` es muy difícil de leer y mantener.",
      "Lógica pesada en el JSX: No calcules datos complejos dentro de los paréntesis del `return`. Hazlo arriba y solo renderiza el resultado.",
    ],
    examples: [
      "// Operador &&\n{isAdmin && <AdminPanel />}",
      "// Ternario\n{isLogged ? <UserMenu /> : <LoginBtn />}",
      "// Acceso dinámico a objeto\nconst icon = ICONS[status];",
    ],
  },

  files: {
    "App.js": `import React, { useState } from 'react';

export default function Semaforo() {
  // 1. Crea el estado 'status' (inicia en 'loading')

  // 2. Define tu objeto de configuración CONFIGS
  
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>Estado del Sistema</h1>
      
      {/* 3. El contenedor debe cambiar su color de fondo */}
      <div style={{ 
        padding: '30px', 
        borderRadius: '12px',
        marginTop: '20px',
        transition: 'all 0.3s ease'
      }}>
        {/* 4. Muestra aquí el icono y el mensaje */}
      </div>
      
      {/* 5. Agrega los botones para cambiar el estado */}
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button>Éxito</button>
        <button>Error</button>
        <button>Cargando</button>
      </div>
    </div>
  );
}`,
  },

  aiInstruction: `
El estudiante debe implementar un sistema de estados tipo semáforo.

LISTA DE CHEQUEO:
1. ¿El estado 'status' tiene valores correctos ('success', 'error', 'loading')?
2. ¿Evitó usar múltiples if/else o switch dentro del return?
   - Si usó muchos if/else, sugierelé usar un 'objeto de mapeo'.
3. ¿El estilo de fondo es dinámico?
4. ¿Los botones llaman a setStatus con el valor correcto?
5. ¿Usa sintaxis limpia (acceso a objeto o &&)?
   - Si intenta usar 'if' dentro de las llaves {}, explícale que JSX solo acepta expresiones.
`,

  estimatedTime: 12,
  tags: ["renderizado-condicional", "objetos", "estilos-dinamicos"],
};
