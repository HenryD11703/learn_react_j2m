import { Exercise } from "@/types";

export const customHookExercise: Exercise = {
  slug: "refactor-custom-hook",
  title: "Divide y Vencerás: Custom Hooks",
  difficulty: "medium",

  objective:
    "Tienes un componente `App.js` que hace demasiadas cosas: maneja estado, hace peticiones a una API y renderiza UI. Esto es difícil de mantener. Tu misión es extraer toda la lógica de datos a un Custom Hook reutilizable.",

  steps: [
    "Analiza el código 'espagueti' en `App.js`.",
    "Abre el archivo `hooks/useFetch.js`.",
    "Mueve los estados (`data`, `loading`, `error`) y el `useEffect` al nuevo hook.",
    "El hook debe retornar un objeto: `{ data, loading, error }`.",
    "Importa y usa `useFetch` en `App.js` para limpiar el componente visual.",
  ],

  hints: [
    {
      question: "¿Cómo estructura un Custom Hook?",
      answer: `// hooks/useFetch.js
import { useState, useEffect } from 'react';

export function useFetch(url) {
  const [data, setData] = useState(null);
  // ... resto de la lógica ...
  
  return { data, loading, error };
}`,
    },
    {
      question: "¿Cómo lo uso en App.js?",
      answer: `import { useFetch } from './hooks/useFetch';

export default function App() {
  const { data: products, loading, error } = useFetch('https://fakestoreapi.com/products');
  
  // ... renderizado ...
}`,
    },
  ],

  theory: {
    title: "¿Por qué Custom Hooks?",
    content: `
**Separation of Concerns (Separación de Responsabilidades)**
Un componente de React debe enfocarse en **CÓMO se ve** la interfaz, no en **CÓMO se obtienen** los datos.

**Ventajas:**
1. **Reutilización:** Puedes usar \`useFetch\` en 10 componentes distintos.
2. **Limpieza:** Tus componentes visuales pasan de 50 líneas a 10.
3. **Testabilidad:** Es más fácil probar la lógica del hook por separado.

**Reglas de los Hooks:**
- Deben empezar con la palabra \`use\` (ej: \`useFetch\`, \`useAuth\`).
- Solo pueden llamarse en el nivel superior de un componente o de otro hook.
`,
  },

  files: {
    "/App.js": `import React, { useState, useEffect } from 'react';
import './styles.css';
// import { useFetch } from "./hooks/useFetch";

// CÓDIGO ESPAGUETI
// Este componente sabe demasiado. Sabe de URLs, sabe de estados de carga, sabe de errores...
export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=5')
      .then(res => {
        if(!res.ok) throw new Error("Error en la petición");
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loader">Cargando productos...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="container">
      <h1>FakeStore Productos</h1>
      <div className="grid">
        {products.map(product => (
          <div key={product.id} className="card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>\${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}`,

    "/hooks/useFetch.js": `import { useState, useEffect } from 'react';

// Tu misión: Mueve la lógica aquí
export function useFetch(url) {
  // 1. Define los estados
  // 2. Usa useEffect para el fetch
  // 3. Retorna { data, loading, error }
  
  return {}; 
}`,

    "/styles.css": `
      .container { padding: 20px; font-family: sans-serif; }
      .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 20px; }
      .card { border: 1px solid #ddd; padding: 10px; border-radius: 8px; text-align: center; }
      .card img { height: 80px; object-fit: contain; }
      .loader { color: blue; font-weight: bold; }
      .error { color: red; background: #fee; padding: 10px; }
    `,
  },

  aiInstruction: `
    El objetivo es refactorizar App.js extrayendo la lógica a hooks/useFetch.js.

    Revisa TODOS los archivos proporcionados.

    Criterios de Aprobación:
    1. En 'App.js': NO debe haber llamadas directas a 'fetch' ni 'useEffect'. Debe estar limpio.
    2. En 'App.js': Debe importar y usar el hook 'useFetch'.
    3. En 'hooks/useFetch.js': Debe contener los useState y el useEffect con el fetch.
    4. El hook debe ser genérico (recibir la URL por parámetro), no tener la URL hardcodeada dentro (idealmente).

    Si el estudiante deja el fetch en App.js, reprueba y dile: "Aún veo lógica de fetch en tu componente visual. Muévela al hook."
    Si el hook no retorna la data, dile: "Tu hook necesita retornar los valores para que el componente los use."
  `,

  estimatedTime: 20,
  tags: ["hooks", "refactor", "fetch", "architecture"],
};
