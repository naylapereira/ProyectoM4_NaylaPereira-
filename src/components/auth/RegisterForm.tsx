import { useState } from "react";
import type { FormEvent } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase/firebaseAuth";

function RegisterForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    try {
      setError("");

      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/tasks");
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error
      ) {
        const code = String(error.code);

        if (code === "auth/email-already-in-use") {
          setError("Ya existe una cuenta registrada con este email.");
          return;
        }

        if (code === "auth/invalid-email") {
          setError("El email ingresado no tiene un formato válido.");
          return;
        }

        if (code === "auth/weak-password") {
          setError("La contraseña no es lo suficientemente segura.");
          return;
        }

        if (code === "auth/network-request-failed") {
          setError("No se pudo conectar. Revisá tu conexión a internet.");
          return;
        }

        if (code === "auth/too-many-requests") {
          setError(
            "Se realizaron demasiados intentos. Esperá unos minutos e intentá nuevamente."
          );
          return;
        }
      }

      setError("No se pudo crear la cuenta. Intentá nuevamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        minLength={8}
        required
      />
      
      {error && <p>{error}</p>}
      
      <button type="submit">Registrarme</button>
    </form>
  );
}

export default RegisterForm;