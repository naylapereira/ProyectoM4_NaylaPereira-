import { Link } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";
import "../styles/auth/auth.css";
import "../styles/auth/forms.css";

function RegisterPage() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Crear cuenta</h1>
        <RegisterForm />

        <p>
          ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
        </p>
      </section>
    </main>
  );
}

export default RegisterPage;