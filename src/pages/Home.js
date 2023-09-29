import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h2>Bem-vindo à Plataforma</h2>
      <p>Por favor, faça o login ou registre-se para acessar o conteúdo.</p>
      <Link to="/login">Login</Link>
      <br />
      <Link to="/cadastro">Registro</Link>
    </div>
  );
}

export default Home;