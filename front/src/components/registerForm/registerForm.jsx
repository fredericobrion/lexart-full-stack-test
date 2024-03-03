import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import login from "../../utils/login";
import { useNavigate } from "react-router-dom";

function RegisterForm({ setDisplayLoginForm }) {
  const navigateTo = useNavigate();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      await axios.post("http://localhost:3001/user", {
        userName,
        email,
        password,
      });

      await login(email, password);

      navigateTo("/phones");
    } catch (error) {
      setError("Erro ao registrar usuário. Por favor, tente novamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="User name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
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
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Criar conta</button>
      <button onClick={() => setDisplayLoginForm(true)}>Login</button>
    </form>
  );
}

RegisterForm.propTypes = {
  setDisplayLoginForm: PropTypes.func.isRequired,
};

export default RegisterForm;
