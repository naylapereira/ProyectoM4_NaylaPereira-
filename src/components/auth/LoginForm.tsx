import { useState } from "react";
import type { FormEvent } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase/firebaseAuth";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setError("");

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      navigate("/tasks");
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error
      ) {
        const code = String(error.code);

        if (code === "auth/invalid-credential") {
          setError("El email o la contraseña son incorrectos.");
          return;
        }

        if (code === "auth/user-disabled") {
          setError("Esta cuenta está deshabilitada.");
          return;
        }

        if (code === "auth/too-many-requests") {
          setError(
            "Demasiados intentos. Esperá unos minutos e intentá de nuevo."
          );
          return;
        }

        if (code === "auth/network-request-failed") {
          setError("No se pudo conectar. Revisá tu conexión a internet.");
          return;
        }
      }

      setError("No se pudo iniciar sesión. Intentá nuevamente.");
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
        required
      />
      
      {error && <p>{error}</p>}
      
      <button type="submit">Ingresar</button>
    </form>
  );
}

export default LoginForm;