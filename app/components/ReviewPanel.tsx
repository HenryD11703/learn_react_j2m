"use client";
import { useSandpack } from "@codesandbox/sandpack-react";
import { useState } from "react";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

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
        mensajeGeneral: "Error conectando con el profesor IA. Intenta de nuevo.",
        cosasBuenas: [],
        cosasMalas: ["Hubo un error de conexión"],
        revisar: [],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-between px-6 bg-[#0A0A0A] border-t border-white/10">
      <div className="flex-1 max-w-2xl">
        {feedback ? (
          <div className="space-y-4">
            <div
              className={`p-4 rounded-lg border ${
                feedback.aprobado
                  ? "bg-emerald-500/10 border-emerald-500/20"
                  : "bg-amber-500/10 border-amber-500/20"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl">
                  {feedback.aprobado ? "🎉" : "🤔"}
                </span>
                <p className={`font-medium ${
                  feedback.aprobado ? "text-emerald-400" : "text-amber-400"
                }`}>
                  {feedback.mensajeGeneral}
                </p>
              </div>

              <div className="space-y-4 mt-4 pl-2">
                {feedback.cosasBuenas.length > 0 && (
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold text-emerald-500 uppercase tracking-wider flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Lo lograste
                    </h5>
                    <ul className="space-y-1">
                      {feedback.cosasBuenas.map((item, i) => (
                        <li key={i} className="text-sm text-gray-300 pl-6 relative">
                          <span className="absolute left-1 top-2 w-1 h-1 rounded-full bg-emerald-500/50" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {feedback.cosasMalas.length > 0 && (
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold text-rose-500 uppercase tracking-wider flex items-center gap-2">
                      <XCircle className="w-4 h-4" />
                      Errores críticos
                    </h5>
                    <ul className="space-y-1">
                      {feedback.cosasMalas.map((item, i) => (
                        <li key={i} className="text-sm text-gray-300 pl-6 relative">
                          <span className="absolute left-1 top-2 w-1 h-1 rounded-full bg-rose-500/50" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {feedback.revisar.length > 0 && (
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold text-amber-500 uppercase tracking-wider flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Sugerencias de mejora
                    </h5>
                    <ul className="space-y-1">
                      {feedback.revisar.map((item, i) => (
                        <li key={i} className="text-sm text-gray-300 pl-6 relative">
                          <span className="absolute left-1 top-2 w-1 h-1 rounded-full bg-amber-500/50" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
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
          </>
        )}
      </button>
    </div>
  );
}
