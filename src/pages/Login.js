// Login.js
import React, { useState } from 'react';
import { fazerLogin } from '../service/service';
import { useNavigate } from 'react-router-dom';

export const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    fazerLogin({ emailUsuario: email, senhaUsuario: senha })
      .then((data) => {
        console.log('Login bem-sucedido:', data);
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        navigate('/inicio');
      })
      .catch((error) => {
        console.error('Erro ao fazer login:', error);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <label>
        Email:
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '310px', padding: '8px', marginBottom: '10px' }}
        />
      </label>
      <label>
        Senha:
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={{ width: '300px', padding: '8px', marginBottom: '30px' }}
        />
      </label>
      <button onClick={handleLogin} style={{ display: 'inline', marginBottom: '10px' }}>
        Login
      </button>
    </div>
  );
};

export default Login;