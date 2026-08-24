import { useState } from "react";
import type { Task } from "../../types/Task";
import { sendTaskSummary } from "../../services/email/sendTaskSummary";

type SendSummaryButtonProps = {
  email: string;
  tasks: Task[];
};

function SendSummaryButton({ email, tasks }: SendSummaryButtonProps) {
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    try {
      setMessage("");
      await sendTaskSummary(email, tasks);
      setMessage("Resumen enviado correctamente.");
    } catch {
      setMessage("No se pudo enviar el resumen.");
    }
  };

  return (
    <div>
      <button onClick={handleSend}>Enviar resumen por email</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default SendSummaryButton;