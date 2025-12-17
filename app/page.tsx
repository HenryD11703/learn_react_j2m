import Link from "next/link";
import { getAllExercises } from "@/lib/exercises-registry";
import {
  Terminal,
  Code2,
  Cpu,
  ArrowRight,
  Database,
  Users,
  GitPullRequest,
  Zap,
} from "lucide-react";

export default function Home() {
  // 1. Obtenemos los ejercicios dinámicamente
  // Cada vez que agregues un archivo al registry, aparecerá aquí mágicamente.
  const exercises = getAllExercises();

  // Función auxiliar para colores según dificultad (reutilizando tu lógica)
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "easy":
        return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
      case "medium":
        return "text-amber-400 bg-amber-400/10 border-amber-400/20";
      case "hard":
        return "text-rose-400 bg-rose-400/10 border-rose-400/20";
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20";
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-white/20">
      {/* --- HERO SECTION --- */}
      <div className="relative border-b border-white/10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#0A0A0A] to-[#0A0A0A]">
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-32">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400 mb-6">
            <Terminal size={14} />
            <span>v1.0.0 Public Beta</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-br from-white to-gray-500 bg-clip-text text-transparent">
            Junior to Mid.
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
            Una plataforma de entrenamiento práctico para desarrolladores React.
            Deja de copiar tutoriales y empieza a resolver problemas de
            arquitectura, performance y lógica con feedback impulsado por IA.
          </p>

          <div className="flex gap-4">
            <a
              href="#ejercicios"
              className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              Comenzar a entrenar <ArrowRight size={18} />
            </a>
            <a
              href="https://github.com/henryd11703/learn_react_j2m"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <Code2 size={18} />
              Ver en GitHub
            </a>
          </div>
        </div>
      </div>

      {/* --- LISTA DE EJERCICIOS (Dinámica) --- */}
      <div id="ejercicios" className="max-w-5xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Ejercicios Disponibles</h2>
            <p className="text-gray-400">
              Selecciona un reto y empieza a codear en el navegador.
            </p>
          </div>
          <span className="text-sm text-gray-500 font-mono">
            {exercises.length} Challenges
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map((exercise) => (
            <Link
              href={`/ejercicios/${exercise.slug}`}
              key={exercise.slug}
              className="group relative flex flex-col p-6 bg-[#0F0F0F] border border-white/10 rounded-xl hover:border-white/20 transition-all hover:translate-y-[-2px]"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-2 rounded-lg bg-white/5 text-gray-300 group-hover:text-white transition-colors`}
                >
                  {exercise.difficulty === "hard" ? (
                    <Zap size={20} />
                  ) : (
                    <Cpu size={20} />
                  )}
                </div>
                <span
                  className={`text-xs font-medium px-2.5 py-0.5 rounded border capitalize ${getDifficultyColor(
                    exercise.difficulty
                  )}`}
                >
                  {exercise.difficulty}
                </span>
              </div>

              <h3 className="text-lg font-semibold mb-2 group-hover:text-indigo-400 transition-colors">
                {exercise.title}
              </h3>

              {/* Aquí usamos una descripción corta o truncamos la larga */}
              <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                {exercise.title}
              </p>

              <div className="mt-auto flex items-center text-xs text-gray-400 font-mono group-hover:text-gray-300">
                <span>Iniciar reto</span>
                <ArrowRight
                  size={14}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* --- ROADMAP, notas para mi --- */}
      <div className="border-t border-white/10 bg-[#0F0F0F]">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Roadmap & Futuro</h2>
            <p className="text-gray-400 max-w-xl">
              Este proyecto es Open Source. Estas son las caracteristicas que
              estoy buscando implementar para el futuro y que cualquier persona
              pueda aprender y estudiar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-xl bg-[#0A0A0A] border border-white/5">
              <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4">
                <Users size={20} />
              </div>
              <h3 className="font-semibold mb-2">Perfiles de Usuario</h3>
              <p className="text-sm text-gray-500">
                Sistema de autenticación para guardar tu progreso, soluciones y
                racha de aprendizaje. (Oauth)
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-xl bg-[#0A0A0A] border border-white/5">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
                <Database size={20} />
              </div>
              <h3 className="font-semibold mb-2">Persistencia de Datos</h3>
              <p className="text-sm text-gray-500">
                Base de datos para almacenar intentos fallidos, ejercicios ya
                completados con su solucion y racha de aprendizaje.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-xl bg-[#0A0A0A] border border-white/5">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4">
                <GitPullRequest size={20} />
              </div>
              <h3 className="font-semibold mb-2">Contribuir Ejercicios</h3>
              <p className="text-sm text-gray-500">
                Un flujo para que la comunidad pueda enviar PRs con nuevos retos
                con la estructura propuesta en `contribur`
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="border-t border-white/10 py-12 text-center text-gray-600 text-sm">
        <p>
          © 2025 Junior2Mid. Construido con Next.js, Sandpack y Groq AI. Por
          Henry Quel
        </p>
      </footer>
    </div>
  );
}
