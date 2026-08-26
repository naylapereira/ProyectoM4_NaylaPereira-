import { beforeEach, describe, expect, it, vi } from "vitest";

import handler from "../../api/sendTaskSummary";
import { sendEmail } from "../../api/sendEmail";

vi.mock("../../api/sendEmail", () => ({
  sendEmail: vi.fn(),
}));

const mockedSendEmail = vi.mocked(sendEmail);

function createResponse() {
  const json = vi.fn();

  const response = {
    status: vi.fn(() => response),
    json,
  };

  return response;
}

describe("sendTaskSummary", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("devuelve 405 si el método no es POST", async () => {
    const request = {
      method: "GET",
    };

    const response = createResponse();

    await handler(request as never, response as never);

    expect(response.status).toHaveBeenCalledWith(405);
  });

  it("devuelve 400 si el payload es inválido", async () => {
    const request = {
      method: "POST",
      body: {
        email: "",
        tasks: "no-es-un-array",
      },
    };

    const response = createResponse();

    await handler(request as never, response as never);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(mockedSendEmail).not.toHaveBeenCalled();
  });

  it("devuelve 500 si falla el envío del correo", async () => {
    mockedSendEmail.mockRejectedValueOnce(
      new Error("Error de SES")
    );

    const request = {
      method: "POST",
      body: {
        email: "test@example.com",
        tasks: [],
      },
    };

    const response = createResponse();

    await handler(request as never, response as never);

    expect(response.status).toHaveBeenCalledWith(500);
  });
});