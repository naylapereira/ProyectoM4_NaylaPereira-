import type { Task } from "../../types/Task";
import { toggleTaskCompleted } from "../../services/tasks/toggleTaskCompleted";
import { deleteTask } from "../../services/tasks/deleteTask";
import { toggleTaskPriority } from "../../services/tasks/toggleTaskPriority";

type TaskItemProps = {
  task: Task;
  onEdit: () => void;
};

function TaskItem({ task, onEdit }: TaskItemProps) {
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "¿Seguro que querés eliminar esta tarea?"
    );

    if (!confirmed) return;

    try {
      await deleteTask(task.id);
    } catch {
      window.alert("No se pudo eliminar la tarea.");
    }
  };

  return (
    <div className={task.completed ? "task-item completed" : "task-item"}>
      <h2>{task.title}</h2>
      <p>{task.description}</p>

      <div className="task-actions">
        {!task.completed && (
          <button
            className={task.priority ? "priority-button active" : "priority-button"}
            onClick={() =>
              toggleTaskPriority(task.id, task.priority ?? false)
            }
          >
            {task.priority ? "★ Prioritaria" : "☆ Priorizar"}
          </button>
        )}

        <button
          className="complete-button"
          onClick={() =>
            toggleTaskCompleted(task.id, task.completed)
          }
        >
          {task.completed
            ? "Marcar pendiente"
            : "Marcar completada"}
        </button>

        <button className="delete-button" onClick={handleDelete}>
          Eliminar
        </button>

        <button className="edit-button" onClick={onEdit}>
          Editar
        </button>
      </div>
    </div>
  );
}

export default TaskItem;