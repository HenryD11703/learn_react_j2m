import { Exercise } from "@/types";

export const useReducerUndoExercise: Exercise = {
  slug: "usereducer-undo-redo",
  title: "useReducer: El Editor con Deshacer (Undo)",
  difficulty: "hard",

  objective:
    "Implementarás una lógica de estado compleja utilizando un Reducer para gestionar un historial de cambios (Undo/Redo), separando totalmente las acciones de la interfaz de usuario.",

  steps: [
    "Define un objeto de estado inicial que contenga: el valor actual (`present`), una lista de estados pasados (`past`) y una lista de estados futuros (`future`).",
    "Crea una función Reducer que maneje las acciones: `SET_TEXT`, `UNDO` y `REDO`.",
    "En la acción `SET_TEXT`, guarda el valor actual en el historial `past` antes de actualizar el `present`.",
    "En la acción `UNDO`, mueve el valor actual a `future` y recupera el último valor de `past`.",
    "Usa el Hook `useReducer` en el componente principal y conecta los botones de la interfaz.",
    "Deshabilita los botones de Deshacer/Rehacer cuando no haya historial disponible.",
  ],

  hints: [
    {
      question: "¿Cómo muevo elementos entre los arreglos del historial?",
      answer: `Para el 'Undo':
1. El nuevo 'present' es el último elemento de 'past'.
2. El 'past' resultante es el resto de elementos (puedes usar .slice(0, -1)).
3. El 'future' recibe el 'present' actual al inicio ([currentPresent, ...future]).`,
    },
    {
      question: "⚠️ ¿Por qué mi historial se vuelve loco al escribir?",
      answer:
        "Si disparas una acción por cada tecla presionada, el historial se llenará de letras sueltas. En un caso real usaríamos 'Debounce', pero para este ejercicio, asegúrate de guardar el estado anterior solo cuando el valor realmente cambie.",
    },
    {
      question: "💡 Tip: ¿Action Types?",
      answer:
        "Usa constantes o un objeto para los nombres de las acciones para evitar errores de dedo:\n\n`const ACTIONS = { UNDO: 'UNDO', REDO: 'REDO', SET: 'SET' };`",
    },
  ],

  theory: {
    title: "Máquinas de Estado y useReducer",
    content: `
**¿Por qué es importante?**
Cuando el estado de un componente depende de su valor anterior de forma compleja (como un historial de 'deshacer'), usar muchos \`useState\` se vuelve una pesadilla. \`useReducer\` te permite centralizar la lógica en una función pura que es fácil de testear y entender.

**1. Técnicas comunes:**
- **Reducer:** Una función que recibe el estado actual y una "acción", y devuelve el nuevo estado.
- **Dispatch:** La función que enviamos desde el componente para avisar que algo pasó (ej: \`dispatch({ type: 'UNDO' })\`).
- **Inmutabilidad Extrema:** En los reducers, nunca uses \`.push()\` o \`.pop()\`. Siempre devuelve objetos y arreglos nuevos usando el operador spread.

**2. Anti-patrones comunes:**
- ❌ **Lógica pesada en el componente:** Dejar los cálculos del historial dentro del \`onClick\`. El componente solo debe "despachar" la intención.
- ❌ **Efectos secundarios en el Reducer:** Un reducer debe ser una **función pura**. Nunca hagas fetch ni uses \`Math.random()\` dentro de él.
- ⚠️ **Estado gordo:** No metas en el reducer datos que no están relacionados entre sí.

**3. Ventajas de las buenas prácticas:**
- **Predecibilidad:** Si sabes el estado inicial y la lista de acciones, sabes exactamente cómo se verá la app.
- **Depuración:** Es mucho más fácil seguir el rastro de "qué acción rompió el estado".
- **Preparación para Redux:** Este es exactamente el patrón que usan las librerías de estado global más famosas.

**4. Ejemplos de código:**

✅ **Correcto (Estructura de Reducer):**
\`\`\`javascript
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    default:
      return state;
  }
}
\`\`\`
`,
    examples: [
      "// Despachar acción\ndispatch({ type: 'SET_TEXT', payload: 'Nuevo texto' });",
      "// Estado inicial complejo\n{ past: [], present: '', future: [] }",
    ],
  },

  files: {
    "App.js": `import React, { useReducer } from 'react';

// 1. Define aquí tu estado inicial
const initialState = {
  past: [],
  present: '',
  future: []
};

// 2. Implementa la función reducer
function reducer(state, action) {
  const { past, present, future } = state;

  switch (action.type) {
    case 'SET_TEXT':
      // 💡 Tip: Guarda el present en el past antes de cambiar
      return state; 

    case 'UNDO':
      // 💡 Tip: El nuevo present sale del past
      return state;

    case 'REDO':
      return state;

    default:
      return state;
  }
}

export default function EditorConMemoria() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>Editor con Historial</h1>
      
      <textarea 
        value={state.present}
        onChange={(e) => dispatch({ type: 'SET_TEXT', payload: e.target.value })}
        rows="5"
        style={{ width: '100%', padding: '10px', fontSize: '1.2rem' }}
      />

      <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button 
          onClick={() => dispatch({ type: 'UNDO' })}
          disabled={state.past.length === 0}
        >
          ↩️ Deshacer
        </button>
        
        <button 
          onClick={() => dispatch({ type: 'REDO' })}
          disabled={state.future.length === 0}
        >
          ↪️ Rehacer
        </button>
      </div>

      <div style={{ marginTop: '20px', color: '#888', fontSize: '0.9rem' }}>
        <p>Cambios en el historial: {state.past.length}</p>
        <p>Cambios por rehacer: {state.future.length}</p>
      </div>
    </div>
  );
}`,
  },

  aiInstruction: `
El estudiante debe implementar un sistema de Undo/Redo usando useReducer.

LISTA DE CHEQUEO:
1. ¿Implementó el reducer con switch/case para SET_TEXT, UNDO y REDO?
2. ¿Maneja la inmutabilidad correctamente? (Usa spread o slice, NO push/pop).
3. En UNDO:
   - ¿Mueve el present al inicio de future?
   - ¿Toma el último de past como nuevo present?
4. En SET_TEXT:
   - ¿Mueve el present actual a past antes de actualizar?
   - ¿Limpia el future (ya que un nuevo cambio rompe la línea temporal futura)?
5. ¿Los botones se deshabilitan correctamente basándose en la longitud de past y future?

MENSAJE DE APROBACIÓN:
{ "aprobado": true, "mensaje": "✅ ¡Increíble! Has construido una máquina de estados con historial. Este nivel de control sobre el estado es lo que distingue a los ingenieros de software senior en React." }
`,

  estimatedTime: 30,
  tags: ["useReducer", "state-machine", "undo-redo", "advanced-logic"],
};
