import { Exercise } from "@/types";

export const performanceListExercise: Exercise = {
  slug: "performance-list-memo",
  title: "Performance: Lista Lenta (El Jefe Final)",
  difficulty: "hard",

  objective:
    "Aprenderás a optimizar listas grandes evitando re-renders innecesarios. Usarás React.memo para los items y useCallback/useMemo para funciones y cálculos.",

  steps: [
    "Analiza el componente `App.js` y nota cómo cada letra que escribes en el input provoca que toda la lista se re-renderice.",
    "Crea un componente separado `ListItem` para cada elemento de la lista.",
    "Envuelve `ListItem` con `React.memo` para memorizar su renderizado.",
    "Usa `useCallback` para la función que maneja clicks o acciones de cada item.",
    "Si hay cálculos pesados en la lista, usa `useMemo` para memorizarlos y evitar recalcularlos en cada render.",
    "Prueba escribiendo en el input: la lista debería mantenerse rápida incluso con muchos items.",
  ],

  hints: [
    {
      question: "¿Cómo uso React.memo?",
      answer: `const ListItem = React.memo(({ item, onClick }) => {
  console.log("Renderizando:", item);
  return <li onClick={() => onClick(item)}>{item}</li>;
});`,
    },
    {
      question: "¿Cómo usar useCallback para funciones?",
      answer: `const handleClick = useCallback((item) => {
  console.log("Click en:", item);
}, []);`,
    },
    {
      question: "¿Cuándo usar useMemo?",
      answer: `// Para cálculos pesados que no quieres rehacer en cada render
const filteredList = useMemo(() => {
  return list.filter(item => item.includes(search));
}, [list, search]);`,
    },
  ],

  theory: {
    title: "Optimización de Renderizados en React",
    content: `
Cuando React renderiza un componente:
- Todos los hijos se renderizan de nuevo por defecto.
- Incluso si el contenido no cambió, React recalcula y vuelve a dibujar.

**Herramientas para optimizar:**
1. **React.memo**: Memoriza un componente y evita re-render si sus props no cambian.
2. **useCallback**: Memoriza funciones para que los hijos que dependen de ellas no se re-rendericen.
3. **useMemo**: Memoriza valores o cálculos costosos, solo recalculando si cambian dependencias.

**Práctica común:**
- Listas largas con inputs de búsqueda
- Tablas con muchas filas
- Componentes con cálculos pesados

Objetivo: que la UI se sienta instantánea y no bloquee al usuario.`,
    examples: [
      "// Memoización de componente\nconst Item = React.memo(({ name }) => <li>{name}</li>);",
      "// Memoización de función\nconst handleClick = useCallback(() => {}, [deps]);",
      "// Memoización de valor\nconst total = useMemo(() => compute(list), [list]);",
    ],
  },

  files: {
    "/App.js": `import React, { useState } from 'react';
import './styles.css';

const slowItems = Array.from({ length: 500 }, (_, i) => "Item " + i);

export default function App() {
  const [search, setSearch] = useState("");

  // ❌ Cada cambio en search re-renderiza toda la lista

  const filtered = slowItems.filter(item => item.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ padding: '20px' }}>
      <h1>Lista Lenta</h1>
      <input 
        type="text" 
        placeholder="Buscar..." 
        value={search} 
        onChange={e => setSearch(e.target.value)} 
      />
      <ul>
        {filtered.map(item => (
          <li key={item}>
            {item} (simulando render pesado)
            {console.log("Renderizando:", item)}
          </li>
        ))}
      </ul>
    </div>
  );
}`,

    "/styles.css": `
      input { padding: 8px; width: 100%; margin-bottom: 12px; }
      ul { max-height: 400px; overflow-y: auto; }
      li { padding: 4px; border-bottom: 1px solid #ccc; }
    `,
  },

  aiInstruction: `
El estudiante debe optimizar la lista usando:
1. React.memo para los items
2. useCallback para funciones pasadas como props
3. useMemo para valores filtrados o cálculos pesados

Criterios de aprobación:
- La lista no se re-renderiza innecesariamente al escribir en el input
- Cada item es un componente separado y memoizado
- Funciones y cálculos que dependen de props/estado están memoizados

Errores comunes:
- No separar los items en un componente -> reprueba
- No usar React.memo en items -> reprueba
- Usar funciones inline sin useCallback -> reprueba
- Filtrado pesado recalculado en cada render sin useMemo -> reprueba
`,

  estimatedTime: 25,
  tags: ["performance", "memo", "useCallback", "useMemo", "lists"],
};
