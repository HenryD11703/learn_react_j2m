import { Exercise } from "@/types";

export const performanceListExercise: Exercise = {
  slug: "performance-list-memo",
  title: "Performance: La Lista Lenta",
  difficulty: "hard",

  objective:
    "Optimizarás el rendimiento de una aplicación con listas masivas, aprendiendo a identificar 're-renders' innecesarios y a utilizar React.memo, useMemo y useCallback para mantener la interfaz fluida.",

  steps: [
    "Identifica el cuello de botella: escribe en el input y observa en la consola cómo se renderiza toda la lista en cada pulsación.",
    "Extrae la lógica de cada elemento de la lista a un nuevo componente llamado `ListItem`.",
    "Envuelve el componente `ListItem` con `React.memo` para que solo se actualice si sus props cambian.",
    "Utiliza `useMemo` para memorizar el filtrado de la lista, evitando que el cálculo se repita si la búsqueda no ha cambiado.",
    "Implementa una función para seleccionar un item y envuélvela en `useCallback` para mantener la referencia estable entre renders.",
  ],

  hints: [
    {
      question: "¿Cómo sé si mi componente se está re-renderizando?",
      answer:
        "💡 Tip: Coloca un `console.log('Renderizando Item')` dentro de tu componente. Si ves cientos de mensajes al escribir una sola letra en un buscador, tienes un problema de performance.",
    },
    {
      question: "¿Por qué React.memo no funciona si paso una función?",
      answer: `⚠️ Las funciones en JavaScript se recrean en cada render. Si pasas una función "inline" a un componente memoizado, React pensará que la prop cambió.
      
Para solucionarlo, debes memorizar la función:
const handleClick = useCallback(() => { ... }, []);`,
    },
    {
      question: "¿Cuándo debo usar useMemo exactamente?",
      answer:
        "Úsalo para operaciones costosas (como filtrar 500+ elementos). \n\n`const resultado = useMemo(() => lista.filter(...), [dependencias]);`",
    },
    {
      question: "💡 Tip: ¿Importar o usar React.memo?",
      answer:
        "Es mejor práctica importar los hooks y funciones directamente:\n`import { memo, useMemo, useCallback } from 'react';`",
    },
  ],

  theory: {
    title: "Optimización y Memorización en React",
    content: `
**¿Por qué es importante?**
Por defecto, cuando el estado de un componente cambia, React vuelve a renderizar **todos** sus hijos. En una lista de 500 elementos, esto significa 500 cálculos innecesarios en cada pulsación de tecla, lo que provoca lag y una mala experiencia de usuario.

**1. Técnicas comunes:**
- **React.memo:** Un componente de orden superior que "salta" el renderizado si las props son iguales a las anteriores.
- **useMemo:** Memoriza el **resultado** de una función (un valor o arreglo filtrado).
- **useCallback:** Memoriza la **definición** de una función para mantener su referencia estable.

**2. Anti-patrones comunes:**
- ❌ **Optimización prematura:** No memorices todo "por si acaso". La memorización tiene un costo de memoria; úsala solo cuando detectes lentitud.
- ❌ **Funciones Inline en Props:** Pasar \`onClick={() => doSomething()}\` rompe \`React.memo\` porque la función es "nueva" en cada render.
- ⚠️ **Dependencias vacías incorrectas:** Si usas un valor dentro de un \`useCallback\` pero no lo pones en su arreglo de dependencias, la función usará un valor "viejo" (stale).

**3. Ventajas de las buenas prácticas:**
- **Fluidez total:** El input de búsqueda responde instantáneamente sin importar el tamaño de la lista.
- **Ahorro de recursos:** Menos uso de CPU, especialmente importante en dispositivos móviles.
- **Escalabilidad:** Tu aplicación podrá manejar miles de datos sin degradar la experiencia.

**4. Ejemplos de código:**

✅ **Correcto (Componente Optimizado):**
\`\`\`javascript
const ListItem = memo(({ data, onAction }) => {
  return <li onClick={onAction}>{data.name}</li>;
});
\`\`\`

❌ **Incorrecto (Re-renders innecesarios):**
\`\`\`javascript
// Se recrea en cada render de App y rompe el memo de los hijos
const handleSelect = () => console.log("Click"); 

return items.map(i => <Item key={i.id} onClick={handleSelect} />);
\`\`\`
`,
    examples: [
      "// Memorizar cálculo\nconst total = useMemo(() => slowCalc(data), [data]);",
      "// Memorizar componente\nexport default memo(MyComponent);",
    ],
  },

  files: {
    "/App.js": `import React, { useState, useMemo, useCallback } from 'react';
import './styles.css';

// 💡 Imagina que esta lista viene de una API pesada
const slowItems = Array.from({ length: 500 }, (_, i) => "Item " + i);

// 1. Crea aquí el componente ListItem y envuélvelo en React.memo

export default function App() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  // 2. Optimiza este filtrado con useMemo
  const filtered = slowItems.filter(item => 
    item.toLowerCase().includes(search.toLowerCase())
  );

  // 3. Crea una función handleSelect con useCallback
  const handleSelect = (item) => {
    setSelected(item);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Lista de Alto Rendimiento</h1>
      <p>Seleccionado: {selected || 'Ninguno'}</p>
      
      <input 
        type="text" 
        placeholder="Escribe rápido para probar el lag..." 
        value={search} 
        onChange={e => setSearch(e.target.value)} 
      />

      <ul>
        {filtered.map(item => (
          <li key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}`,

    "/styles.css": `
      input { padding: 12px; width: 100%; margin-bottom: 20px; border: 1px solid #ccc; border-radius: 4px; }
      ul { max-height: 300px; overflow-y: auto; border: 1px solid #eee; padding: 10px; list-style: none; }
      li { padding: 8px; border-bottom: 1px solid #fafafa; cursor: pointer; }
      li:hover { background: #f0f0f0; }
    `,
  },

  aiInstruction: `
El estudiante debe optimizar el rendimiento de una lista grande.

LISTA DE CHEQUEO:
1. ¿Creó un componente separado para el item de la lista?
2. ¿Usó React.memo() (o memo de la importación) en el componente del item?
   - ❌ Si no lo hizo: "⚠️ Cada item se sigue renderizando al escribir. Usa React.memo en el componente del item para evitar esto."
3. ¿Usó useMemo para el filtrado de la lista?
   - 💡 Si no lo hizo: "Tip: El filtrado es una operación que no debería repetirse si el término de búsqueda es el mismo. Usa useMemo."
4. ¿Usó useCallback para la función handleSelect?
   - ❌ Si pasa la función sin memorizar: "⚠️ Si no usas useCallback, la función cambia en cada render y rompe la optimización de React.memo en los hijos."
5. ¿Evitó console.logs excesivos en la versión final?

MENSAJE DE APROBACIÓN:
{ "aprobado": true, "mensaje": "✅ ¡Impresionante! Has dominado las herramientas de optimización de React. Tu aplicación ahora es fluida y eficiente, capaz de manejar grandes volúmenes de datos sin despeinarse." }
`,

  estimatedTime: 25,
  tags: ["performance", "memoization", "useMemo", "useCallback"],
};
