// Home.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fazerLogin } from '../service/service';
import './css/Home.css';
import { setToken } from '../service/api';

const Home = ({ setIsLoggedIn, isLoggedIn, setLoggedUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
  
      const response = await fazerLogin({
        emailUsuario: email,
        senhaUsuario: senha,
      });

      if (response && response.message) {
        setIsLoggedIn(false);
        throw new Error(response.message);
      } else {
        setToken(response.myToken);
        setIsLoggedIn(true);
        setLoggedUser(response.usuario);
        navigate('/inicio');
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Redireciona para a página /inicio caso o Login seja efetuado com sucesso.
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/inicio');
    }
  }, [isLoggedIn, navigate]);

  return (
      <div className="homeBackgroundContainer">
      <h1 className='h1ReservaLab'>ReservaLab</h1>
      <p className='paragrafoLogin'><strong>Seu sistema de agendamento de laboratório!</strong></p> 
      <div className="homeFormContainer">
        
        <form onSubmit={handleSubmit}>
          <div>
            <h4 className='h4Personalizado'>Log-in</h4>
            <label className='textoCadastro'>
              <strong>E-mail</strong><br/>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '300px', padding: '8px', marginBottom: '10px', }}
              />
            </label>
            <label className='textoCadastro'>
              <strong>Senha</strong><br/>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                style={{ width: '300px', padding: '8px', marginBottom: '10px' }}
              />
            </label>
            <button className='botaoEnviar' type="submit" disabled={isLoading} style={{ display: 'inline', marginBottom: '10px' }}>
              {isLoading ? 'Carregando...' : 'Entrar'}
            </button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </div>
        </form>
        <p>
          <span className=' textoBranco'> <strong>Não tem cadastro?</strong></span> <Link className='textoLaranja' to="/cadastro"><strong>Registre-se.</strong></Link>
        </p>
    </div>
    </div>
  );
};

export { Home };