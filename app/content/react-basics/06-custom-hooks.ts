import { Exercise } from "@/types";

export const customHookExercise: Exercise = {
  slug: "refactor-custom-hook",
  title: "Divide y Vencerás: Custom Hooks",
  difficulty: "medium",

  objective:
    "Aprenderás a desacoplar la lógica de negocio de la interfaz de usuario, extrayendo procesos complejos (como el fetching de datos) a un Custom Hook reutilizable y limpio.",

  steps: [
    "Analiza el código 'espagueti' en `App.js` donde la lógica y el diseño están mezclados.",
    "Abre el archivo `hooks/useFetch.js` e importa los Hooks necesarios de React.",
    "Traslada los estados (`data`, `loading`, `error`) y el `useEffect` desde `App.js` hacia el nuevo Hook.",
    "Haz que el Hook sea genérico recibiendo una `url` por parámetro.",
    "Retorna un objeto con los estados para que cualquier componente pueda consumirlos.",
    "Refactoriza `App.js` para usar tu nuevo Hook y eliminar la lógica redundante.",
  ],

  hints: [
    {
      question: "💡 Tip: ¿Cómo exportar el Hook correctamente?",
      answer:
        "Es mejor usar exportaciones nombradas para que el autocompletado sea más fácil:\n\n`export function useFetch(url) { ... }`",
    },
    {
      question: "⚠️ ¿Puedo usar React.useEffect dentro del Hook?",
      answer:
        "Es válido, pero la convención profesional es importar el Hook directamente:\n\n`import { useEffect, useState } from 'react';` \n\nEsto mantiene tu código más limpio y fácil de leer.",
    },
    {
      question: "¿Cómo renombro los datos al usar el Hook?",
      answer: `Como el Hook devuelve un objeto, puedes renombrar las propiedades al desestructurar:
      
const { data: products, loading } = useFetch(url);

💡 Así puedes usar 'products' en tu código visual en lugar de la palabra genérica 'data'.`,
    },
    {
      question: "¿Qué debe devolver exactamente mi Hook?",
      answer:
        "Un Custom Hook debe devolver los datos o funciones que el componente necesita. En este caso, un objeto es ideal:\n\n`return { data, loading, error };`",
    },
  ],

  theory: {
    title: "La Magia de los Custom Hooks",
    content: `
**¿Por qué es importante?**
En React, un componente debería tener una sola responsabilidad: **mostrar la interfaz**. Cuando un componente también se encarga de llamar a APIs, validar datos y manejar timers, se vuelve un "componente gordo" difícil de mantener. Los Custom Hooks nos permiten extraer esa lógica para que sea reutilizable.

**1. Técnicas comunes:**
- **Prefijo 'use':** React exige que todo Hook empiece con "use" (ej: \`useFetch\`) para aplicar las reglas de los Hooks.
- **Retorno de objetos:** Devolver \`{ data, loading }\` es más flexible que devolver un arreglo, ya que permite desestructurar solo lo que necesitas.
- **Hooks Genéricos:** Pasar parámetros como la \`url\` para que el Hook sirva para cualquier petición.

**2. Anti-patrones comunes:**
- ❌ **Lógica de UI en el Hook:** Un Hook no debe devolver JSX ni estilos, solo datos o funciones lógicas.
- ❌ **Hooks condicionales:** Nunca llames a un Hook dentro de un \`if\` o un bucle.
- ⚠️ **Acoplamiento:** No hagas que tu Hook dependa de un componente específico; hazlo lo más independiente posible.

**3. Ventajas de las buenas prácticas:**
- **Código DRY (Don't Repeat Yourself):** Si necesitas hacer fetch en otro lugar, ya tienes tu \`useFetch\` listo.
- **Componentes 'Puros':** Tu \`App.js\` se vuelve mucho más corto y fácil de leer.
- **Facilidad de Testing:** Puedes probar la lógica de la API sin tener que renderizar botones o imágenes.

**4. Ejemplos de código:**

✅ **Correcto (Separación de responsabilidades):**
\`\`\`javascript
// hooks/useFetch.js
export function useFetch(url) {
  const [data, setData] = useState(null);
  // ... lógica ...
  return { data };
}
\`\`\`

❌ **Incorrecto (Lógica mezclada):**
\`\`\`javascript
function MiComponente() {
  // ❌ 20 líneas de fetching mezcladas con el return
  useEffect(() => { ... }, []);
  return <div>{/* UI */}</div>;
}
\`\`\`
`,
    examples: [
      "// Uso del custom hook\nconst { data, loading } = useFetch(API_URL);",
      "// Estructura mínima\nfunction useAlgo() {\n  useEffect(() => {}, []);\n  return resultado;\n}",
    ],
  },

  files: {
    "/App.js": `import React from 'react';
import { useFetch } from "./hooks/useFetch";
import './styles.css';

export default function App() {
  // 1. Usa aquí tu nuevo hook useFetch
  // URL: 'https://fakestoreapi.com/products?limit=5'
  
  // 2. Extrae data, loading y error (puedes renombrar data a products)

  // 💡 Tip: Mantén aquí solo la lógica de renderizado (if loading, if error...)

  return (
    <div className="container">
      <h1>FakeStore Productos</h1>
      <div className="grid">
        {/* 3. Mapea tus productos aquí */}
      </div>
    </div>
  );
}`,

    "/hooks/useFetch.js": `import { useState, useEffect } from 'react';

// 💡 Tip: Exporta la función directamente
export function useFetch(url) {
  // 1. Declara tus estados (data, loading, error)
  
  // 2. Implementa el useEffect con el fetch
  
  // 3. ¡No olvides retornar el objeto con los datos!
  return { }; 
}`,

    "/styles.css": `
      .container { padding: 20px; font-family: sans-serif; }
      .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 20px; }
      .card { border: 1px solid #ddd; padding: 10px; border-radius: 8px; text-align: center; }
      .card img { height: 80px; object-fit: contain; }
      .loader { color: blue; font-weight: bold; text-align: center; margin-top: 20px; }
      .error { color: red; background: #fee; padding: 10px; border-radius: 4px; }
    `,
  },

  aiInstruction: `
El estudiante debe refactorizar el componente extrayendo la lógica a un Custom Hook.

LISTA DE CHEQUEO:
1. ¿El archivo 'App.js' está libre de useEffect y fetch?
   - ❌ Si sigue teniendo lógica de fetch: "⚠️ Tu componente visual todavía sabe demasiado. Mueve el fetch y el useEffect al archivo useFetch.js."
2. ¿El Hook 'useFetch' recibe la URL por parámetro?
   - 💡 Si la URL está hardcodeada dentro del hook: "Tip: Haz tu hook más potente recibiendo la URL como parámetro, así podrás usarlo para cualquier API."
3. ¿El Hook retorna un objeto { data, loading, error }?
4. ¿Se manejan correctamente los estados de error y carga dentro del hook?
5. ¿Importó correctamente el hook en App.js?

MENSAJE DE APROBACIÓN:
{ "aprobado": true, "mensaje": "✅ ¡Magistral! Has aplicado el principio de 'Separación de Responsabilidades'. Tu componente visual ahora es mucho más limpio y tu lógica de fetching es reutilizable en cualquier parte de la app." }
`,

  estimatedTime: 20,
  tags: ["hooks", "refactor", "arquitectura", "reutilización"],
};
