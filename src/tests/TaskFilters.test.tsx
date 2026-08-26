import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import TaskFilters from "../components/tasks/TaskFilters";

describe("TaskFilters", () => {
  it("llama a onChange con pending al hacer clic en Pendientes", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <TaskFilters
        currentFilter="all"
        onChange={onChange}
      />
    );

    await user.click(
      screen.getByRole("button", { name: "Pendientes" })
    );

    expect(onChange).toHaveBeenCalledWith("pending");
  });

  it("muestra visualmente el filtro activo", () => {
    render(
      <TaskFilters
        currentFilter="completed"
        onChange={vi.fn()}
      />
    );

    expect(
      screen.getByRole("button", { name: "✓ Completadas" })
    ).toHaveClass("active");
  });
});