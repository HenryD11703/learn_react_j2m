"use client";
import { useSandpack } from "@codesandbox/sandpack-react";
import { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Terminal,
  ChevronUp,
  ChevronDown,
  Loader2,
  Play,
  Maximize2,
  Minimize2,
} from "lucide-react";

interface Props {
  instruction: string;
}

interface Feedback {
  aprobado: boolean;
  cosasBuenas: string[];
  cosasMalas: string[];
  revisar: string[];
  mensajeGeneral: string;
}

export default function ReviewPanel({ instruction }: Props) {
  const { sandpack } = useSandpack();
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Auto-expand on feedback, auto-collapse on new check start
  useEffect(() => {
    if (feedback) setIsExpanded(true);
  }, [feedback]);

  const handleCheck = async () => {
    setLoading(true);
    setFeedback(null);
    setIsExpanded(true); // Open to show loading state

    let allCode = "";
    Object.entries(sandpack.files).forEach(([fileName, fileData]) => {
      if (!fileData.hidden) {
        allCode += `\n--- ARCHIVO: ${fileName} ---\n`;
        allCode += fileData.code;
      }
    });

    try {
      const res = await fetch("/api/revisar-codigo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userCode: allCode,
          exerciseInstruction: instruction,
        }),
      });

      const data = await res.json();
      setFeedback(data);
    } catch (error) {
      console.error(error);
      setFeedback({
        aprobado: false,
        mensajeGeneral: "Error de conexión con el mentor IA.",
        cosasBuenas: [],
        cosasMalas: ["No se pudo conectar con el servicio de revisión."],
        revisar: [],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`
        border-t border-white/10 bg-[#0A0A0A] flex flex-col transition-all duration-300 ease-in-out
        ${isExpanded ? "h-[500px]" : "h-[60px]"}
      `}
    >
      {/* --- HEADER BAR (Always visible) --- */}
      <div
        className="flex items-center justify-between px-6 h-[60px] border-b border-white/5 bg-[#0A0A0A] hover:bg-white/5 cursor-pointer transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-400">
            <Terminal size={18} />
            <span className="font-mono text-sm font-medium tracking-wide">
              TERMINAL / AI MENTOR
            </span>
          </div>

          {/* Status Indicator */}
          {loading ? (
            <span className="flex items-center gap-2 px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-mono">
              <Loader2 size={12} className="animate-spin" />
              ANALYZING...
            </span>
          ) : feedback ? (
            <span
              className={`flex items-center gap-2 px-2 py-0.5 rounded-full text-xs font-mono border ${
                feedback.aprobado
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : "bg-amber-500/10 text-amber-400 border-amber-500/20"
              }`}
            >
              {feedback.aprobado ? <CheckCircle size={12} /> : <AlertTriangle size={12} />}
              {feedback.aprobado ? "PASSED" : "NEEDS REVISION"}
            </span>
          ) : (
            <span className="text-xs text-gray-600 font-mono">IDLE - READY TO CHECK</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCheck();
            }}
            disabled={loading}
            className={`
              flex items-center gap-2 px-4 py-1.5 rounded text-xs font-bold font-mono tracking-wider
              transition-all disabled:opacity-50 disabled:cursor-not-allowed
              ${
                loading
                  ? "bg-gray-800 text-gray-400 cursor-not-allowed"
                  : "bg-white text-black hover:bg-gray-200 hover:scale-105 active:scale-95"
              }
            `}
          >
            {loading ? (
              "PROCESSING..."
            ) : (
              <>
                <Play size={12} fill="currentColor" /> RUN TESTS
              </>
            )}
          </button>

          <div className="text-gray-500 hover:text-white transition-colors">
            {isExpanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </div>
        </div>
      </div>

      {/* --- CONTENT AREA (Collapsible) --- */}
      <div className="flex-1 overflow-y-auto p-6 bg-[#050505] font-sans">
        {feedback ? (
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* General Message */}
            <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
              <span className="text-3xl mt-1">{feedback.aprobado ? "🎉" : "🧐"}</span>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-white">
                  Resumen del Mentor
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                  {feedback.mensajeGeneral}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bad Practices / Errors */}
              {!feedback.aprobado && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-rose-400 uppercase tracking-widest flex items-center gap-2 border-b border-rose-500/20 pb-2">
                    <XCircle size={16} /> Corregir
                  </h4>
                  <ul className="space-y-3">
                    {feedback.cosasMalas.map((item, i) => (
                      <li
                        key={i}
                        className="bg-rose-500/5 border border-rose-500/10 p-3 rounded text-sm text-rose-200/80 leading-relaxed"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Suggestions */}
              {feedback.revisar.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2 border-b border-amber-500/20 pb-2">
                    <AlertTriangle size={16} /> Sugerencias
                  </h4>
                  <ul className="space-y-3">
                    {feedback.revisar.map((item, i) => (
                      <li
                        key={i}
                        className="bg-amber-500/5 border border-amber-500/10 p-3 rounded text-sm text-amber-200/80 leading-relaxed"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Good Practices */}
              {feedback.cosasBuenas.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2 border-b border-emerald-500/20 pb-2">
                    <CheckCircle size={16} /> Puntos Fuertes
                  </h4>
                  <ul className="space-y-3">
                    {feedback.cosasBuenas.map((item, i) => (
                      <li
                        key={i}
                        className="bg-emerald-500/5 border border-emerald-500/10 p-3 rounded text-sm text-emerald-200/80 leading-relaxed"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-4 opacity-50">
            <Terminal size={48} strokeWidth={1} />
            <p className="font-mono text-sm">Esperando ejecución de pruebas...</p>
          </div>
        )}
      </div>
    </div>
  );
}
