import { Exercise } from "@/types";

export const fetchingRobustoExercise: Exercise = {
  slug: "fetching-robusto",
  title: "Fetching de Datos Robusto",
  difficulty: "medium",

  objective:
    "Aprenderás a realizar peticiones a una API usando useEffect y async/await, manejando correctamente los estados de carga, error y datos. Construirás un flujo de fetching realista y robusto, evitando uno de los errores más comunes en desarrolladores junior.",

  steps: [
    "Importa useEffect y useState desde React",
    "Crea tres estados obligatorios: loading, error y data",
    "Usa useEffect para ejecutar la petición al montar el componente",
    "Implementa una función async que haga fetch a una API pública",
    "Maneja correctamente los estados de loading, error y data",
    "Renderiza condicionalmente un spinner, un mensaje de error o la lista de datos",
  ],

  hints: [
    {
      question: "¿Qué estados necesito para un fetching robusto?",
      answer: `const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [data, setData] = useState([]);`,
    },
    {
      question: "¿Cómo hago fetch con async/await?",
      answer: `const fetchData = async () => {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  const json = await response.json();
  setData(json.results);
};`,
    },
    {
      question: "¿Cómo manejo errores correctamente?",
      answer: `try {
  // fetch
} catch (err) {
  setError("Algo salió mal");
} finally {
  setLoading(false);
}`,
    },
    {
      question: "¿Dónde debo cambiar loading a false?",
      answer: `Siempre en el finally.
Así te aseguras de que loading se apague tanto si hay éxito como error.`,
    },
  ],

  theory: {
    title: "Fetching de Datos en React",
    content: `
**El error más común en fetching**
Muchos desarrolladores junior:
- Solo manejan data
- Olvidan loading
- Ignoran el estado de error ❌

En producción esto causa:
- Pantallas en blanco
- Errores silenciosos
- Mala UX

**Los 3 estados obligatorios**
1. **loading** → mientras esperas la respuesta
2. **error** → si algo falla (red, API, parsing)
3. **data** → cuando todo sale bien

**Flujo correcto**
1. loading = true
2. Intentas fetch
3. Si éxito → setData
4. Si falla → setError
5. finally → loading = false

**Ejemplo de patrón robusto**
\`\`\`javascript
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(url);
      if (!res.ok) throw new Error("Error en la API");
      const data = await res.json();
      setData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);
\`\`\`

⚠️ Regla de oro:
> Si haces fetch sin estado de error, tu código está incompleto.
`,
    examples: [
      "// Estado de loading\nif (loading) return <Spinner />;",
      "// Estado de error\nif (error) return <ErrorMessage />;",
      "// Renderizar data\ndata.map(item => <div>{item.name}</div>)",
    ],
  },

  files: {
    "App.js": `import React, { useEffect, useState } from 'react';

export default function FetchingRobusto() {
  // Estados obligatorios: loading, error, data
  
  useEffect(() => {
    // Aquí va tu lógica de fetching
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Personajes</h1>

      {/* 
        Si loading → mostrar spinner
        Si error → mostrar mensaje
        Si data → renderizar lista
      */}
    </div>
  );
}`,
  },

  aiInstruction: `
El estudiante debe implementar un fetching de datos robusto usando useEffect y async/await.

Verifica estrictamente que:
1. Existan los estados loading, error y data
2. loading inicie en true
3. La petición se haga dentro de useEffect
4. Se use async/await correctamente
5. Exista manejo de errores con try/catch
6. loading se apague en un finally
7. El renderizado sea condicional:
   - loading → spinner o texto de carga
   - error → mensaje de error visible
   - data → lista renderizada con .map()

❌ FALLA AUTOMÁTICA si:
- No existe estado de error
- El error se maneja solo con console.error
- loading nunca se apaga
- Se hace fetch fuera de useEffect

Si todo está correcto:
{
  "aprobado": true,
  "mensaje": "¡Excelente! Implementaste un fetching robusto con manejo correcto de loading, error y data. Este es un patrón de nivel mid que se usa en producción."
}

Si hay errores:
Explica qué estado falta o está mal manejado y por qué eso es un problema real en aplicaciones.
Da una pista clara sin escribir el código completo.
`,

  estimatedTime: 15,
  tags: ["hooks", "useEffect", "fetch", "async-await", "error-handling"],
};
