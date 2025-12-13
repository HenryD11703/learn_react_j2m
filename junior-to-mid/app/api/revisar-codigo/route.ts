import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
// if not set it gets from a default value from .env
const genAI = new GoogleGenAI({});

export async function POST(request: Request) {
  // Este sera el endpoint que recibe el codigo del frontend
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
    - Prioriza patrones robustos sobre soluciones “rápidas”.
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

    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const response = result?.text;
    if (!response) throw new Error("No se obtuvo respuesta de la API");

    const cleanResponse = response.replace(/```json|```/g, "").trim();

    return NextResponse.json(JSON.parse(cleanResponse));
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error analizando codigo" },
      { status: 500 }
    );
  }
}
