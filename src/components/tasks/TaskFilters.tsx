import type { TaskFilter } from "../../features/taskFilters/filterTasks";
import "../../styles/tasks/filters.css";

type TaskFiltersProps = {
  currentFilter: TaskFilter;
  onChange: (filter: TaskFilter) => void;
};

function TaskFilters({ currentFilter, onChange }: TaskFiltersProps) {
  const getButtonText = (filter: TaskFilter, text: string) =>
    currentFilter === filter ? `✓ ${text}` : text;

  return (
    <div className="task-filters">
      <button
        className={currentFilter === "all" ? "active" : ""}
        onClick={() => onChange("all")}
      >
        {getButtonText("all", "Todas")}
      </button>

      <button
        className={currentFilter === "pending" ? "active" : ""}
        onClick={() => onChange("pending")}
      >
        {getButtonText("pending", "Pendientes")}
      </button>

      <button
        className={currentFilter === "completed" ? "active" : ""}
        onClick={() => onChange("completed")}
      >
        {getButtonText("completed", "Completadas")}
      </button>
    </div>
  );
}

export default TaskFilters;