import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

function Inicio() {
  return (
    <div>
      <h1>Bem-vindo ao nosso ReservaLab!</h1>
      <p>Aqui você pode acessar os Laboratórios<br/> 
      fazer Reservas ou verificar suas reservas.</p>
      <div>
        <Link to="/laboratorio">
          <Button nome='Laboratório'/>
        </Link>
        <Link to="/reserva">
          <Button nome='Reservas'/>
        </Link>
        <Link to="/usuario">
          <Button nome='Usuário'/>
        </Link>
      </div>
        
    </div>
  );
}

export  {Inicio};
