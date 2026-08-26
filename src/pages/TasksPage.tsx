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
import SendSummaryButton from "../components/tasks/SendSummaryButton";
import "../styles/tasks/tasks-page.css";
import "../styles/tasks/task-actions.css";
import "../styles/tasks/buttons.css";
import ThemeToggle from "../components/theme/ThemeToggle";

function TasksPage() {
  const { user } = useAuth();
  const { tasks, loading, error } = useTasks(user?.uid);
  const [filter, setFilter] = useState<TaskFilter>("all");
  const filteredTasks = filterTasks(tasks, filter);

  return (
    <main className="tasks-page">
      <div className="tasks-header">
        <h1>Mis tareas</h1>
        <ThemeToggle />
      </div>

      <div className="tasks-content">
        {loading && <p>Cargando tareas...</p>}
        {error && <p>{error}</p>}

        <TaskForm />

        {user?.email && (
          <SendSummaryButton
            email={user.email}
            tasks={tasks}
          />
        )}

        {!loading && !error && (
          <>
            <TaskFilters
              currentFilter={filter}
              onChange={setFilter}
            />
            <TaskList tasks={filteredTasks} />
          </>
        )}

        <LogoutButton />
      </div>
    </main>
  );
}

export default TasksPage;