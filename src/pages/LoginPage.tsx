import { Link } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import "../styles/auth/auth.css";
import "../styles/auth/forms.css";

function LoginPage() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Iniciar sesión</h1>
        <LoginForm />

        <p>
          ¿No tenés cuenta? <Link to="/register">Registrate</Link>
        </p>
      </section>
    </main>
  );
}

export default LoginPage;