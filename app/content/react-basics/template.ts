import { Exercise } from "@/types";
// Usar estos iconos ⚠️ ❌ ✅ para poner lo que esta bien o mal... o lo que dara problemas
// este para tips dentro del codigo, no los hints directamente 💡
export const Example: Exercise = {
  slug: "nombre slug para la ruta",
  title: "titulo",
  difficulty: "easy",

  objective: "Empieza con un verbo asi como Aprenderás, o Optimizarás.",

  steps: [
    "Aca pones los pasos que el estudiante debe seguir para completar el ejercicio.",
    "Cada paso debe ser claro y concreto.",
    "Usa verbos en imperativo.",
    "No des demasiados detalles, solo lo necesario para guiar al estudiante.",
  ],

  hints: [
    {
      question:
        "¿Como hago algo... aca pon una pregunta que el estudiante podria tener",
      answer: `Aqui pones la respuesta a la pregunta anterior, puede incluir codigo si es necesario.`,
    },
    {
      question:
        "mas pistas que el estudiante podria necesitar, un ejemplo abajo:",
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
  ],

  theory: {
    // Aca va la teoria, todo lo que el estudiante debe aprender antes de hacer el ejercicio
    title: "Renderizado Condicional en React",
    // El contenido tiene que estar en markdown
    // Y contendra texto que explique el porque y como se usa el tema del ejercicio
    // Contiene ejemplos de codigo en bloques de ```javascript con el escape correcto
    // Utilizar los iconos de advertencia y correcto donde sea necesario

    // El orden tiene que ser
    // 1. Explicacion del tema
    // 2. Tecnicas comunes
    // 3. Anti-patrones comunes
    // 4. Ventajas de las buenas practicas
    // 5. Ejemplos de codigo

    // Si no se puede cumplir el patron por el tema del ejercicio esta bien, pero explicarlo
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
  // Esto son los archivos que el estudiante vera y editara
  // Puedes añadir multiples archivos si es necesario
  // Si hay varios archivos, el principal debe ser "App.js"
  // se puede especificar una ruta pero tiene que ser en la raiz /App.js
  // se puede añadir otro archivo asi como
  // "/hooks/useFetch.js": "codigo..."
  // Al igual que estilos "/styles.css": "codigo..."
  // Y al importarlos en App.js usar la ruta completa
  // asi: import { useFetch } from "./hooks/useFetch";
  files: {
    "App.js": `import React, { useState } from 'react';

    export default function TodoList() {
    // Crea aquí tu estado con un array de tareas
    // Ejemplo: [{ id: 1, texto: "Aprender React" }, ...]
    
    // Función para eliminar tarea
    const eliminarTarea = (id) => {
        // Tu código aquí
    };
    
    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '500px' }}>
        <h1>Mi Lista de Tareas</h1>
        <div style={{ marginTop: '20px' }}>
            {/* Renderiza aquí tu lista de tareas usando .map() */}
            {/* Cada tarea debe tener un botón de eliminar */}
        </div>
        </div>
    );
    }`,
  },
  // Esta es la instruccion para la IA que revisara el codigo del estudiante
  // Actuaolmente es Llama-3 con Groq
  // Aca especificas que debe revisar y como, advertencias y cosas que tiene que tener en cuenta
  // Tratar a la IA como que fueras tu mismo con una lista de chequeo
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
  // La respuesta de la IA se puede especificar aqui tambien, pero la IA siempre devolvera un JSON con la estructura
  // { aprobado: boolean, mensaje: string }
  // estimatedTime es el tiempo estimado en minutos que le tomara al estudiante completar el ejercicio
  estimatedTime: 12,
  // tags son las etiquetas que ayudan a categorizar el ejercicio
  tags: ["choose", "the", "tags"],
};

// Tambien para futuros ejercicios hay archivos que pueden estar ocultos
// Consultar el tipo Exercise en /types/index.ts para mas detalles
// Y seria para ejercicios en los que el estudiante no debe ver todo el codigo
// Por ejemplo un ejercicio de optimizacion donde el estudiante debe mejorar
// un codigo ya existente, pero no ver todo el codigo fuente
