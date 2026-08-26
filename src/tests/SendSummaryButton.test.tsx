import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import SendSummaryButton from "../components/tasks/SendSummaryButton";
import { sendTaskSummary } from "../services/email/sendTaskSummary";

vi.mock("../services/email/sendTaskSummary", () => ({
  sendTaskSummary: vi.fn(),
}));

const mockedSendTaskSummary = vi.mocked(sendTaskSummary);

const tasks = [
  {
    id: "1",
    userId: "user-1",
    title: "Tarea",
    description: "Descripción",
    completed: false,
    createdAt: new Date(),
  },
];

describe("SendSummaryButton", () => {
  it("muestra mensaje de éxito cuando el resumen se envía", async () => {
    const user = userEvent.setup();

    mockedSendTaskSummary.mockResolvedValueOnce(undefined);

    render(
      <SendSummaryButton
        email="test@example.com"
        tasks={tasks}
      />
    );

    await user.click(
      screen.getByRole("button", {
        name: "Enviar resumen por email",
      })
    );

    expect(
      await screen.findByText("Resumen enviado correctamente.")
    ).toBeInTheDocument();
  });

  it("muestra mensaje de error cuando falla el envío", async () => {
    const user = userEvent.setup();

    mockedSendTaskSummary.mockRejectedValueOnce(
      new Error("Error de prueba")
    );

    render(
      <SendSummaryButton
        email="test@example.com"
        tasks={tasks}
      />
    );

    await user.click(
      screen.getByRole("button", {
        name: "Enviar resumen por email",
      })
    );

    expect(
      await screen.findByText("No se pudo enviar el resumen.")
    ).toBeInTheDocument();
  });
});