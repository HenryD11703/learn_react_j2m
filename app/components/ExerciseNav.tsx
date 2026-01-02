"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Home,
  List,
  Github,
  CheckCircle,
  Play,
  Settings,
  Menu,
} from "lucide-react";

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
    easy: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    medium: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    hard: "text-rose-400 border-rose-500/30 bg-rose-500/10",
  };

  return (
    <>
      {/* --- ACTIVITY BAR (Col 1) --- */}
      <aside className="w-16 h-full bg-[#050505] border-r border-white/10 flex flex-col items-center py-4 z-[60] flex-shrink-0 relative">
        <div className="flex flex-col gap-6">
          <Link
            href="/"
            className="p-2 text-gray-400 hover:text-white transition-colors"
            title="Home"
          >
            <Home size={24} strokeWidth={1.5} />
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 transition-colors relative ${
              isOpen ? "text-white" : "text-gray-400 hover:text-white"
            }`}
            title="Exercises Explorer"
          >
            <List size={24} strokeWidth={1.5} />
            {isOpen && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 bg-white rounded-r-full" />
            )}
          </button>
        </div>

        <div className="mt-auto flex flex-col gap-6">
          <a
            href="https://github.com/henryd11703/learn_react_j2m"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-400 hover:text-white transition-colors"
            title="GitHub"
          >
            <Github size={24} strokeWidth={1.5} />
          </a>
        </div>
      </aside>

      {/* --- EXPLORER DRAWER (Slides out next to bar) --- */}
      {/* Overlay for closing */}
      {isOpen && (
        <div
          className="fixed inset-0 left-16 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer Content */}
      <div
        className={`absolute left-16 top-0 h-full w-80 bg-[#0F0F0F] border-r border-white/10 z-50 transition-all duration-300 shadow-2xl ${
          isOpen
            ? "translate-x-0 opacity-100 visible"
            : "-translate-x-full opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-5 border-b border-white/10">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
              Explorer
            </h2>
            <div className="flex gap-2">
              {["all", "easy", "medium", "hard"].map((level) => (
                <button
                  key={level}
                  onClick={() => setFilterDifficulty(level)}
                  className={`px-2.5 py-1 rounded text-[10px] font-medium uppercase tracking-wide border transition-all ${
                    filterDifficulty === level
                      ? "bg-white text-black border-white"
                      : "bg-transparent text-gray-500 border-transparent hover:text-gray-300 hover:bg-white/5"
                  }`}
                >
                  {level === "all" ? "All" : level}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            {filteredExercises.map((exercise) => (
              <Link
                key={exercise.slug}
                href={`/ejercicios/${exercise.slug}`}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center gap-3 p-2 rounded-md mb-1 transition-all border border-transparent ${
                  currentSlug === exercise.slug
                    ? "bg-indigo-500/10 border-indigo-500/20"
                    : "hover:bg-white/5"
                }`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    exercise.completed
                      ? "bg-emerald-500"
                      : "bg-gray-700 group-hover:bg-gray-500"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <h3
                    className={`text-sm truncate ${
                      currentSlug === exercise.slug
                        ? "text-indigo-300 font-medium"
                        : "text-gray-400 group-hover:text-gray-200"
                    }`}
                  >
                    {exercise.title}
                  </h3>
                </div>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded border capitalize ${
                    difficultyColors[exercise.difficulty]
                  }`}
                >
                  {exercise.difficulty}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
