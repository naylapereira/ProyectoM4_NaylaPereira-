import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firestore";

export async function toggleTaskPriority(
  taskId: string,
  currentPriority: boolean
) {
  const taskRef = doc(db, "tasks", taskId);

  await updateDoc(taskRef, {
    priority: !currentPriority,
  });
}