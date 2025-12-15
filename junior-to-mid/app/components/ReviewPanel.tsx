"use client";
import { useSandpack } from "@codesandbox/sandpack-react";
import { useState } from "react";

interface Props {
  instruction: string;
}

export default function ReviewPanel({ instruction }: Props) {
  const { sandpack } = useSandpack();
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{
    aprobado: boolean;
    mensaje: string;
  } | null>(null);

  const handleCheck = async () => {
    setLoading(true);
    setFeedback(null);

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
        mensaje: "Error conectando con el profesor IA. Intenta de nuevo.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-between px-6 bg-[#0A0A0A] border-t border-white/10">
      <div className="flex-1 max-w-2xl">
        {feedback ? (
          <div
            className={`flex items-start gap-3 px-4 py-3 rounded-lg border ${
              feedback.aprobado
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                : "bg-amber-500/10 border-amber-500/20 text-amber-400"
            }`}
          >
            <span className="text-xl flex-shrink-0 mt-0.5">
              {feedback.aprobado ? "✓" : "!"}
            </span>
            <p className="text-sm leading-relaxed">{feedback.mensaje}</p>
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            Escribe tu solución y presiona el botón para verificar tu código
          </p>
        )}
      </div>

      <button
        onClick={handleCheck}
        disabled={loading}
        className={`
          ml-6 px-6 py-2.5 rounded-lg font-medium text-sm
          transition-all duration-200
          flex items-center gap-2
          ${
            loading
              ? "bg-white/5 text-gray-500 cursor-not-allowed"
              : "bg-white text-black hover:bg-white/90 shadow-lg shadow-white/5"
          }
        `}
      >
        {loading ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            Verificando...
          </>
        ) : (
          <>
            <span>Verificar Código</span>
            <span className="text-xs opacity-60">⌘↵</span>
          </>
        )}
      </button>
    </div>
  );
}
