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
  FileText,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

interface Props {
  exercise: Exercise;
}

export default function ExerciseSidebar({ exercise }: Props) {
  const [activeTab, setActiveTab] = useState<"exercise" | "theory">("exercise");
  const [expandedHints, setExpandedHints] = useState<Set<number>>(new Set());

  const difficultyColors = {
    easy: "text-emerald-400 border-emerald-500/30",
    medium: "text-amber-400 border-amber-500/30",
    hard: "text-rose-400 border-rose-500/30",
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
    <div className="h-full flex flex-col bg-[#0A0A0A] border-r border-white/10 font-sans">
      {/* HEADER */}
      <div className="flex-none p-6 border-b border-white/10 bg-[#0A0A0A]">
        <div className="flex items-center gap-3 mb-3">
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
              difficultyColors[exercise.difficulty]
            }`}
          >
            {exercise.difficulty}
          </span>
          {exercise.estimatedTime && (
            <span className="flex items-center gap-1.5 text-xs text-gray-500 font-mono">
              <Clock className="w-3 h-3" />
              {exercise.estimatedTime}m
            </span>
          )}
        </div>
        <h1 className="text-xl font-bold text-white leading-tight">
          {exercise.title}
        </h1>
      </div>

      {/* TABS */}
      <div className="flex-none flex border-b border-white/10 bg-[#0A0A0A]">
        <button
          onClick={() => setActiveTab("exercise")}
          className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "exercise"
              ? "border-indigo-500 text-white"
              : "border-transparent text-gray-500 hover:text-gray-300"
          }`}
        >
          INSTRUCTIONS
        </button>
        {exercise.theory && (
          <button
            onClick={() => setActiveTab("theory")}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "theory"
                ? "border-indigo-500 text-white"
                : "border-transparent text-gray-500 hover:text-gray-300"
            }`}
          >
            THEORY
          </button>
        )}
      </div>

      {/* SCROLLABLE CONTENT */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {activeTab === "exercise" ? (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* OBJECTIVE */}
            <section className="space-y-3">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <Target className="w-4 h-4" /> Mission
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed border-l-2 border-indigo-500/50 pl-4">
                {exercise.objective}
              </p>
            </section>

            {/* STEPS */}
            <section className="space-y-4">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <List className="w-4 h-4" /> Tasks
              </h3>
              <div className="space-y-3">
                {exercise.steps.map((step, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-4 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-colors group"
                  >
                    <span className="flex-none w-6 h-6 flex items-center justify-center rounded bg-white/10 text-xs font-mono text-gray-400 group-hover:text-white group-hover:bg-indigo-500 transition-colors">
                      {index + 1}
                    </span>
                    <p className="text-sm text-gray-300 leading-relaxed font-medium">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* HINTS */}
            {exercise.hints && exercise.hints.length > 0 && (
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" /> Hints
                </h3>
                <div className="space-y-2">
                  {exercise.hints.map((hint, index) => (
                    <div
                      key={index}
                      className="border border-white/10 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleHint(index)}
                        className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 transition-colors text-left"
                      >
                        <span className="text-sm text-gray-300 font-medium">
                          {hint.question}
                        </span>
                        {expandedHints.has(index) ? (
                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-500" />
                        )}
                      </button>
                      {expandedHints.has(index) && (
                        <div className="p-4 bg-black border-t border-white/10">
                          <pre className="text-xs text-gray-400 whitespace-pre-wrap font-mono">
                            {hint.answer}
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in duration-300">
            {exercise.theory && (
              <>
                {/* Intro */}
                {exercise.theory.introduction && (
                  <section className="prose prose-invert prose-sm max-w-none text-gray-300">
                    <MarkdownRenderer content={exercise.theory.introduction} />
                  </section>
                )}

                {/* Good Practices */}
                {exercise.theory.goodPractices &&
                  exercise.theory.goodPractices.length > 0 && (
                    <section className="space-y-3">
                      <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-2 pb-2 border-b border-emerald-500/20">
                        <CheckCircle className="w-4 h-4" /> Best Practices
                      </h4>
                      <ul className="space-y-2">
                        {exercise.theory.goodPractices.map((practice, index) => (
                          <li
                            key={index}
                            className="text-sm text-gray-300 flex items-start gap-3"
                          >
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-500 flex-shrink-0" />
                            <div className="flex-1">
                              <MarkdownRenderer content={practice} />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}

                {/* Bad Practices */}
                {exercise.theory.badPractices &&
                  exercise.theory.badPractices.length > 0 && (
                    <section className="space-y-3">
                      <h4 className="text-xs font-bold text-rose-500 uppercase tracking-widest flex items-center gap-2 pb-2 border-b border-rose-500/20">
                        <XCircle className="w-4 h-4" /> Anti-Patterns
                      </h4>
                      <ul className="space-y-2">
                        {exercise.theory.badPractices.map((practice, index) => (
                          <li
                            key={index}
                            className="text-sm text-gray-300 flex items-start gap-3"
                          >
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-500 flex-shrink-0" />
                            <div className="flex-1">
                              <MarkdownRenderer content={practice} />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}

                {/* Examples */}
                {exercise.theory.examples && (
                  <section className="space-y-3">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                      <Code className="w-4 h-4" /> Examples
                    </h4>
                    <div className="space-y-4">
                      {exercise.theory.examples.map((example, index) => (
                        <div
                          key={index}
                          className="relative group rounded-lg overflow-hidden border border-white/10 bg-[#111]"
                        >
                          <div className="absolute top-2 right-2 flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                          </div>
                          <pre className="p-4 pt-8 text-xs text-gray-300 font-mono overflow-x-auto selection:bg-indigo-500/30">
                            {example}
                          </pre>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
