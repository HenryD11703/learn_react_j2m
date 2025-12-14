// src/content/01-contador.ts
import { Exercise } from "@/types";

export const contadorExercise: Exercise = {
  slug: "contador-simple", // <--- Esto será parte de la URL
  title: "Intro: El Estado en React",
  difficulty: "junior",
  description: `
    ## Tu Misión
    Vamos a empezar por lo básico. Los componentes en React necesitan "recordar" cosas.
    
    1. Importa \`useState\` de React.
    2. Crea un estado inicializado en 0.
    3. Muestra el número en pantalla.
    4. Agrega un botón que sume +1 al hacer click.
  `,
  aiInstruction: `
    El estudiante debe crear un contador simple. 
    Verifica:
    1. Que use useState correctamente.
    2. Que el botón tenga un onClick.
    3. Que no mute el estado directamente (ej: count++ es prohibido).
  `,
  startingCode: `import React from 'react';

export default function Contador() {
  // 👻 Tu código va aquí
  
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Contador: ???</h1>
      {/* Agrega tu botón aquí */}
    </div>
  );
}`,
};
