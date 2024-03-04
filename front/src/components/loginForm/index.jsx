import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import login from "../../utils/login";
import styles from "./loginForm.module.css";

function LoginForm({ setDisplayLoginForm }) {
  const navigateTo = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await login(email, password);

      navigateTo("/phones");
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data.message || "Erro inesperado");
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
