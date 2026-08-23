import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firestore";

type CreateTaskData = {
  userId: string;
  title: string;
  description: string;
};

export async function createTask(data: CreateTaskData) {
  return addDoc(collection(db, "tasks"), {
    ...data,
    completed: false,
    createdAt: serverTimestamp(),
  });
}