import { Exercise } from "@/types";

export const semaforoExercise: Exercise = {
  slug: "renderizado-condicional",
  title: "Renderizado Condicional: El Semáforo",
  difficulty: "easy",

  objective:
    "Aprenderás a renderizar diferentes elementos según el estado usando operadores ternarios, && y objetos de mapeo. Crearás un componente tipo semáforo que muestra diferentes mensajes, colores e iconos según su estado.",

  steps: [
    "Crea un estado `status` que puede ser 'success', 'error' o 'loading'",
    "Define un objeto de configuración que mapee cada estado a su color, icono y mensaje",
    "Renderiza el contenido dinámicamente basándote en el estado actual",
    "Agrega botones para cambiar entre los diferentes estados",
    "Usa operadores ternarios o && para renderizado condicional limpio",
  ],

  hints: [
    {
      question: "¿Cómo creo el estado para los diferentes status?",
      answer: `const [status, setStatus] = useState('loading');

Puedes cambiar entre: 'success', 'error', 'loading'`,
    },
    {
      question: "¿Cómo evito muchos if/else en el JSX?",
      answer: `Usa un objeto de mapeo:

const configs = {
  success: { color: 'green', icono: '✓', mensaje: 'Operación exitosa' },
  error: { color: 'red', icono: '✗', mensaje: 'Error al procesar' },
  loading: { color: 'orange', icono: '⟳', mensaje: 'Cargando...' }
};

Luego accede: configs[status].mensaje`,
    },
    {
      question: "¿Cuándo uso ternarios vs && ?",
      answer: `// Ternario: cuando hay dos opciones
{isLoggedIn ? <Dashboard /> : <Login />}

// &&: cuando solo renderizas si es true
{hasError && <ErrorMessage />}

// Objeto de mapeo: cuando hay 3+ opciones
{statusConfig[status].component}`,
    },
    {
      question: "¿Cómo aplico estilos dinámicos según el estado?",
      answer: `style={{ 
  backgroundColor: configs[status].color,
  color: 'white',
  padding: '20px'
}}

O puedes usar clases dinámicas:
className={\`alert alert-\${status}\`}`,
    },
  ],

  theory: {
    title: "Renderizado Condicional en React",
    content: `
**¿Por qué es importante?**
El renderizado condicional te permite mostrar diferentes UI según el estado de tu aplicación. Es fundamental para crear experiencias dinámicas.

**Técnicas de renderizado condicional:**

1. **Operador Ternario (? :)**
   - Perfecto para elegir entre dos opciones
   - Sintaxis: condición ? valorSiTrue : valorSiFalse

2. **Operador AND (&&)**
   - Renderiza solo si la condición es true
   - Sintaxis: condición && <Componente />
   - ⚠️ Cuidado con valores falsy (0, '', false)

3. **Objetos de Mapeo**
   - Ideal para 3+ estados diferentes
   - Evita "spaghetti code" con muchos if/else
   - Más mantenible y escalable

**Anti-patrón: If/Else en JSX**
❌ Evita esto:
\`\`\`javascript
return (
  <div>
    {if (status === 'success') { // ❌ No funciona
      return <Success />
    }}
  </div>
)
\`\`\`

✅ Mejor:
\`\`\`javascript
const configs = { success: {...}, error: {...} };
return <div>{configs[status].component}</div>
\`\`\`

**Ventajas del objeto de mapeo:**
- Código más limpio y legible
- Fácil de extender (agregar nuevos estados)
- Separa lógica de presentación
- Más fácil de testear
`,
    examples: [
      "// Ternario\n{isOnline ? <GreenDot /> : <GrayDot />}",
      "// AND operator\n{showModal && <Modal />}",
      "// Objeto de mapeo\nconst icons = { success: '✓', error: '✗' };\n<span>{icons[status]}</span>",
      "// Estilos dinámicos\nstyle={{ color: status === 'error' ? 'red' : 'green' }}",
    ],
  },

  files: {
    "App.js": `import React, { useState } from 'react';

export default function Semaforo() {
  // Crea tu estado aquí (puede ser 'success', 'error', o 'loading')
  
  // Define un objeto con la configuración de cada estado
  // Ejemplo: { success: { color: '...', icono: '...', mensaje: '...' } }
  
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Estado del Sistema</h1>
      
      {/* Renderiza aquí el estado actual con su color, icono y mensaje */}
      <div style={{ 
        padding: '30px', 
        borderRadius: '8px',
        textAlign: 'center',
        marginTop: '20px'
        // Agrega el color de fondo dinámico aquí
      }}>
        {/* Icono */}
        {/* Mensaje */}
      </div>
      
      {/* Botones para cambiar el estado */}
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        {/* Botón Success */}
        {/* Botón Error */}
        {/* Botón Loading */}
      </div>
    </div>
  );
}`,
  },

  aiInstruction: `
El estudiante debe crear un componente tipo semáforo con renderizado condicional limpio.

Verifica que:
1. Tenga un estado con al menos 3 valores posibles ('success', 'error', 'loading')
2. Use un objeto de mapeo/configuración en lugar de múltiples if/else
3. El objeto contenga al menos: color, icono/emoji, y mensaje para cada estado
4. Renderice dinámicamente el contenido basado en el estado actual
5. Tenga botones para cambiar entre los diferentes estados
6. Use renderizado condicional limpio (ternarios, &&, o acceso a objeto)

⚠️ ADVERTENCIAS SOBRE PATRONES:
- Si usa múltiples if/else dentro del return: "❌ Muchos if/else hacen el código difícil de leer. Considera usar un objeto de mapeo donde cada estado tenga su configuración."
- Si intenta usar if dentro del JSX directamente: "❌ No puedes usar if/else directamente en JSX. Usa ternarios (condición ? a : b), operador && (condición && <Component />), o un objeto de mapeo."
- Si no separa la configuración de la lógica de render: "💡 Tip: Define un objeto 'configs' fuera del return con toda la configuración de cada estado. Así tu JSX queda más limpio."

✅ Bonus points si:
- Usa template literals para clases dinámicas
- Aplica estilos inline dinámicos correctamente
- El código es limpio y mantenible

Si todo está correcto:
{ "aprobado": true, "mensaje": "¡Perfecto! Tu renderizado condicional es limpio y mantenible. Usas objetos de mapeo en lugar de if/else anidados, lo cual hace el código mucho más escalable." }

Si hay errores, señala específicamente el patrón problemático y sugiere la alternativa correcta sin dar el código completo.
`,

  estimatedTime: 12,
  tags: ["conditional-rendering", "ternary", "state", "dynamic-styles"],
};
