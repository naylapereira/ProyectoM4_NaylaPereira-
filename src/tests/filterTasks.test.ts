import { describe, expect, it } from "vitest";
import {
  filterTasks,
  type TaskFilter,
} from "../features/taskFilters/filterTasks";
import type { Task } from "../types/Task";

const tasks: Task[] = [
  {
    id: "1",
    userId: "user-1",
    title: "Pendiente",
    description: "Tarea pendiente",
    completed: false,
    createdAt: new Date(),
  },
  {
    id: "2",
    userId: "user-1",
    title: "Completada",
    description: "Tarea completada",
    completed: true,
    createdAt: new Date(),
  },
];

describe("filterTasks", () => {
  it("devuelve todas las tareas con el filtro all", () => {
    const filter: TaskFilter = "all";

    expect(filterTasks(tasks, filter)).toHaveLength(2);
  });

  it("devuelve solo las tareas pendientes", () => {
    expect(filterTasks(tasks, "pending")).toEqual([tasks[0]]);
  });

  it("devuelve solo las tareas completadas", () => {
    expect(filterTasks(tasks, "completed")).toEqual([tasks[1]]);
  });
});