export type Difficulty = "junior" | "mid" | "senior";

export interface Hint {
  question: string;
  answer: string;
}

export interface Exercise {
  slug: string;
  title: string;
  difficulty: Difficulty;

  // Contenido del ejercicio
  objective: string; // Descripción corta del objetivo
  steps: string[]; // Array de pasos a seguir
  hints?: Hint[]; // Pistas expandibles (opcional)

  // Teoría (opcional, para el futuro)
  theory?: {
    title: string;
    content: string; // Puede ser markdown
    examples?: string[]; // Ejemplos de código
  };

  // Configuración técnica
  startingCode: string;
  aiInstruction: string;

  // Metadata adicional
  estimatedTime?: number; // En minutos
  tags?: string[]; // ["hooks", "state", "events"]
}
