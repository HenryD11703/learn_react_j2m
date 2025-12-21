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
Sigue este orden cuando aplique:
1. ¿Por qué es importante? (motivación)
2. Conceptos clave
3. Técnicas/patrones recomendados
4. Anti-patrones comunes (con ❌)
5. Ejemplos cortos

### 4. Hints
- Pregunta común del estudiante mientras hace el ejercicio
- Respuesta con código mínimo viable
- Usa snippets, no soluciones completas

### 5. AI Instruction
**Importante**: La validación NO es bloqueante actualmente, pero debe ser lo más precisa posible.
- Sé específico en los criterios
- Anticipa errores comunes
- Da feedback constructivo
- Formato de respuesta: `{ aprobado: boolean, mensaje: string }`

### 6. Files
```javascript
files: {
  "/App.js": `...`,              // Principal
  "/hooks/useCustom.js": `...`,  // Subdirectorios
  "/styles.css": `...`,          // Estilos
}
```

## Iconos y Convenciones

Utiliza estos iconos para mejorar la claridad:

- ⚠️ Advertencias importantes
- ❌ Código/patrón incorrecto
- ✅ Código/patrón correcto
- 💡 Tips opcionales o mejoras

## Checklist antes de PR

- [ ] El ejercicio funciona en el sandbox
- [ ] `aiInstruction` validado con casos de éxito/error
- [ ] Hints no revelan la solución completa
- [ ] Theory tiene ejemplos de código escapados correctamente