import { Exercise } from "@/types";

export const cronometroFantasmaExercise: Exercise = {
  slug: "cronometro-fantasma",
  title: "Efectos: El Cronómetro Fantasma",
  difficulty: "medium",

  objective:
    "Aprenderás a gestionar el ciclo de vida de los efectos secundarios (side-effects) y a utilizar funciones de limpieza para prevenir fugas de memoria (Memory Leaks).",

  steps: [
    "Crea un estado para los segundos iniciando en 0.",
    "Implementa un `useEffect` que inicie un intervalo con `setInterval` cada 1000ms.",
    "Dentro del intervalo, utiliza un `console.log('Tic...')` para observar el comportamiento en la consola.",
    "Actualiza el estado de los segundos usando la forma funcional de `setSegundos`.",
    "Retorna una función de limpieza que detenga el intervalo cuando el componente se desmonte.",
  ],

  hints: [
    {
      question: "¿Cómo guardo la referencia del intervalo?",
      answer: `Para poder limpiar un intervalo, primero debes guardarlo en una constante:
      
const intervalId = setInterval(() => { ... }, 1000);

// Luego puedes usar: clearInterval(intervalId);`,
    },
    {
      question: "¿Por qué el log sigue apareciendo si ya no veo el componente?",
      answer:
        "⚠️ ¡Ese es el fantasma! React quitó el componente de la pantalla, pero el proceso de `setInterval` sigue vivo en el navegador porque nunca le dijiste que se detuviera. Esto consume memoria y CPU.",
    },
    {
      question: "¿Cómo se ve exactamente la función de limpieza?",
      answer: `Dentro del \`useEffect\`, debes retornar una función flecha:
      
return () => {
  console.log("Limpiando...");
  clearInterval(intervalId);
};`,
    },
    {
      question: "💡 Tip: ¿Importación o React.useEffect?",
      answer:
        "Es mucho más limpio importar el hook directamente: `import { useEffect } from 'react';` en lugar de usar `React.useEffect`. Esto ayuda a que tu código sea más legible y estandarizado.",
    },
  ],

  theory: {
    title: "Ciclo de Vida y Limpieza de Efectos",
    introduction:
      "Cuando conectas tu componente al mundo exterior (APIs, timers, suscripciones), esa conexión no se rompe sola. Si el componente desaparece pero la conexión sigue activa, creas un **Memory Leak**. Esto hace que tu app se vuelva pesada y lenta con el tiempo.",
    goodPractices: [
      "La Función de Limpieza: Es el código que colocas en el `return` de tu `useEffect`.",
      "Efectos controlados: Usar el arreglo de dependencias `[]` para asegurar que el intervalo solo se cree una vez al montar.",
      "Forma funcional de setEstado: Usar `s => s + 1` para no depender de la variable externa y evitar re-ejecutar el efecto innecesariamente.",
    ],
    badPractices: [
      "Olvidar el cleanup: Dejar intervalos o event listeners activos después de desmontar.",
      "Ejecución inmediata: Hacer `return clearInterval(id)` (ejecuta el clear al instante) en lugar de `return () => clearInterval(id)` (guarda la función para después).",
      "Múltiples timers: No limpiar el efecto antes de que se cree uno nuevo si las dependencias cambian.",
    ],
    examples: [
      "// Limpiando Event Listeners\nuseEffect(() => {\n  window.addEventListener('scroll', handle);\n  return () => window.removeEventListener('scroll', handle);\n}, []);",
    ],
  },

  files: {
    "App.js": `import React, { useState, useEffect } from 'react';

// ESTE ES EL COMPONENTE QUE DEBES ARREGLAR
function Cronometro() {
  const [segundos, setSegundos] = useState(0);

  useEffect(() => {
    // 💡 Tip: Usa const id = setInterval(...)
    
    // 1. Crea tu intervalo aquí
    
    // 2. RETORNA la función de limpieza () => clearInterval(id)
  }, []);

  return (
    <div style={{ border: '2px solid #646cff', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
      <h2>⏱️ Tiempo: {segundos}s</h2>
      <p style={{fontSize: '0.8rem', color: '#888'}}>Abre la consola para ver los logs</p>
    </div>
  );
}

export default function App() {
  const [mostrar, setMostrar] = useState(true);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>El Cronómetro Fantasma</h1>
      
      <button 
        onClick={() => setMostrar(!mostrar)}
        style={{ 
          background: mostrar ? '#ff4444' : '#44ff44', 
          color: 'white', 
          border: 'none', 
          padding: '10px 20px', 
          borderRadius: '5px', 
          cursor: 'pointer' 
        }}
      >
        {mostrar ? "Ocultar Cronómetro" : "Mostrar Cronómetro"}
      </button>

      {mostrar && <Cronometro />}
      {!mostrar && <p style={{marginTop: '20px'}}>Componente desmontado. ¿Sigue el log en la consola? 👻</p>}
    </div>
  );
}`,
  },

  aiInstruction: `
El estudiante debe implementar un intervalo y su respectiva limpieza.

LISTA DE CHEQUEO:
1. ¿Usó setInterval dentro de useEffect?
2. ¿Usó la forma funcional setSegundos(s => s + 1)?
   - Si no lo hizo suggestTip: "Tip: Usa la forma funcional setSegundos(s => s + 1) para evitar problemas con las dependencias del useEffect."
3. ¿Retornó una función de limpieza? 
   - Si falta el return: "⚠️ ¡Cuidado! Has creado el intervalo pero no lo estás limpiando. Debes retornar una función que ejecute clearInterval."
4. ¿Usó la sintaxis de retorno correcta? 
   - Si hizo return clearInterval(id): "⚠️ Estás ejecutando la limpieza inmediatamente. El return debe devolver una FUNCIÓN: return () => clearInterval(id)."
`,

  estimatedTime: 15,
  tags: ["useEffect", "cleanup", "memory-leaks"],
};
