"use client";
import { useState } from "react";
import { Exercise } from "@/types";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import {
  Clock,
  Target,
  List,
  Lightbulb,
  BookOpen,
  Code,
  Eye,
  Save,
  FileText,
} from "lucide-react";

interface Props {
  exercise: Exercise;
}

export default function ExerciseSidebar({ exercise }: Props) {
  const [activeTab, setActiveTab] = useState<"exercise" | "theory">("exercise");
  const [expandedHints, setExpandedHints] = useState<Set<number>>(new Set());

  const difficultyColors = {
    easy: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    hard: "bg-rose-500/10 text-rose-400 border-rose-500/20",
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
    <div className="h-full w-140 flex-shrink-0 flex flex-col bg-black border-l border-white/10">
      <div className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-black/95 backdrop-blur-sm border-b border-white/10 px-6 py-4 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span
              className={`text-xs px-2 py-1 rounded-full border capitalize ${
                difficultyColors[exercise.difficulty]
              }`}
            >
              {exercise.difficulty}
            </span>
            {exercise.estimatedTime && (
              <span className="flex items-center gap-1.5 text-xs text-gray-400">
                <Clock className="w-3.5 h-3.5" />~{exercise.estimatedTime} min
              </span>
            )}
          </div>
          <h2 className="text-lg font-bold text-white leading-tight">
            {exercise.title}
          </h2>
        </div>

        <div className="flex gap-2 px-6 py-4 bg-white/[0.02]">
          <button
            onClick={() => setActiveTab("exercise")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === "exercise"
                ? "bg-white text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <FileText className="w-4 h-4" />
            Ejercicio
          </button>
          {exercise.theory && (
            <button
              onClick={() => setActiveTab("theory")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === "theory"
                  ? "bg-white text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Teoría
            </button>
          )}
        </div>

        <div className="px-6 py-4">
          {activeTab === "exercise" ? (
            <>
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-400" />
                  Tu Misión
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {exercise.objective}
                </p>
              </div>

              <div className="space-y-3 mt-6">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <List className="w-5 h-5 text-purple-400" />
                  Pasos a Seguir
                </h3>
                {exercise.steps.map((step, index) => (
                  <div
                    key={index}
                    className="flex gap-3 p-3 rounded-lg bg-white/5 border border-white/10"
                  >
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white">
                      {index + 1}
                    </span>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>

              {exercise.hints && exercise.hints.length > 0 && (
                <div className="space-y-3 mt-6">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    Pistas
                  </h3>
                  {exercise.hints.map((hint, index) => (
                    <div key={index} className="space-y-2">
                      <button
                        onClick={() => toggleHint(index)}
                        className="w-full text-left p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-300">
                            {hint.question}
                          </span>
                          <span className="text-white font-bold text-lg">
                            {expandedHints.has(index) ? "-" : "+"}
                          </span>
                        </div>
                      </button>
                      {expandedHints.has(index) && (
                        <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
                          <pre className="text-xs text-gray-300 whitespace-pre-wrap font-mono">
                            {hint.answer}
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            exercise.theory && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">
                  {exercise.theory.title}
                </h3>
                <MarkdownRenderer content={exercise.theory.content} />
                {exercise.theory.examples && (
                  <div className="mt-6 space-y-3">
                    <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Code className="w-5 h-5 text-green-400" />
                      Ejemplos
                    </h4>
                    {exercise.theory.examples.map((example, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg bg-white/5 border border-white/10"
                      >
                        <pre className="text-xs text-gray-300 whitespace-pre-wrap font-mono overflow-x-auto">
                          {example}
                        </pre>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>

      <div className="px-6 py-4 bg-white/[0.02] border-t border-white/10 text-xs text-gray-400 space-y-1.5">
        <div className="flex items-center gap-2">
          <Eye className="w-3.5 h-3.5" />
          Preview actualiza en tiempo real
        </div>
        <div className="flex items-center gap-2">
          <Save className="w-3.5 h-3.5" />⌘ + S Guardar y verificar
        </div>
      </div>
    </div>
  );
}
