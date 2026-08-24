import type { TaskFilter } from "../../features/taskFilters/filterTasks";

type TaskFiltersProps = {
  currentFilter: TaskFilter;
  onChange: (filter: TaskFilter) => void;
};

function TaskFilters({ currentFilter, onChange }: TaskFiltersProps) {
  const getButtonText = (filter: TaskFilter, text: string) =>
    currentFilter === filter ? `✓ ${text}` : text;

  return (
    <div>
      <button onClick={() => onChange("all")}>
        {getButtonText("all", "Todas")}
      </button>

      <button onClick={() => onChange("pending")}>
        {getButtonText("pending", "Pendientes")}
      </button>

      <button onClick={() => onChange("completed")}>
        {getButtonText("completed", "Completadas")}
      </button>
    </div>
  );
}

export default TaskFilters;