import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firestore";

type UpdateTaskData = {
  title: string;
  description: string;
};

export async function updateTask(
  taskId: string,
  data: UpdateTaskData
) {
  const taskRef = doc(db, "tasks", taskId);

  await updateDoc(taskRef, data);
}