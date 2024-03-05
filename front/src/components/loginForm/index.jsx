import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import login from "../../utils/login";
import styles from "./loginForm.module.css";
import { loginSchema } from "../../utils/validations/loginSchema";

function LoginForm({ setDisplayLoginForm }) {
  const navigateTo = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { error } = loginSchema.validate({ email, password });

      if (error) {
        throw new Error(error.message);
      }

      await login(email, password);

      navigateTo("/phones");
    } catch (e) {
      setError(e.message || e.response.data.message || "Erro inesperado");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <input
        className={styles.inputField}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className={styles.inputField}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className={styles.errorMsg}>{error}</p>}
      <button className={styles.submitButton} type="submit">Login</button>
      <button className={styles.createAccountButton} onClick={() => setDisplayLoginForm(false)}>
        Criar uma conta
      </button>
    </form>
  );
}

LoginForm.propTypes = {
  setDisplayLoginForm: PropTypes.func.isRequired,
};

export default LoginForm;
