import { Exercise } from "@/types";

export const themeContextExercise: Exercise = {
  slug: "context-theme-switcher",
  title: "Context API: Theme Switcher",
  difficulty: "medium",

  objective:
    "Aprenderás a solucionar el 'Prop Drilling' usando Context API. Tu misión es crear un sistema de temas (Claro/Oscuro) que sea accesible desde cualquier parte de la aplicación sin pasar props manualmente componente por componente.",

  steps: [
    "En `ThemeContext.js`: Crea el contexto y el componente `ThemeProvider`.",
    "El `ThemeProvider` debe tener un estado ('light' o 'dark') y una función para alternarlo.",
    "En `App.js`: Envuelve toda la aplicación con tu `ThemeProvider`.",
    "En `Navbar.js`: Usa `useContext` para leer el tema actual y cambiar el texto del botón.",
    "En `Content.js`: Usa `useContext` para aplicar la clase CSS correcta ('light-mode' o 'dark-mode') al contenedor.",
  ],

  hints: [
    {
      question: "¿Cómo creo un Contexto?",
      answer:
        "import { createContext } from 'react';\n\nexport const ThemeContext = createContext();",
    },
    {
      question: "¿Qué debe devolver el ThemeProvider?",
      answer: `return (
  <ThemeContext.Provider value={{ theme, toggleTheme }}>
    {children}
  </ThemeContext.Provider>
);
// 'value' es lo que será accesible para todos los hijos.`,
    },
    {
      question: "¿Cómo consumo el contexto en un componente?",
      answer: `import { useContext } from 'react';\nimport { ThemeContext } from '../context/ThemeContext';\n\nconst { theme, toggleTheme } = useContext(ThemeContext);`,
    },
  ],

  theory: {
    title: "¿Qué es el Prop Drilling?",
    content: `
Imagina que tienes esta estructura:
\`App -> Navbar -> UserMenu -> Avatar\`

Si \`App\` tiene el dato del usuario y \`Avatar\` lo necesita, tienes que pasarlo por todos los componentes intermedios, aunque ellos no lo usen. Eso es **Prop Drilling**.

**Context API** soluciona esto permitiendo "teletransportar" datos.
1. **Provider:** Es como una antena que emite la señal (datos).
2. **Consumer (useContext):** Es como una radio que sintoniza la señal donde la necesites.

**¿Cuándo usarlo?**
- Temas (Dark/Light)
- Usuario autenticado
- Idioma / Localización
- Estado global de UI (Modales, Notificaciones)
`,
    examples: [
      "// En el padre\n<UserContext.Provider value={user}>{children}</UserContext.Provider>",
      "// En el hijo lejano\nconst user = useContext(UserContext);",
    ],
  },

  files: {
    "/App.js": `import React from 'react';
import Navbar from './components/Navbar';
import Content from './components/Content';
import { ThemeProvider } from './context/ThemeContext';
import './styles.css';

export default function App() {
  // ❌ NO pases props aquí (ej: <Navbar theme={theme} />)
  // ✅ Envuelve los componentes con el Provider
  
  return (
    <div className="app-container">
      <Navbar />
      <Content />
    </div>
  );
}`,

    "/context/ThemeContext.js": `import React, { createContext, useState } from 'react';

// 1. Crea el contexto aquí
export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // 2. Crea el estado 'theme' ('light' por defecto)
  
  // 3. Crea la función toggleTheme
  
  return (
    // 4. Retorna el Provider con los valores
    <>{children}</> 
  );
}`,

    "/components/Navbar.js": `import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function Navbar() {
  // Consuma el contexto aquí para obtener toggleTheme
  
  return (
    <nav className="navbar">
      <h1>Mi App</h1>
      <button onClick={() => {}}>
        Cambiar Tema
      </button>
    </nav>
  );
}`,

    "/components/Content.js": `import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function Content() {
  // Consuma el contexto aquí para obtener el tema ('light' o 'dark')
  const theme = 'light'; // Cambia esto por el contexto real

  return (
    <main className={\`content \${theme}-mode\`}>
      <h2>Contenido Principal</h2>
      <p>Este bloque debe cambiar de color según el tema.</p>
    </main>
  );
}`,

    "/styles.css": `
.app-container { font-family: sans-serif; height: 100vh; display: flex; flex-direction: column; }
.navbar { padding: 1rem; border-bottom: 1px solid #ccc; display: flex; justify-content: space-between; align-items: center; }
.content { flex: 1; padding: 2rem; transition: all 0.3s ease; }

/* Temas */
.light-mode { background-color: #ffffff; color: #333333; }
.dark-mode { background-color: #1a1a1a; color: #ffffff; }

button { padding: 8px 16px; cursor: pointer; }
`,
  },

  aiInstruction: `
El estudiante debe implementar un Theme Switcher usando Context API.

Evalúa los siguientes archivos concatenados: App.js, context/ThemeContext.js, components/Navbar.js, components/Content.js.

Criterios de Aprobación:
1. **ThemeContext.js**: Debe usar \`createContext\` y exportarlo. El \`ThemeProvider\` debe tener un estado (useState) y pasar \`{ theme, toggleTheme }\` (o nombres similares) en la prop \`value\`.
2. **App.js**: Debe envolver \`<Navbar />\` y \`<Content />\` dentro de \`<ThemeProvider>\`. NO debe pasar props de tema manualmente.
3. **Navbar.js**: Debe usar \`useContext(ThemeContext)\` para llamar a la función de toggle en el onClick.
4. **Content.js**: Debe usar \`useContext(ThemeContext)\` para cambiar la clase CSS dinámicamente.

Errores Comunes a detectar:
- Si el estudiante pasa props en App.js (ej: \`<Navbar theme={theme} />\`), REPRUEBA y explica que eso es prop drilling.
- Si olvida pasar el \`value\` en el Provider.
- Si no exporta el Contexto o el Provider correctamente.

Responde de forma alentadora si lo logra.
`,

  estimatedTime: 20,
  tags: ["context", "hooks", "architecture", "patterns"],
};
