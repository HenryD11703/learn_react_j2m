// src/lib/registry.ts
import { Exercise } from "@/types";
import { contadorExercise } from "@/content/react-basics/01-contador";

const exercises: Exercise[] = [
  contadorExercise,
  // futuroEjercicio2,
];

export function getExerciseBySlug(slug: string): Exercise | undefined {
  return exercises.find((ex) => ex.slug === slug);
}

export function getAllExercises() {
  return exercises.map((ex) => ({
    slug: ex.slug,
    title: ex.title,
    difficulty: ex.difficulty,
    completed: false,
  }));
}
