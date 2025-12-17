import { Exercise } from "@/types";

export const themeContextExercise: Exercise = {
  slug: "context-theme-switcher",
  title: "Context API: Theme Switcher",
  difficulty: "medium",

  objective:
    "Aprenderás a solucionar el problema del 'Prop Drilling' utilizando Context API, permitiendo que datos globales como el tema visual sean accesibles desde cualquier componente sin pasar props manualmente.",

  steps: [
    "Crea y exporta un Contexto llamado `ThemeContext` usando `createContext()`.",
    "Implementa el componente `ThemeProvider` que gestione el estado del tema ('light' o 'dark').",
    "Asegúrate de que el `ThemeProvider` pase tanto el valor del tema como la función para cambiarlo a través de la prop `value`.",
    "Envuelve los componentes de nivel superior en `App.js` con tu nuevo `ThemeProvider`.",
    "Consume el contexto en `Navbar.js` y `Content.js` utilizando el Hook `useContext`.",
  ],

  hints: [
    {
      question: "¿Cómo inicializo el contexto?",
      answer:
        "No olvides que `createContext()` suele ir fuera de tus componentes. \n\n`export const ThemeContext = createContext();` \n\n💡 Tip: Puedes pasarle un valor por defecto, pero lo más común es dejarlo vacío y llenarlo en el Provider.",
    },
    {
      question: "¿Qué debo pasar en la prop 'value'?",
      answer: `Debes pasar un objeto que contenga todo lo que tus hijos necesiten:
      
<ThemeContext.Provider value={{ theme, toggleTheme }}>
  {children}
</ThemeContext.Provider>`,
    },
    {
      question: "¿Cómo sé si estoy haciendo Prop Drilling?",
      answer:
        "⚠️ Si ves que un componente recibe una prop solo para pasársela a su hijo (sin usarla él mismo), ¡estás haciendo Prop Drilling! Context soluciona esto permitiendo que el hijo 'salte' directamente al dato.",
    },
    {
      question: "💡 Tip: ¿Por qué mi botón no cambia el tema?",
      answer:
        "Asegúrate de que el componente que usa `useContext` esté **dentro** de las etiquetas del `<ThemeProvider>`. Si está fuera, no podrá recibir la 'señal' del contexto.",
    },
  ],

  theory: {
    title: "Context API y el Fin del Prop Drilling",
    content: `
**¿Por qué es importante?**
A medida que tu aplicación crece, pasar datos (como el usuario logueado o el idioma) a través de 5 o 6 niveles de componentes se vuelve una pesadilla de mantenimiento. Context API actúa como un "portal" que permite emitir datos desde un punto central (Provider) y recibirlos en cualquier parte del árbol (Consumer).

**1. Técnicas comunes:**
- **Provider (Proveedor):** El componente que envuelve a los demás y "emite" los datos.
- **useContext:** El Hook que sintoniza esa emisión y nos da acceso directo a la información.
- **Estado dentro del Provider:** Manejar un \`useState\` dentro del componente Provider para que cualquier cambio actualice a todos los componentes suscritos.

**2. Anti-patrones comunes:**
- ❌ **Abusar de Context:** No todo debe ser global. Si un dato solo lo usan dos componentes hermanos, es mejor usar props o levantar el estado.
- ❌ **Prop Drilling innecesario:** Seguir pasando props manualmente cuando el dato es claramente global (como un tema visual).
- ⚠️ **Objetos pesados en el Value:** Si pasas un objeto muy grande que cambia constantemente, podrías causar re-renders innecesarios en toda la app.

**3. Ventajas de las buenas prácticas:**
- **Código desacoplado:** Tus componentes intermedios no necesitan saber nada sobre datos que no les incumben.
- **Mantenibilidad:** Si cambias la lógica del tema, solo tocas el archivo del Contexto.
- **Legibilidad:** El árbol de componentes en \`App.js\` queda mucho más limpio.

**4. Ejemplos de código:**

✅ **Correcto (Uso de Context):**
\`\`\`javascript
// Componente profundo
const theme = useContext(ThemeContext);
return <div className={theme}>Contenido</div>;
\`\`\`

❌ **Incorrecto (Prop Drilling):**
\`\`\`javascript
// Componente intermedio que no usa el tema pero debe pasarlo
function Layout({ theme, toggleTheme }) {
  return <Navbar theme={theme} toggleTheme={toggleTheme} />;
}
\`\`\`
`,
    examples: [
      "// Crear contexto\nconst UserContext = createContext();",
      "// Consumir contexto\nconst { user } = useContext(UserContext);",
      "// Estructura del Provider\n<ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>",
    ],
  },

  files: {
    "/App.js": `import React from 'react';
import Navbar from './components/Navbar';
import Content from './components/Content';
import { ThemeProvider } from './context/ThemeContext';
import './styles.css';

export default function App() {
  // 💡 Tip: Envuelve Navbar y Content con el Provider adecuado
  return (
    <div className="app-container">
      <Navbar />
      <Content />
    </div>
  );
}`,

    "/context/ThemeContext.js": `import React, { createContext, useState } from 'react';

// 1. Crea y exporta el contexto
export const ThemeContext = null; 

export function ThemeProvider({ children }) {
  // 2. Define el estado 'theme' ('light' por defecto)
  
  // 3. Define la función toggleTheme para alternar entre 'light' y 'dark'
  
  return (
    // 4. Envuelve a {children} con el Provider y pasa el value
    <>{children}</> 
  );
}`,

    "/components/Navbar.js": `import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function Navbar() {
  // 1. Obtén toggleTheme del contexto
  
  return (
    <nav className="navbar">
      <h1>Mi App</h1>
      <button onClick={() => { /* 2. Llama a la función aquí */ }}>
        Cambiar Tema
      </button>
    </nav>
  );
}`,

    "/components/Content.js": `import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function Content() {
  // 1. Obtén el 'theme' actual del contexto
  const theme = 'light'; 

  return (
    <main className={\`content \${theme}-mode\`}>
      <h2>Contenido Principal</h2>
      <p>Este bloque cambia de color gracias al Contexto.</p>
    </main>
  );
}`,

    "/styles.css": `
.app-container { font-family: sans-serif; height: 100vh; display: flex; flex-direction: column; }
.navbar { padding: 1rem; border-bottom: 1px solid #ccc; display: flex; justify-content: space-between; align-items: center; }
.content { flex: 1; padding: 2rem; transition: all 0.3s ease; }
.light-mode { background-color: #ffffff; color: #333; }
.dark-mode { background-color: #1a1a1a; color: #fff; }
button { padding: 8px 16px; cursor: pointer; border-radius: 4px; border: 1px solid #ccc; }
`,
  },

  aiInstruction: `
El estudiante debe implementar Context API para gestionar un tema global.

LISTA DE CHEQUEO:
1. ¿Creó el contexto con createContext() y lo exportó?
2. ¿ThemeProvider tiene un estado (useState) y una función para cambiarlo?
3. ¿Pasa un objeto { theme, toggleTheme } en la prop 'value' del Provider?
   - ❌ Si olvidó la prop 'value': "⚠️ El Provider necesita la prop 'value' para emitir los datos a sus hijos."
4. ¿En App.js envolvió los componentes con <ThemeProvider>?
   - ❌ Si pasó props manualmente (<Navbar theme={theme} />): "⚠️ ¡Eso es Prop Drilling! El objetivo es usar Context para NO pasar props manualmente en App.js."
5. ¿Usa useContext en Navbar.js y Content.js correctamente?

MENSAJE DE APROBACIÓN:
{ "aprobado": true, "mensaje": "✅ ¡Excelente! Has dominado Context API. Ahora puedes 'teletransportar' datos a través de tu aplicación, manteniendo tus componentes limpios y fáciles de mantener." }
`,

  estimatedTime: 20,
  tags: ["context-api", "hooks", "global-state", "architecture"],
};
