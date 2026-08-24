import type { Task } from "../../types/Task";

export async function sendTaskSummary(
  email: string,
  tasks: Task[]
) {
  const response = await fetch("/api/sendTaskSummary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, tasks }),
  });

  if (!response.ok) {
    throw new Error("No se pudo enviar el resumen.");
  }
}