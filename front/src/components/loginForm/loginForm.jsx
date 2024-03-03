import { useState } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

function LoginForm({ setDisplayLoginForm }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3001/login', {
        email,
        password
      });

      console.log(response);
    } catch (error) {
      setError('Failed to login. Please check your credentials.');
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Login</button>
      <button onClick={() => setDisplayLoginForm(false)}>Criar uma conta</button>
    </form>
  );
}

LoginForm.propTypes = {
  setDisplayLoginForm: PropTypes.func.isRequired,
};

export default LoginForm;


