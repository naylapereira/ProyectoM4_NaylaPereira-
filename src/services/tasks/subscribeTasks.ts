import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase/firestore";
import type { Task } from "../../types/Task";

export function subscribeTasks(
  userId: string,
  onChange: (tasks: Task[]) => void
) {
  const tasksQuery = query(
    collection(db, "tasks"),
    where("userId", "==", userId)
  );

  return onSnapshot(tasksQuery, (snapshot) => {
    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
    })) as Task[];

    onChange(tasks);
  });
}