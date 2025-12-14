// app/ejercicios/[slug]/page.tsx
import { getExerciseBySlug } from "@/lib/exercises-registry";
import { notFound } from "next/navigation";
import ClientEditor from "@/components/ClientEditor";
import ExerciseSidebar from "@/components/ExcerciseSidebar";
import ExerciseNav from "@/components/ExerciseNav";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Mock de ejercicios para la navegación (después esto vendrá del registry)
const mockExercises = [
  {
    slug: "contador-simple",
    title: "Intro: El Estado en React",
    difficulty: "junior" as const,
    completed: false,
  },
  // Más ejercicios aquí...
];

export default async function ExercisePage({ params }: PageProps) {
  const { slug } = await params;
  const exercise = getExerciseBySlug(slug);

  if (!exercise) {
    notFound();
  }

  return (
    <div className="flex h-screen flex-col md:flex-row bg-[#0A0A0A] text-white">
      {/* Navigation Drawer */}
      <ExerciseNav exercises={mockExercises} currentSlug={slug} />

      {/* Sidebar con tabs */}
      <ExerciseSidebar exercise={exercise} />

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
