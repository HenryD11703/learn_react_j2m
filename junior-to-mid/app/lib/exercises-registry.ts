// src/lib/registry.ts
import { Exercise } from "@/types";
import { contadorExercise } from "@/content/react-basics/01-contador";

// Aquí irás agregando tus ejercicios nuevos a la lista
const exercises: Exercise[] = [
  contadorExercise,
  // futuroEjercicio2,
  // futuroEjercicio3...
];

export function getExerciseBySlug(slug: string): Exercise | undefined {
  return exercises.find((ex) => ex.slug === slug);
}
