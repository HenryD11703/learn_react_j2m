import { Exercise } from "@/types";

export const cronometroFantasmaExercise: Exercise = {
  slug: "cronometro-fantasma",
  title: "Efectos: El Cronómetro Fantasma",
  difficulty: "medium",

  objective:
    "Los efectos secundarios (side-effects) como timers o suscripciones deben limpiarse cuando un componente muere. Si no lo haces, crearás 'Memory Leaks' que ralentizan la aplicación.",

  steps: [
    "Dentro del `useEffect`, crea un `setInterval` que aumente los segundos cada 1000ms.",
    "Agrega un `console.log('Tic...')` dentro del intervalo para ver cuándo se ejecuta.",
    "Prueba tu app: Haz click en 'Ocultar Cronómetro'. Abre la consola. ¿Siguen saliendo los logs? 👻 Eso es un Memory Leak.",
    "Arréglalo retornando una función de limpieza (`cleanup function`) que use `clearInterval`.",
  ],

  hints: [
    {
      question: "¿Cómo uso setInterval dentro de useEffect?",
      answer: `useEffect(() => {
  const id = setInterval(() => {
    setSegundos(s => s + 1);
  }, 1000);
}, []); // Array vacío para que corra solo al montar`,
    },
    {
      question: "¿Por qué siguen saliendo logs cuando oculto el componente?",
      answer:
        "Porque React desmontó el componente visualmente, pero el proceso de JavaScript del intervalo sigue vivo en la memoria del navegador. Nadie le dijo que parara.",
    },
    {
      question: "¿Cómo detengo el intervalo al desmontar?",
      answer: `useEffect(() => {
  const id = setInterval(...);

  // Esta función se ejecuta cuando el componente muere
  return () => {
    clearInterval(id);
    console.log("Limpiando...");
  };
}, []);`,
    },
  ],

  theory: {
    title: "Ciclo de Vida y Cleanup",
    content: `
**El ciclo de vida de un Efecto:**
1. **Mount:** El componente aparece -> Se ejecuta el cuerpo del \`useEffect\`.
2. **Update:** Si las dependencias cambian -> Se limpia el anterior y se ejecuta el nuevo.
3. **Unmount:** El componente desaparece -> **Se ejecuta lo que retornaste en el useEffect.**

**La función de limpieza (Cleanup Function):**
React espera que \`useEffect\` retorne una **función** (o nada). Si retornas una función, React la guardará y la llamará justo antes de eliminar el componente.

**Errores comunes:**
❌ \`return clearInterval(id)\` -> Esto ejecuta la limpieza INMEDIATAMENTE al montar.
✅ \`return () => clearInterval(id)\` -> Esto entrega una función para ejecutar DESPUÉS.
`,
    examples: [
      "// Event Listeners\nuseEffect(() => {\n  window.addEventListener('resize', handle);\n  return () => window.removeEventListener('resize', handle);\n}, [])",
      "// Timers\nuseEffect(() => {\n  const timer = setTimeout(...);\n  return () => clearTimeout(timer);\n}, [])",
    ],
  },

  // El código inicial incluye el "Entorno de Prueba" (App) y el componente a arreglar
  files: {
    "App.js": `import React, { useState, useEffect } from 'react';

// 👻 ESTE ES EL COMPONENTE QUE DEBES ARREGLAR
function Cronometro() {
  const [segundos, setSegundos] = useState(0);

  useEffect(() => {
    // 1. Crea tu intervalo aquí (setInterval)
    // 2. No olvides el console.log para ver el fantasma
    
    // 3. RETORNA la función de limpieza
  }, []);

  return (
    <div style={{ border: '2px solid #646cff', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
      <h2>⏱️ Tiempo: {segundos}s</h2>
      <p style={{fontSize: '0.8rem', color: '#888'}}>Abre la consola para ver los logs</p>
    </div>
  );
}

// 🛑 NO TOQUES ESTE COMPONENTE (Es para probar tu código)
export default function App() {
  const [mostrar, setMostrar] = useState(true);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>El Cronómetro Fantasma</h1>
      
      <button 
        onClick={() => setMostrar(!mostrar)}
        style={{ background: mostrar ? '#ff4444' : '#44ff44', color: 'black', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
      >
        {mostrar ? "Ocultar Cronómetro (Desmontar)" : "Mostrar Cronómetro (Montar)"}
      </button>

      {/* Aquí montamos/desmontamos tu componente */}
      {mostrar && <Cronometro />}
      
      {!mostrar && <p>El componente se ha ido... ¿pero el intervalo sigue ahí?</p>}
    </div>
  );
}`,
  },

  aiInstruction: `
El estudiante debe implementar un cronómetro que se limpie correctamente al desmontar.

Analiza el código del componente 'Cronometro':

1. **Uso de setInterval:** ¿Creó el intervalo correctamente?
2. **Actualización del estado:** ¿Usa la forma funcional \`setSegundos(s => s + 1)\`? (Es lo ideal, aunque \`segundos + 1\` es aceptable si agregó la dependencia, pero mejor si usa callback).
3. **CRÍTICO - Cleanup:** ¿Retorna una función dentro del useEffect?
   - Debe ser: \`return () => clearInterval(id)\`
   - Verifica que haya capturado el ID del intervalo en una variable (const id = setInterval...).

Si falta el return o el clearInterval:
Responde: "❌ ¡Cuidado! Creaste el intervalo pero no lo estás limpiando. Si ocultas el componente, el timer seguirá corriendo en la memoria. Necesitas retornar una función de limpieza en el useEffect."

Si ejecuta la limpieza mal (ej: return clearInterval(id) sin función flecha):
Responde: "❌ Error de sintaxis en el cleanup. Estás ejecutando el clear inmediatamente. Debes retornar una FUNCIÓN que React pueda llamar después: return () => clearInterval(id)."

Si todo está bien:
{ "aprobado": true, "mensaje": "¡Excelente! Has dominado el ciclo de vida de los efectos. Al limpiar el intervalo, previenes memory leaks y bugs inesperados." }
`,

  estimatedTime: 15,
  tags: ["useEffect", "cleanup", "memory-leaks", "setInterval"],
};
