import { Exercise } from "@/types";

export const liftingStateExercise: Exercise = {
  slug: "elevacion-de-estado",
  title: "Elevación de Estado: El Espejo",
  difficulty: "easy",

  objective:
    "Aprenderás a compartir información entre componentes hermanos moviendo el estado al ancestro común más cercano, permitiendo que la interfaz esté siempre sincronizada.",

  steps: [
    "Identifica que los componentes `Input` y `Display` son hermanos y no pueden pasarse datos directamente.",
    "Mueve el estado `texto` y su función `setTexto` desde el componente hijo hacia el componente padre (`App`).",
    "Pasa el valor del estado al componente `Display` a través de props.",
    "Pasa la función de actualización al componente `Input` para que pueda modificar el estado del padre.",
    "Verifica que al escribir en el input, el texto se actualice en tiempo real en el otro componente.",
  ],

  hints: [
    {
      question: "¿Por qué un hijo no puede mandarle datos a su hermano?",
      answer:
        "En React, el flujo de datos es **unidireccional** (de arriba hacia abajo). Los hermanos no tienen una conexión directa; por eso, la información debe 'subir' al padre para luego 'bajar' al otro hermano.",
    },
    {
      question: "¿Cómo paso una función como prop?",
      answer: `Es igual que cualquier otra prop:
      
<InputComponent alCambiar={setTexto} />

Luego, dentro del hijo, la usas en el evento:
<input onChange={(e) => props.alCambiar(e.target.value)} />`,
    },
    {
      question: "💡 Tip: ¿Qué nombre le pongo a las props?",
      answer:
        "Una buena convención es usar `on` para las funciones que pasan hacia abajo (ej: `onTextChange`) y el valor simple para los datos (ej: `text`).",
    },
  ],

  theory: {
    title: "Compartiendo Datos: Elevación de Estado",
    content: `
**¿Por qué es importante?**
A menudo, varios componentes necesitan reflejar los mismos datos cambiantes. Si cada uno guarda su propia copia, la interfaz se desincroniza. "Elevar el estado" garantiza que haya una **única fuente de la verdad**.

**1. Técnicas comunes:**
- **Identificar el ancestro común:** Buscar el componente padre más cercano que envuelva a todos los hijos que necesitan los datos.
- **Props de función:** Pasar funciones desde el padre para que los hijos puedan "avisar" cuando algo cambia.
- **Desestructuración de Props:** Recibir los datos de forma limpia en los hijos para mantener el código legible.

**2. Anti-patrones comunes:**
- ❌ **Duplicar el estado:** Crear un \`useState\` en cada hermano con la misma información. Esto causa que uno se actualice y el otro no.
- ❌ **Intentar usar el DOM:** Usar \`document.getElementById\` para leer el valor de otro componente. ¡Nunca hagas esto en React!
- ⚠️ **Elevar demasiado el estado:** No subas el estado hasta el nivel más alto de la app (como \`App.js\`) si solo lo usan dos componentes pequeños en una esquina. Mantén el estado lo más cerca posible de donde se usa.

**3. Ventajas de las buenas prácticas:**
- **Sincronización total:** Si el dato cambia en el padre, todos los hijos se actualizan al instante.
- **Facilidad de depuración:** Solo hay un lugar donde el estado puede estar fallando.
- **Componentes tontos (Presentacionales):** Tus componentes hijos se vuelven más simples porque solo muestran lo que el padre les dice.

**4. Ejemplos de código:**

✅ **Correcto (Estado en el Padre):**
\`\`\`javascript
function Padre() {
  const [val, setVal] = useState("");
  return (
    <>
      <HijoA valor={val} onChange={setVal} />
      <HijoB valor={val} />
    </>
  );
}
\`\`\`
`,
    examples: [
      "// Pasando el setter\n<Input onUpdate={(v) => setValue(v)} />",
      "// Recibiendo la prop\nconst Display = ({ texto }) => <p>{texto}</p>;",
    ],
  },

  files: {
    "App.js": `import React, { useState } from 'react';

// 1. Mueve el estado aquí para que ambos hijos puedan acceder
export default function App() {
  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>Sincronizador de Texto</h1>
      <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
        <InputComponent />
        <hr />
        <DisplayComponent />
      </div>
    </div>
  );
}

function InputComponent() {
  // ❌ Quita el estado de aquí
  const [valor, setValor] = useState("");

  return (
    <div>
      <label>Escribe algo: </label>
      <input 
        type="text" 
        value={valor}
        onChange={(e) => setValor(e.target.value)}
      />
    </div>
  );
}

function DisplayComponent() {
  // 2. Este componente debería recibir el texto por props
  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Resultado en tiempo real:</h3>
      <p style={{ color: 'blue', fontSize: '1.5rem' }}>
        {/* Muestra el texto aquí */}
        ...
      </p>
    </div>
  );
}`,
  },

  aiInstruction: `
El estudiante debe elevar el estado desde InputComponent hacia App para sincronizarlo con DisplayComponent.

LISTA DE CHEQUEO:
1. ¿Movió el useState al componente App?
2. ¿InputComponent recibe la función para actualizar el estado como prop?
3. ¿DisplayComponent recibe el valor del estado como prop?
4. ¿Se eliminó el estado local que estaba dentro de InputComponent?
   - ❌ Si dejó el estado en el hijo y solo intentó pasarlo: "⚠️ Recuerda que los datos no pueden viajar de un hijo a otro directamente. El estado DEBE vivir en el componente App."
5. ¿La interfaz se actualiza correctamente al escribir?

MENSAJE DE APROBACIÓN:
{ "aprobado": true, "mensaje": "✅ ¡Excelente! Has comprendido la 'Elevación de Estado'. Este concepto es la base para crear interfaces complejas y sincronizadas en React sin necesidad de herramientas externas." }
`,

  estimatedTime: 10,
  tags: ["lifting-state", "props", "sincronización", "basic-patterns"],
};
