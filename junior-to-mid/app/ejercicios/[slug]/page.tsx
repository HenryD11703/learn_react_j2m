// app/ejercicios/[slug]/page.tsx
import { getExerciseBySlug } from "@/lib/exercises-registry";
import { notFound } from "next/navigation";
import ClientEditor from "@/components/ClientEditor";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ExercisePage({ params }: PageProps) {
  const { slug } = await params;
  const exercise = getExerciseBySlug(slug);

  if (!exercise) {
    notFound();
  }

  // Mapeo de dificultad a colores
  const difficultyColors = {
    junior: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    mid: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    senior: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  };

  return (
    <div className="flex h-screen flex-col md:flex-row bg-[#0A0A0A] text-white">
      {/* Sidebar de instrucciones */}
      <div className="w-full md:w-[400px] flex flex-col border-r border-white/10 bg-[#0F0F0F]">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`px-3 py-1 rounded-md border text-xs font-medium uppercase tracking-wider ${
                difficultyColors[
                  exercise.difficulty as keyof typeof difficultyColors
                ]
              }`}
            >
              {exercise.difficulty}
            </div>
          </div>

          <h1 className="text-2xl font-semibold mb-2 leading-tight">
            {exercise.title}
          </h1>
        </div>

        {/* Descripción con scroll */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="prose prose-invert prose-sm max-w-none">
            <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
              {exercise.description}
            </div>
          </div>
        </div>

        {/* Footer con tips */}
        <div className="p-6 border-t border-white/10 bg-[#0A0A0A]">
          <p className="text-xs text-gray-500">
            💡 Tip: Usa el preview para ver tus cambios en tiempo real
          </p>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 min-h-0 h-full">
        <ClientEditor
          startingCode={exercise.startingCode}
          aiInstruction={exercise.aiInstruction}
        />
      </div>
    </div>
  );
}
