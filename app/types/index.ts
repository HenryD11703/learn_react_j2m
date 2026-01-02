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
    introduction?: string;
    goodPractices?: string[];
    badPractices?: string[];
    examples?: string[];
  };

  // Configuración técnica
  files: Record<string, string>;
  hiddenFiles?: Record<string, string>;
  aiInstruction: string;

  // Metadata adicional
  estimatedTime?: number;
  tags?: string[]; // ["hooks", "state", "events"]
}
