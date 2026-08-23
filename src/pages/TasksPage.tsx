import LogoutButton from "../components/auth/LogoutButton";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";
import { useAuth } from "../hooks/useAuth";
import { useTasks } from "../hooks/useTasks";

function TasksPage() {
  const { user } = useAuth();
  const { tasks } = useTasks(user?.uid);

  return (
    <main>
      <h1>Mis tareas</h1>
      <TaskForm />
      <TaskList tasks={tasks} />
      <LogoutButton />
    </main>
  );
}

export default TasksPage;