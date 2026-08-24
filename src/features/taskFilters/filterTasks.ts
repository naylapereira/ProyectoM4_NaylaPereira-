import type { Task } from "../../types/Task";

export type TaskFilter = "all" | "pending" | "completed";

export function filterTasks(tasks: Task[], filter: TaskFilter) {
  if (filter === "pending") {
    return tasks.filter((task) => !task.completed);
  }

  if (filter === "completed") {
    return tasks.filter((task) => task.completed);
  }

  return tasks;
}