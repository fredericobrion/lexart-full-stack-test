import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function RegisterForm({ setDisplayLoginForm }) {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:3001/user', {
        userName,
        email,
        password
      });

      // Se a requisição for bem-sucedida, você pode lidar com a resposta aqui
      console.log(response.data);
      setDisplayLoginForm(true); // Redirecionar para a página de login após o registro

    } catch (error) {
      setError('Erro ao registrar usuário. Por favor, tente novamente.');
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Criar conta</button>
      <button onClick={() => setDisplayLoginForm(true)}>Login</button>
    </form>
  );
}

RegisterForm.propTypes = {
  setDisplayLoginForm: PropTypes.func.isRequired,
}

export default RegisterForm;

