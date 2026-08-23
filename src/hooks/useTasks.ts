import { useEffect, useState } from "react";
import type { Task } from "../types/Task";
import { subscribeTasks } from "../services/tasks/subscribeTasks";

export function useTasks(userId: string | undefined) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!userId) {
      return;
    }

    const unsubscribe = subscribeTasks(userId, setTasks);

    return unsubscribe;
  }, [userId]);

  return { tasks };
}