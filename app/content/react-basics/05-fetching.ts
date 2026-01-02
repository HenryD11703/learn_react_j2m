import { Exercise } from "@/types";

export const fetchingRobustoExercise: Exercise = {
  slug: "fetching-robusto",
  title: "Fetching de Datos Robusto",
  difficulty: "medium",

  objective:
    "Aprenderás a realizar peticiones a APIs externas usando useEffect y async/await, gestionando correctamente los tres estados vitales de la asincronía: carga, error y éxito.",

  steps: [
    "Importa los Hooks `useState` y `useEffect` directamente desde React.",
    "Declara tres estados: `data` (para los resultados), `loading` (booleano) y `error` (para mensajes de fallo).",
    "Crea una función asíncrona dentro de `useEffect` que realice la petición con `fetch`.",
    "Implementa un bloque `try/catch/finally` para capturar cualquier problema de red o de la API.",
    "Renderiza condicionalmente: una señal de carga, un mensaje si hay error, o la lista de datos si todo salió bien.",
  ],

  hints: [
    {
      question: "💡 Tip: ¿Cómo importar los hooks de forma moderna?",
      answer:
        "Evita usar `React.useState`. Es mejor práctica desestructurarlos en la importación:\n`import { useState, useEffect } from 'react';`",
    },
    {
      question: "¿Por qué mi estado de error siempre es null?",
      answer: `⚠️ Recuerda que el 'fetch' de JavaScript NO lanza un error automáticamente si la API responde un 404 o 500. Debes verificarlo manualmente:
      
if (!res.ok) throw new Error("No pudimos obtener los datos");`,
    },
    {
      question: "¿Para qué sirve el bloque 'finally'?",
      answer:
        "El bloque `finally` se ejecuta siempre, sin importar si la petición fue exitosa o falló. Es el lugar perfecto para poner `setLoading(false)`, evitando repetir código en el try y en el catch.",
    },
    {
      question: "¿Cómo renderizo los datos de forma segura?",
      answer: `Usa el operador && para asegurarte de que hay datos antes de hacer el .map():
{data && data.map(item => <li key={item.id}>{item.name}</li>)}`,
    },
  ],

  theory: {
    title: "El Patrón Profesional de Fetching",
    introduction:
      "En la web, las cosas fallan: el internet del usuario es lento, el servidor se cae o la API cambia. Si tu código no maneja estos estados, la aplicación se quedará 'congelada' o mostrará una pantalla en blanco, frustrando al usuario.",
    goodPractices: [
      "Async/Await: Hace que el código asíncrono se lea como si fuera síncrono, mejorando la legibilidad.",
      "Try/Catch/Finally: El estándar para capturar errores y limpiar estados (como apagar el spinner de carga).",
      "Verificación de res.ok: Validar que el servidor respondió con un código exitoso (200-299).",
    ],
    badPractices: [
      "Ignorar el estado de error: Si la API falla y no manejas el error, el usuario no sabrá qué pasó.",
      "Fetch fuera de useEffect: Esto causará peticiones infinitas cada vez que el componente se re-renderice.",
      "Olvidar el array de dependencias: Si dejas el `[]` vacío, solo carga al montar. Si lo olvidas, colapsarás la API con peticiones.",
    ],
    examples: [
      "// Renderizado condicional triple\nif (loading) return <p>Cargando...</p>;\nif (error) return <p>Error: {error}</p>;\nreturn <ul>{data.map(i => <li key={i.id}>{i.name}</li>)}</ul>",
    ],
  },

  files: {
    "App.js": `import React, { useState, useEffect } from 'react';

export default function FetchingRobusto() {
  // 1. Define aquí tus 3 estados: data, loading y error

  useEffect(() => {
    // 2. Crea tu función asíncrona para el fetch
    // API recomendada: https://rickandmortyapi.com/api/character
    
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>Personajes de Rick & Morty</h1>

      {/* 3. Renderizado condicional:
        - Si loading es true, muestra un mensaje de carga.
        - Si error existe, muestra el mensaje de error en rojo.
        - Si hay datos, usa .map() para mostrar los nombres.
      */}
    </div>
  );
}`,
  },

  aiInstruction: `
El estudiante debe realizar un fetching de datos completo y seguro.

LISTA DE CHEQUEO:
1. ¿Declaró los tres estados (data, loading, error)?
2. ¿Usó useEffect con un array de dependencias vacío []?
3. ¿Implementó async/await con try/catch?
4. ¿Validó res.ok antes de transformar a JSON?
   - Si no lo hizo suggestTip: "Tip: 'fetch' no lanza error en respuestas 404 o 500. Debes verificar if(!res.ok) y lanzar un error manualmente."
5. ¿Usó finally para hacer setLoading(false)?
   - Si lo hace dentro de try y catch por separado: "Tip: Puedes simplificar tu código usando un bloque 'finally' para apagar el estado de carga una sola vez."
6. ¿Renderiza condicionalmente el error?
   - Si solo hace console.error: "⚠️ El usuario no puede ver la consola. Debes guardar el error en el estado y mostrarlo en la interfaz."
`,

  estimatedTime: 15,
  tags: ["fetching", "async-await", "useEffect", "error-handling"],
};
