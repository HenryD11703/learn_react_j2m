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
    <div className="grid grid-cols-[auto_1fr] md:grid-cols-[auto_auto_1fr] h-screen w-full bg-[#0A0A0A] overflow-hidden">
      {/* 1. Activity Bar (Auto Width) */}
      <ExerciseNav exercises={exercisesList} currentSlug={slug} />

      {/* 2. Primary Sidebar (Auto Width - Hidden on small) */}
      <div className="hidden md:block w-80 lg:w-96 h-full overflow-hidden border-r border-white/10 bg-[#0A0A0A]">
        <ExerciseSidebar exercise={exercise} />
      </div>

      {/* 3. Editor Area (Remaining Space) */}
      <main className="min-w-0 h-full relative bg-[#0A0A0A]">
        <ClientEditor
          files={exercise.files}
          aiInstruction={exercise.aiInstruction}
          className="h-full"
        />
      </main>
    </div>
  );
}
