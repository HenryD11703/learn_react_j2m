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
        bg-[#0A0A0A] border-t border-white/10 flex flex-col shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.5)]
        pointer-events-auto transition-transform duration-500 ease-out cubic-bezier(0.16, 1, 0.3, 1)
        absolute bottom-0 left-0 right-0 max-h-[80vh]
      `}
      style={{
        height: "500px",
        transform: isExpanded ? "translateY(0)" : "translateY(calc(100% - 48px))",
      }}
    >
      {/* --- HEADER BAR (Always visible) --- */}
      <div
        className="flex-none flex items-center justify-between px-4 h-[48px] bg-[#0F0F0F] hover:bg-[#151515] cursor-pointer transition-colors border-b border-white/5"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-gray-400">
            <Terminal size={14} />
            <span className="font-mono text-xs font-bold tracking-widest uppercase">
              Terminal
            </span>
          </div>

          <div className="h-4 w-[1px] bg-white/10 mx-1" />

          {/* Status Indicator */}
          {loading ? (
            <span className="flex items-center gap-2 text-indigo-400 text-[10px] font-mono uppercase tracking-wide">
              <Loader2 size={10} className="animate-spin" />
              Running Tests...
            </span>
          ) : feedback ? (
            <span
              className={`flex items-center gap-2 text-[10px] font-mono uppercase tracking-wide ${
                feedback.aprobado ? "text-emerald-400" : "text-amber-400"
              }`}
            >
              {feedback.aprobado ? <CheckCircle size={10} /> : <AlertTriangle size={10} />}
              {feedback.aprobado ? "Passed" : "Failed"}
            </span>
          ) : (
            <span className="text-[10px] text-gray-600 font-mono uppercase tracking-wide">
              Ready
            </span>
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
              flex items-center gap-1.5 px-3 py-1 rounded text-[10px] font-bold font-mono tracking-widest uppercase
              transition-all disabled:opacity-50 disabled:cursor-not-allowed
              ${
                loading
                  ? "bg-white/5 text-gray-500"
                  : "bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/20"
              }
            `}
          >
            {loading ? "..." : "Run"} <Play size={8} fill="currentColor" />
          </button>

          <div className="text-gray-500 hover:text-white transition-colors">
            {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
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
                  Resumen
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm">
                  {feedback.mensajeGeneral}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bad Practices / Errors */}
              {!feedback.aprobado && (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-rose-400 uppercase tracking-widest flex items-center gap-2 border-b border-rose-500/20 pb-2">
                    <XCircle size={14} /> Corregir
                  </h4>
                  <ul className="space-y-2">
                    {feedback.cosasMalas.map((item, i) => (
                      <li
                        key={i}
                        className="bg-rose-500/5 border border-rose-500/10 p-3 rounded text-xs text-rose-200/80 leading-relaxed"
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
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2 border-b border-amber-500/20 pb-2">
                    <AlertTriangle size={14} /> Sugerencias
                  </h4>
                  <ul className="space-y-2">
                    {feedback.revisar.map((item, i) => (
                      <li
                        key={i}
                        className="bg-amber-500/5 border border-amber-500/10 p-3 rounded text-xs text-amber-200/80 leading-relaxed"
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
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2 border-b border-emerald-500/20 pb-2">
                    <CheckCircle size={14} /> Puntos Fuertes
                  </h4>
                  <ul className="space-y-2">
                    {feedback.cosasBuenas.map((item, i) => (
                      <li
                        key={i}
                        className="bg-emerald-500/5 border border-emerald-500/10 p-3 rounded text-xs text-emerald-200/80 leading-relaxed"
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
            <Terminal size={32} strokeWidth={1} />
            <p className="font-mono text-xs">Waiting for execution...</p>
          </div>
        )}
      </div>
    </div>
  );
}
