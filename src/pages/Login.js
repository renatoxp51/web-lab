import React, { useState } from 'react';
import { fazerLogin } from '../service/service';
import { useNavigate } from 'react-router-dom';

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    fazerLogin({ emailUsuario: email, senhaUsuario: senha })
      .then((data) => {
        console.log('Login bem-sucedido:', data);
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        navigate('/inicio'); // Uso de navigate para redirecionar para '/inicio'
      })
      .catch((error) => {
        console.error('Erro ao fazer login:', error);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: 'block', marginBottom: '10px' }}
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        style={{ display: 'block', marginBottom: '10px' }}
      />
      <button onClick={handleLogin} style={{ display: 'block', marginBottom: '10px' }}>
        Login
      </button>
    </div>
  );
}

export default Login;
