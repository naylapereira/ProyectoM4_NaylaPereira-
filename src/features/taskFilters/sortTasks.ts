import type { Task } from "../../types/Task";

export function sortTasks(tasks: Task[]) {
  return [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    if (!a.completed && a.priority !== b.priority) {
      return a.priority ? -1 : 1;
    }

    return 0;
  });
}