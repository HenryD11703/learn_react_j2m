import { getExerciseBySlug, getAllExercises } from "@/lib/exercises-registry";
import { notFound } from "next/navigation";
import ClientEditor from "@/components/ClientEditor";
import ExerciseSidebar from "@/components/ExcerciseSidebar";
import ExerciseNav from "@/components/ExerciseNav";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ExercisePage({ params }: PageProps) {
  const { slug } = await params;
  const exercise = getExerciseBySlug(slug);
  const exercisesList = getAllExercises();

  if (!exercise) {
    notFound();
  }

  return (
    <div className="flex h-screen flex-col md:flex-row bg-[#0A0A0A] text-white">
      <ExerciseNav exercises={exercisesList} currentSlug={slug} />

      <ExerciseSidebar exercise={exercise} />

      {/* Editor Area */}
      <div className="flex-1 min-h-0 h-full">
        <ClientEditor
          files={exercise.files}
          aiInstruction={exercise.aiInstruction}
        />
      </div>
    </div>
  );
}
