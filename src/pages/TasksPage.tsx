import LogoutButton from "../components/auth/LogoutButton";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";
import { useAuth } from "../hooks/useAuth";
import { useTasks } from "../hooks/useTasks";
import { useState } from "react";
import TaskFilters from "../components/tasks/TaskFilters";
import {
  filterTasks,
  type TaskFilter,
} from "../features/taskFilters/filterTasks";

function TasksPage() {
  const { user } = useAuth();
  const { tasks, loading, error } = useTasks(user?.uid);
  const [filter, setFilter] = useState<TaskFilter>("all");
  const filteredTasks = filterTasks(tasks, filter);

  return (
    <main>
      <h1>Mis tareas</h1>
      {loading && <p>Cargando tareas...</p>}
      {error && <p>{error}</p>}
      <TaskForm />
      {!loading && !error && (
        <>
          <TaskFilters currentFilter={filter} onChange={setFilter} />
          <TaskList tasks={filteredTasks} />
        </>
      )}
      <LogoutButton />
    </main>
  );
}

export default TasksPage;