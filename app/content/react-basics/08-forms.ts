import { Exercise } from "@/types";

export const controlledFormsExercise: Exercise = {
  slug: "formularios-controlados",
  title: "Formularios: La Fuente de la Verdad",
  difficulty: "medium",

  objective:
    "Aprenderás a gestionar múltiples campos de entrada de forma eficiente, utilizando un único objeto de estado y transformando inputs normales en 'Componentes Controlados' por React.",

  steps: [
    "Crea un único estado llamado `formData` que sea un objeto con los campos: `nombre`, `email` y `rol`.",
    "Vincula el `value` de cada input al campo correspondiente de tu estado.",
    "Implementa una función de cambio genérica (`handleChange`) que use el atributo `name` de los inputs.",
    "Asegúrate de actualizar el estado de forma inmutable usando el operador spread (`...`).",
    "Evita el comportamiento por defecto del navegador al enviar el formulario con `e.preventDefault()`.",
  ],

  hints: [
    {
      question: "¿Cómo manejo varios inputs con una sola función?",
      answer: `Puedes usar las "Computed Property Names" de JavaScript:
      
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value // 💡 Aquí name coincide con la clave del objeto
  });
};`,
    },
    {
      question: "¿Por qué mi input no me deja escribir?",
      answer:
        "⚠️ Si vinculas el `value` de un input a un estado pero no le pones un `onChange`, el input se vuelve 'solo lectura'. React necesita que tú le digas cómo actualizar ese valor.",
    },
    {
      question: "¿Qué es eso del 'spread operator' en el estado?",
      answer: `Si haces \`setFormData({ nombre: value })\`, borrarás el email y el rol. 
      
✅ Usa \`...formData\` para copiar los datos actuales y luego sobrescribir solo el que cambió.`,
    },
    {
      question: "💡 Tip: ¿Atributo 'name'?",
      answer:
        "Asegúrate de que el atributo `name` del HTML coincida exactamente con la clave en tu objeto de estado (ej: `name='email'` para la clave `email`).",
    },
  ],

  theory: {
    title: "Componentes Controlados vs. No Controlados",
    content: `
**¿Por qué es importante?**
En la web tradicional, el DOM guarda el valor de los inputs. En React, queremos que **el Estado sea la única fuente de la verdad**. Esto nos permite validar datos al instante, formatear texto (como poner todo en mayúsculas) y deshabilitar botones de envío si falta información.

**1. Técnicas comunes:**
- **Estado de Objeto:** Agrupar campos relacionados en un solo objeto para evitar tener 10 \`useState\` diferentes.
- **Handler Genérico:** Una sola función que maneja todos los cambios basándose en el atributo \`name\` del input.
- **Input Controlado:** Sincronizar el \`value\` del input con el \`state\`.

**2. Anti-patrones comunes:**
- ❌ **Múltiples handlers:** Crear \`handleNombre\`, \`handleEmail\`, \`handlePassword\` por separado hace que el código crezca demasiado.
- ❌ **Mutar el estado:** Intentar hacer \`formData.nombre = 'Juan'\`. Recuerda que en React el estado es de "solo lectura" hasta que usas la función \`set\`.
- ⚠️ **Olvidar el preventDefault:** Si no lo usas, la página se recargará al enviar el formulario, perdiendo todo el estado de React.

**3. Ventajas de las buenas prácticas:**
- **Validación en tiempo real:** Puedes mostrar mensajes de error mientras el usuario escribe.
- **Limpieza de datos:** Es fácil resetear el formulario volviendo el objeto a su estado inicial.
- **Escalabilidad:** Añadir un nuevo campo al formulario solo requiere añadir una línea al objeto inicial y el input en el HTML.

**4. Ejemplos de código:**

✅ **Correcto (Handler Genérico):**
\`\`\`javascript
const [form, setForm] = useState({ user: '', pass: '' });

const onChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};
\`\`\`

❌ **Incorrecto (Handler redundante):**
\`\`\`javascript
const [user, setUser] = useState('');
// ... un handler por cada campo ...
\`\`\`
`,
    examples: [
      "// Prevenir recarga\nconst handleSubmit = (e) => { e.preventDefault(); console.log(form); };",
      "// Input controlado\n<input name='email' value={form.email} onChange={handleChange} />",
    ],
  },

  files: {
    "App.js": `import React, { useState } from 'react';

export default function FormularioRegistro() {
  // 1. Inicializa el estado 'formData' con nombre, email y rol
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    rol: 'desarrollador'
  });

  const handleChange = (e) => {
    // 2. Implementa la lógica genérica aquí
  };

  const handleSubmit = (e) => {
    // 3. Evita que la página se recargue y muestra los datos en consola
    alert("Datos enviados: " + JSON.stringify(formData));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '400px' }}>
      <h1>Registro de Usuario</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Nombre:</label>
          <input 
            type="text" 
            name="nombre" 
            style={{ width: '100%' }}
            // 4. Vincula value y onChange
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            style={{ width: '100%' }}
            // 5. Vincula value y onChange
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Rol:</label>
          <select name="rol" style={{ width: '100%' }}>
            <option value="desarrollador">Desarrollador</option>
            <option value="disenador">Diseñador</option>
            <option value="manager">Manager</option>
          </select>
        </div>

        <button type="submit" style={{ width: '100%', padding: '10px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px' }}>
          Registrar
        </button>
      </form>

      <div style={{ marginTop: '20px', fontSize: '0.8rem', color: '#666' }}>
        <strong>Vista previa del estado:</strong>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </div>
  );
}`,
  },

  aiInstruction: `
El estudiante debe implementar un formulario controlado con un único objeto de estado.

LISTA DE CHEQUEO:
1. ¿Usó un solo useState con un objeto { nombre, email, rol }?
2. ¿Los inputs tienen el atributo 'value' vinculado al estado?
3. ¿Implementó una función handleChange que usa [e.target.name]?
   - ❌ Si creó una función para cada input: "⚠️ Tu código es redundante. Intenta usar una sola función handleChange usando el atributo 'name' del input."
4. ¿Usó el operador spread (...prev o ...formData) al actualizar?
   - ❌ Si sobrescribe el objeto completo: "⚠️ Estás borrando los otros campos al escribir. Usa el operador spread (...formData) para mantener los valores anteriores."
5. ¿Usó e.preventDefault() en el submit?
   - ❌ Si no lo hizo: "⚠️ Al enviar el formulario la página se recarga. Usa e.preventDefault() para manejar el envío con React."

MENSAJE DE APROBACIÓN:
{ "aprobado": true, "mensaje": "✅ ¡Excelente! Has dominado los formularios controlados. Usar un solo objeto de estado y un handler genérico es la forma más limpia y profesional de manejar entradas de datos en React." }
`,

  estimatedTime: 15,
  tags: ["forms", "state", "controlled-components", "events"],
};
