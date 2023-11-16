// Home.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fazerLogin } from '../service/service';
import './css/Home.css';

const Home = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin();
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);

      if (!email || !senha) {
        throw new Error('Preencha todos os campos.');
      }

      console.log('Tentativa de login com email:', email);

      const response = await fazerLogin({
        emailUsuario: email,
        senhaUsuario: senha,
      });

      // Assuming the response contains an 'error' property
      if (response && response.error) {
        throw new Error(response.error);
      }

      // Handle successful login (update state, redirect, etc.)
      setIsLoggedIn(true);
      navigate('/inicio'); // Redirect to the "/inicio" page after successful login
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="homeBackgroundContainer">
      <div className="homeFormContainer">
        <h2>Bem-vindo à Plataforma ReservaLab</h2>
        <form onSubmit={handleSubmit}>
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
                style={{ width: '300px', padding: '8px', marginBottom: '10px' }}
              />
            </label>
            <button type="submit" disabled={isLoading} style={{ display: 'inline', marginBottom: '10px' }}>
              {isLoading ? 'Carregando...' : 'Login'}
            </button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </div>
        </form>
        <p>
          Não tem cadastro? <Link to="/cadastro">Registre-se.</Link>
        </p>
      </div>
    </div>
  );
};

export { Home };