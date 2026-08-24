type EmailTask = {
  title: string;
  description: string;
  completed: boolean;
};

export function buildTaskSummary(tasks: EmailTask[]) {
  if (tasks.length === 0) {
    return "No tenés tareas cargadas.";
  }

  return tasks
    .map((task, index) => {
      const status = task.completed ? "Completada" : "Pendiente";

      return `${index + 1}. ${task.title}
Estado: ${status}
Descripción: ${task.description}`;
    })
    .join("\n\n");
}