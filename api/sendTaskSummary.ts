import type { VercelRequest, VercelResponse } from "@vercel/node";
import { buildTaskSummary } from "./buildTaskSummary.js";
import { sendEmail } from "./sendEmail.js";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Método no permitido" });
  }

  const { email, tasks } = request.body;

  if (!email || !Array.isArray(tasks)) {
    return response.status(400).json({ error: "Datos inválidos" });
  }

  const body = buildTaskSummary(tasks);

  await sendEmail(
    email,
    "Resumen de tus tareas",
    body
  );

  return response.status(200).json({
    message: "Correo enviado correctamente",
  });
}