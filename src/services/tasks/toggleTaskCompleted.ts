import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firestore";

export async function toggleTaskCompleted(
  taskId: string,
  completed: boolean
) {
  const taskRef = doc(db, "tasks", taskId);

  await updateDoc(taskRef, {
    completed: !completed,
  });
}