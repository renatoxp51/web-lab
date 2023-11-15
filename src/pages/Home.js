// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login'; // Importando o Login
import './css/Home.css';

export const Home = ({ setIsLoggedIn }) => {
  return (
    <div className="homeBackgroundContainer">
      <div className="homeFormContainer">
        <h2>Bem-vindo à Plataforma ReservaLab</h2>
        {/* Including the Login component */}
        <Login setIsLoggedIn={setIsLoggedIn} />
        <p>
          Não tem cadastro? <Link to="/cadastro">Registre-se.</Link>
        </p>
      </div>
    </div>
  );
};

export default Home; 
