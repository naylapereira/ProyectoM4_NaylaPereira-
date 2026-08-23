import { useState } from "react";
import type { FormEvent } from "react";
import { auth } from "../../services/firebase/firebaseAuth";
import { createTask } from "../../services/tasks/createTask";

function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!auth.currentUser) {
      return;
    }

    await createTask({
      userId: auth.currentUser.uid,
      title,
      description,
    });

    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Título"
        required
      />

      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Descripción"
        required
      />

      <button type="submit">Crear tarea</button>
    </form>
  );
}

export default TaskForm;