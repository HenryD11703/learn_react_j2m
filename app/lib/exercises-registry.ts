import { Exercise } from "@/types";
import { contadorExercise } from "@/content/react-basics/01-contador";
import { todoListExercise } from "@/content/react-basics/02-todo-list";
import { semaforoExercise } from "@/content/react-basics/03-semaforo";
import { cronometroFantasmaExercise } from "@/content/react-basics/04-cronometro-fantasma";
import { fetchingRobustoExercise } from "@/content/react-basics/05-fetching";
import { customHookExercise } from "@/content/react-basics/06-custom-hooks";
import { themeContextExercise } from "@/content/react-basics/07-theme-switcher";
import { performanceListExercise } from "@/content/react-basics/09-performance";

const exercises: Exercise[] = [
  contadorExercise,
  todoListExercise,
  semaforoExercise,
  cronometroFantasmaExercise,
  fetchingRobustoExercise,
  customHookExercise,
  themeContextExercise,
  performanceListExercise,
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
