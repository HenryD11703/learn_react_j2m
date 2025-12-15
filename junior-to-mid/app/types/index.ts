export type Difficulty = "easy" | "medium" | "hard";

export interface Hint {
  question: string;
  answer: string;
}

export interface Exercise {
  slug: string;
  title: string;
  difficulty: Difficulty;

  objective: string; // Descripción corta del objetivo
  steps: string[]; // Array de pasos a seguir
  hints?: Hint[]; // Pistas expandibles (opcional)

  // Teoría
  theory?: {
    title: string;
    content: string; // Puede ser markdown
    examples?: string[]; // Ejemplos de código
  };

  // Configuración técnica
  startingCode: string;
  aiInstruction: string;

  // Metadata adicional
  estimatedTime?: number;
  tags?: string[]; // ["hooks", "state", "events"]
}
