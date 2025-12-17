import { Exercise } from "@/types";

export const useRefExercise: Exercise = {
  slug: "useref-dom-focus",
  title: "useRef: Acceso al DOM y Persistencia",
  difficulty: "medium",

  objective:
    "Aprenderás a utilizar el Hook useRef para acceder directamente a elementos del DOM y para almacenar valores persistentes que no provocan un nuevo renderizado del componente.",

  steps: [
    "Crea una referencia usando `useRef(null)` para apuntar a un elemento `<input>`.",
    "Vincula la referencia al input usando el atributo `ref`.",
    "Implementa una función que, al hacer click en un botón, use la referencia para poner el foco (`.focus()`) en el input automáticamente.",
    "Crea una segunda referencia para contar cuántas veces el usuario ha hecho click en un 'botón secreto', pero sin mostrar ese número en la interfaz (sin re-renders).",
    "Muestra el valor de esa cuenta 'secreta' solo mediante un `alert` o un `console.log`.",
  ],

  hints: [
    {
      question: "¿Cómo accedo al elemento real del DOM?",
      answer: `Cuando usas useRef, el objeto tiene una propiedad llamada \`.current\`. 
      
Si tu ref se llama 'inputRef', el elemento HTML es: \`inputRef.current\`.`,
    },
    {
      question: "¿Cómo pongo el foco en un input?",
      answer:
        "Los elementos de input tienen un método nativo de JavaScript llamado `.focus()`. \n\nUso: `miReferencia.current.focus();`",
    },
    {
      question: "💡 Tip: ¿Estado o Referencia?",
      answer:
        "Si quieres que un cambio se vea en la pantalla, usa `useState`. \n\nSi quieres guardar un dato 'en silencio' (sin que la pantalla se refresque), usa `useRef`.",
    },
  ],

  theory: {
    title: "useRef: La referencia persistente",
    content: `
**¿Por qué es importante?**
React es declarativo (tú dices qué quieres ver y React lo hace). Pero a veces necesitamos ser **imperativos** (dar órdenes directas), como cuando queremos controlar un video, enfocar un input o integrar librerías externas que no conocen React.

**1. Técnicas comunes:**
- **Acceso al DOM:** Referenciar elementos HTML para usar sus métodos nativos (\`.focus()\`, \`.scrollIntoView()\`).
- **Valores persistentes:** Guardar datos que sobreviven a los renders pero que, al cambiar, no "molestan" a React pidiéndole que dibuje de nuevo.
- **Evitar re-renders:** Ideal para timers, IDs de intervalos o flags de "es la primera vez que renderizo".

**2. Anti-patrones comunes:**
- ❌ **Manipular el DOM manualmente:** No uses refs para cambiar el texto o el color (ej: \`ref.current.innerText = 'Hola'\`). ¡Eso es trabajo del Estado!
- ❌ **Leer .current en el render:** No uses el valor de una referencia dentro del cuerpo de tu función de componente, ya que puede no estar sincronizado. Úsalo en eventos o useEffects.
- ⚠️ **Sustituir a useState:** Si necesitas que el usuario vea el cambio en pantalla, NO uses una ref.

**3. Ventajas de las buenas prácticas:**
- **Performance:** Al no disparar renders innecesarios, la app es más rápida.
- **Control Total:** Puedes manejar formularios complejos o integraciones con librerías de terceros (como gráficas o mapas).

**4. Ejemplos de código:**

✅ **Correcto (Foco automático):**
\`\`\`javascript
const inputRef = useRef(null);
const focusInput = () => inputRef.current.focus();

return <input ref={inputRef} />;
\`\`\`

❌ **Incorrecto (Tratando de usar ref como estado):**
\`\`\`javascript
const count = useRef(0);
// ❌ Esto no se actualizará en la pantalla al hacer click
return <div>{count.current}</div>; 
\`\`\`
`,
    examples: [
      "// Guardar un valor persistente\nconst timerRef = useRef(null);",
      "// Acceso al DOM\n<video ref={videoRef} />",
    ],
  },

  files: {
    "App.js": `import React, { useRef } from 'react';

export default function RefMagic() {
  // 1. Crea una referencia para el input
  
  // 2. Crea una referencia para contar clics (inicia en 0)

  const manejarFocus = () => {
    // 3. Pon el foco en el input usando la ref
  };

  const incrementoSecreto = () => {
    // 4. Aumenta la cuenta de la ref, pero no uses useState
    // 5. Muestra un alert con el valor actual de .current
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>Manejo de Refs</h1>
      
      <input 
        placeholder="Escribe algo aquí..." 
        style={{ padding: '10px', marginBottom: '10px' }}
        // 6. Vincula la ref aquí
      />

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button onClick={manejarFocus}>
          🎯 Enfocar Input
        </button>

        <button onClick={incrementoSecreto}>
          🤫 Clic Secreto (No re-renderea)
        </button>
      </div>

      <p style={{ marginTop: '20px', color: '#666' }}>
        💡 Mira la consola: los clics secretos no activan un render del componente.
      </p>
      {console.log("Componente renderizado...")}
    </div>
  );
}`,
  },

  aiInstruction: `
El estudiante debe demostrar que entiende la diferencia entre refs para el DOM y refs para persistencia.

LISTA DE CHEQUEO:
1. ¿Usó useRef(null) para el input y lo vinculó correctamente con la prop ref?
2. ¿Usó miRef.current.focus() en el manejador del botón?
3. ¿Usó una segunda ref para el contador secreto (ej: countRef.current++)?
4. ¿NO usó useState para el contador secreto? (Importante para validar persistencia sin render).
5. ¿Accede correctamente a la propiedad .current en ambos casos?

ERRORES COMUNES:
- ❌ Intentar acceder a la ref directamente sin usar .current: "⚠️ Recuerda que useRef devuelve un objeto. Debes usar .current para acceder al valor o al elemento del DOM."
- ❌ Usar useState para el contador secreto: "⚠️ El objetivo es usar una referencia para guardar el dato SIN provocar que el componente se dibuje de nuevo."

MENSAJE DE APROBACIÓN:
{ "aprobado": true, "mensaje": "✅ ¡Perfecto! Has completado el set de 10 ejercicios. Dominas useRef tanto para controlar el DOM como para gestionar datos persistentes de forma eficiente." }
`,

  estimatedTime: 15,
  tags: ["useRef", "dom", "focus", "performance"],
};
