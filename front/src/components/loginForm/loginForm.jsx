import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import login from "../../utils/login";

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
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Login</button>
      <button onClick={() => setDisplayLoginForm(false)}>
        Criar uma conta
      </button>
    </form>
  );
}

LoginForm.propTypes = {
  setDisplayLoginForm: PropTypes.func.isRequired,
};

export default LoginForm;
