import { useEffect, useState } from "react";
import type { Task } from "../types/Task";
import { subscribeTasks } from "../services/tasks/subscribeTasks";

export function useTasks(userId: string | undefined) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(Boolean(userId));
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) {
      return;
    }

    const unsubscribe = subscribeTasks(
      userId,
      (newTasks) => {
        setTasks(newTasks);
        setLoading(false);
        setError("");
      },
      () => {
        setLoading(false);
        setError("No se pudieron cargar las tareas.");
      }
    );

    return unsubscribe;
  }, [userId]);

  return { tasks, loading, error };
}