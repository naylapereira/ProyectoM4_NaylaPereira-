import RegisterForm from "../components/auth/RegisterForm";
import { Link } from "react-router-dom";

function RegisterPage() {
  return (
    <main>
      <h1>Crear cuenta</h1>
      <RegisterForm />
      <p>
        ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
      </p>
    </main>
  );
}

export default RegisterPage;