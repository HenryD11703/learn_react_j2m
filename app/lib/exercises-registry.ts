import { Exercise } from "@/types";
import { contadorExercise } from "@/content/react-basics/01-contador";
import { todoListExercise } from "@/content/react-basics/02-todo-list";
import { semaforoExercise } from "@/content/react-basics/03-semaforo";
import { cronometroFantasmaExercise } from "@/content/react-basics/04-cronometro-fantasma";
import { fetchingRobustoExercise } from "@/content/react-basics/05-fetching";
import { customHookExercise } from "@/content/react-basics/06-custom-hooks";
import { themeContextExercise } from "@/content/react-basics/07-theme-switcher";
import { performanceListExercise } from "@/content/react-basics/09-performance";
import { controlledFormsExercise } from "@/content/react-basics/08-forms";
import { useRefExercise } from "@/content/react-basics/10-escapeDOM";
import { useReducerUndoExercise } from "@/content/react-basics/11-reducer";
import { liftingStateExercise } from "@/content/react-basics/12-lifting";

const exercises: Exercise[] = [
  // Easy
  contadorExercise,
  todoListExercise,
  semaforoExercise,
  liftingStateExercise,
  // Medium
  cronometroFantasmaExercise,
  fetchingRobustoExercise,
  customHookExercise,
  themeContextExercise,
  controlledFormsExercise,
  useRefExercise,
  // Hard
  performanceListExercise,
  useReducerUndoExercise,
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
