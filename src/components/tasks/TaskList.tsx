import type { Task } from "../../types/Task";
import { toggleTaskCompleted } from "../../services/tasks/toggleTaskCompleted";
import { deleteTask } from "../../services/tasks/deleteTask";
import { useState } from "react";
import EditTaskForm from "./EditTaskForm";

type TaskListProps = {
  tasks: Task[];
};

function TaskList({ tasks }: TaskListProps) {
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  if (tasks.length === 0) {
    return <p>No tenés tareas todavía.</p>;
  }

  return (
    <section>
      {tasks.map((task) => (
        <article key={task.id}>
          {editingTaskId === task.id ? (
            <EditTaskForm
              task={task}
              onCancel={() => setEditingTaskId(null)}
            />
          ) : (
            <>
              <h2>{task.title}</h2>
              <p>{task.description}</p>
          
              <button
                onClick={() =>
                  toggleTaskCompleted(task.id, task.completed)
                }
              >
                {task.completed
                  ? "Marcar pendiente"
                  : "Marcar completada"}
              </button>

              <button
                onClick={async () => {
                  const confirmed = window.confirm(
                    "¿Seguro que querés eliminar esta tarea?"
                  );

                  if (!confirmed) {
                    return;
                  }

                  try {
                    await deleteTask(task.id);
                  } catch {
                    window.alert("No se pudo eliminar la tarea.");
                  }
                }}
              >
                Eliminar
              </button>

              <button onClick={() => setEditingTaskId(task.id)}>
                Editar
              </button>
            </>
          )}
        </article>
      ))}
    </section>
  );
}

export default TaskList;