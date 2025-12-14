"use client";

import { useState } from "react";
import { Exercise } from "@/types";

interface Props {
  exercise: Exercise;
}

export default function ExerciseSidebar({ exercise }: Props) {
  const [activeTab, setActiveTab] = useState<"exercise" | "theory">("exercise");
  const [expandedHints, setExpandedHints] = useState<Set<number>>(new Set());

  const difficultyColors = {
    junior: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    mid: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    senior: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  };

  const toggleHint = (index: number) => {
    setExpandedHints((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className="w-full md:w-[420px] flex flex-col border-r border-white/10 bg-[#0F0F0F]">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`px-3 py-1 rounded-md border text-xs font-medium uppercase tracking-wider ${
              difficultyColors[exercise.difficulty]
            }`}
          >
            {exercise.difficulty}
          </div>
          {exercise.estimatedTime && (
            <div className="text-xs text-gray-500">
              ⏱️ ~{exercise.estimatedTime} min
            </div>
          )}
        </div>

        <h1 className="text-2xl font-semibold mb-2 leading-tight">
          {exercise.title}
        </h1>

        {/* Tabs */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setActiveTab("exercise")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "exercise"
                ? "bg-white text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            📋 Ejercicio
          </button>
          {exercise.theory && (
            <button
              onClick={() => setActiveTab("theory")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "theory"
                  ? "bg-white text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              📚 Teoría
            </button>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {activeTab === "exercise" ? (
          <div className="space-y-6">
            {/* Objetivo */}
            <div>
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
                Tu Misión
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {exercise.objective}
              </p>
            </div>

            {/* Steps */}
            <div>
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
                Pasos a Seguir
              </h2>
              <div className="space-y-3">
                {exercise.steps.map((step, index) => (
                  <div
                    key={index}
                    className="flex gap-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-colors"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed flex-1">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hints expandibles */}
            {exercise.hints && exercise.hints.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
                  💡 Pistas
                </h2>
                <div className="space-y-2">
                  {exercise.hints.map((hint, index) => (
                    <button
                      key={index}
                      onClick={() => toggleHint(index)}
                      className="w-full text-left p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">
                          {hint.question}
                        </span>
                        <span className="text-gray-500 text-lg">
                          {expandedHints.has(index) ? "-" : "+"}
                        </span>
                      </div>
                      {expandedHints.has(index) && (
                        <div className="mt-3 pt-3 border-t border-white/10">
                          <pre className="text-xs text-emerald-400 font-mono whitespace-pre-wrap bg-black/30 p-3 rounded">
                            {hint.answer}
                          </pre>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          // Tab de Teoría
          exercise.theory && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  {exercise.theory.title}
                </h2>
                <div className="prose prose-invert prose-sm max-w-none">
                  <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {exercise.theory.content}
                  </div>
                </div>
              </div>

              {exercise.theory.examples && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
                    Ejemplos
                  </h3>
                  <div className="space-y-2">
                    {exercise.theory.examples.map((example, index) => (
                      <pre
                        key={index}
                        className="text-sm text-emerald-400 font-mono bg-black/30 p-3 rounded border border-white/10"
                      >
                        {example}
                      </pre>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        )}
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-white/10 bg-[#0A0A0A] space-y-2">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Preview actualiza en tiempo real</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>⌘ + S</span>
          <span>Guardar y verificar</span>
        </div>
      </div>
    </div>
  );
}
