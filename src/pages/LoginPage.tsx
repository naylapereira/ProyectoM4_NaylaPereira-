import LoginForm from "../components/auth/LoginForm";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <main>
      <h1>Iniciar sesión</h1>
      <LoginForm />
      <p>
        ¿No tenés cuenta? <Link to="/register">Registrate</Link>
      </p>
    </main>
  );
}

export default LoginPage;