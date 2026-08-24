import { useState } from "react";
import type { FormEvent } from "react";
import { auth } from "../../services/firebase/firebaseAuth";
import { createTask } from "../../services/tasks/createTask";

function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!auth.currentUser) {
      setError("Tenés que iniciar sesión para crear una tarea.");
      return;
    }

    try {
      setError("");

      await createTask({
        userId: auth.currentUser.uid,
        title,
        description,
      });

      setTitle("");
      setDescription("");
    } catch {
      setError("No se pudo crear la tarea.");
    }
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
      {error && <p>{error}</p>}
      
      <button type="submit">Crear tarea</button>
    </form>
  );
}

export default TaskForm;