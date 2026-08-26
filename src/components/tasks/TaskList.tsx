import { useState } from "react";
import type { Task } from "../../types/Task";
import EditTaskForm from "./EditTaskForm";
import TaskItem from "./TaskItem";
import "../../styles/tasks/task-list.css";
import { sortTasks } from "../../features/taskFilters/sortTasks";

type TaskListProps = {
  tasks: Task[];
};

function TaskList({ tasks }: TaskListProps) {
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const sortedTasks = sortTasks(tasks);

  if (tasks.length === 0) {
    return <p>No tenés tareas todavía.</p>;
  }

  return (
    <section className="task-list">
      {sortedTasks.map((task) => (
        <article className="task-card" key={task.id}>
          {editingTaskId === task.id ? (
            <EditTaskForm
              task={task}
              onCancel={() => setEditingTaskId(null)}
            />
          ) : (
            <TaskItem
              task={task}
              onEdit={() => setEditingTaskId(task.id)}
            />
          )}
        </article>
      ))}
    </section>
  );
}

export default TaskList;