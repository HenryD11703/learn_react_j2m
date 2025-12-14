import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userCode, exerciseInstruction } = body;

    if (!userCode || !exerciseInstruction) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    const prompt = `
    Actúa como un revisor técnico senior de React.

    Estás evaluando a un desarrollador JUNIOR que aspira a subir a nivel MID.
    El código puede funcionar, pero tu tarea es evaluar criterio, buenas prácticas
    y robustez a futuro, no solo el resultado inmediato.

    Ejercicio esperado:
    ${exerciseInstruction}

    Código del estudiante:
    ${userCode}

    Evalúa:
    1. ¿Cumple el objetivo funcional?
    2. ¿Las decisiones de implementación son correctas para un nivel mid?
    (ej: uso de estado, closures, patrones seguros, escalabilidad)
    3. ¿Hay decisiones que funcionen pero no sean recomendadas para producción?
    4. ¿Qué mejoraría un desarrollador mid en este código?

    Reglas importantes:
    - No seas condescendiente.
    - Si algo funciona pero puede causar bugs en escenarios reales, menciónalo.
    - Prioriza patrones robustos sobre soluciones "rápidas".
    - El feedback debe ayudar al estudiante a crecer de junior a mid.

    Devuelve ÚNICAMENTE JSON válido, sin texto adicional ni bloques de código.
    Formato exacto:
    {
      "aprobado": boolean,
      "mensaje": string
    }

    El mensaje debe ser:
    - Claro
    - Técnico pero amigable
    - Máximo 2 líneas
    `;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "Eres un revisor técnico senior de React. Respondes SOLO en formato JSON válido, sin markdown ni texto adicional.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 500,
      response_format: { type: "json_object" },
    });

    const response = completion.choices[0]?.message?.content;

    if (!response) {
      throw new Error("No se obtuvo respuesta de la API");
    }

    const cleanResponse = response.replace(/```json|```/g, "").trim();
    const parsedResponse = JSON.parse(cleanResponse);

    return NextResponse.json(parsedResponse);
  } catch (error) {
    console.error("Error en /api/revisar-codigo:", error);

    return NextResponse.json(
      {
        error: "Error analizando código",
        details: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}
