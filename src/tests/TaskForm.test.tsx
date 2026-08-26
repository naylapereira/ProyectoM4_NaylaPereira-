import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import TaskForm from "../components/tasks/TaskForm";
import { createTask } from "../services/tasks/createTask";

vi.mock("../services/tasks/createTask", () => ({
  createTask: vi.fn(),
}));

vi.mock("../services/firebase/firebaseAuth", () => ({
  auth: {
    currentUser: {
      uid: "user-1",
    },
  },
}));

const mockedCreateTask = vi.mocked(createTask);

describe("TaskForm", () => {
  it("no crea una tarea si los campos obligatorios están vacíos", async () => {
    const user = userEvent.setup();

    render(<TaskForm />);

    await user.click(
      screen.getByRole("button", { name: "Crear tarea" })
    );

    expect(mockedCreateTask).not.toHaveBeenCalled();
  });
});