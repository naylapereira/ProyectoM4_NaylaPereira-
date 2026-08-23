import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firestore";

export async function deleteTask(taskId: string) {
  const taskRef = doc(db, "tasks", taskId);

  await deleteDoc(taskRef);
}