"use client";

import { useState } from "react";
import Link from "next/link";

interface Exercise {
  slug: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  completed?: boolean;
}

interface Props {
  exercises: Exercise[];
  currentSlug: string;
}

export default function ExerciseNav({ exercises, currentSlug }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [filterDifficulty, setFilterDifficulty] = useState<string>("all");

  const filteredExercises =
    filterDifficulty === "all"
      ? exercises
      : exercises.filter((ex) => ex.difficulty === filterDifficulty);

  const difficultyColors = {
    easy: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    hard: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-sm transition-all"
        aria-label="Toggle exercises menu"
      >
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-80 bg-[#0F0F0F] border-r border-white/10 z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Ejercicios</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex gap-2">
            {["all", "junior", "mid", "senior"].map((level) => (
              <button
                key={level}
                onClick={() => setFilterDifficulty(level)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  filterDifficulty === level
                    ? "bg-white text-black"
                    : "bg-white/5 text-gray-400 hover:text-white"
                }`}
              >
                {level === "all" ? "Todos" : level}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100%-120px)] p-4 space-y-2">
          {filteredExercises.map((exercise) => (
            <Link
              key={exercise.slug}
              href={`/ejercicios/${exercise.slug}`}
              onClick={() => setIsOpen(false)}
              className={`block p-4 rounded-lg border transition-all ${
                currentSlug === exercise.slug
                  ? "bg-white/10 border-white/20"
                  : "bg-white/5 border-white/10 hover:bg-white/[0.07]"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-white mb-2">
                    {exercise.title}
                  </h3>
                  <div
                    className={`inline-block px-2 py-0.5 rounded text-xs ${
                      difficultyColors[exercise.difficulty]
                    }`}
                  >
                    {exercise.difficulty}
                  </div>
                </div>
                {exercise.completed && (
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
