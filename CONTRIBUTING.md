# Contribuir con Nuevos Ejercicios

## Estructura del Ejercicio

Lee la estructura del tipo `Ejercicio` en `/types/index.ts` para entender los campos necesarios.![alt text](image.png)
Copia el template desde `app/content/react-basics/template.ts` y rellena cada sección siguiendo las pautas:

### 1. Metadata básica
- **slug**: kebab-case, único
- **title**: Descriptivo y motivador
- **difficulty**: easy | medium | hard
- **estimatedTime**: Tiempo real que te tomó hacerlo + 50%

### 2. Objetivos y Steps
- **objective**: Empieza con verbo (Aprenderás, Crearás, Refactorizarás)
- **steps**: Máximo 5-7 pasos, verbos en imperativo

### 3. Teoría
Ahora la teoría es estructurada para estandarizar la UI:
- **introduction**: Breve explicación del concepto (Markdown soportado).
- **goodPractices**: Array de strings. Lista las mejores prácticas (se renderizan con ícono de check verde).
- **badPractices**: Array de strings. Lista los errores comunes (se renderizan con ícono de error rojo).
- **examples**: Snippets de código ilustrativos.

### 4. Hints
- Pregunta común del estudiante mientras hace el ejercicio
- Respuesta con código mínimo viable
- Usa snippets, no soluciones completas

### 5. AI Instruction
**Importante**: La validación usa un prompt del sistema estandarizado.
- En tu `aiInstruction`, solo describe lo que el estudiante DEBE cumplir.
- Provee una "Lista de Chequeo" clara para que la IA sepa qué buscar.
- No incluyas instrucciones de formato JSON ni emojis, la API ya se encarga de eso.

## Checklist antes de PR

- [ ] El ejercicio funciona en el sandbox
- [ ] `aiInstruction` validado con casos de éxito/error
- [ ] Hints no revelan la solución completa
- [ ] Theory tiene ejemplos de código escapados correctamente