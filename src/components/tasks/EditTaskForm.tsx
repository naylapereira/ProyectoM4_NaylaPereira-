import { useState } from "react";
import type { FormEvent } from "react";
import type { Task } from "../../types/Task";
import { updateTask } from "../../services/tasks/updateTask";

type EditTaskFormProps = {
  task: Task;
  onCancel: () => void;
};

function EditTaskForm({ task, onCancel }: EditTaskFormProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await updateTask(task.id, { title, description });
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />

      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        required
      />

      <button type="submit">Guardar</button>
      <button type="button" onClick={onCancel}>
        Cancelar
      </button>
    </form>
  );
}

export default EditTaskForm;