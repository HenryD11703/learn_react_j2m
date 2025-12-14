export type Difficulty = "junior" | "mid" | "senior";

// Esta es la "plantilla" que todo ejercicio debe respetar
export interface Exercise {
  slug: string; // La URL única (ej: "contador-simple")
  title: string; // El título que ve el usuario
  description: string; // Instrucciones (puede ser Markdown)
  difficulty: Difficulty;

  // Configuración técnica
  startingCode: string; // El código con el que empieza el alumno
  aiInstruction: string; // Lo que le mandaremos a Groq/Llama
}
