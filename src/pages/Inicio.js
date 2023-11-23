import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import '../pages/css/Inicio.css'

function Inicio() {
  return (
    <div>
      <h1 className='h1Inicio'>Bem-vindo ao nosso ReservaLab!</h1>
      <div className="BodyInicio">
        <p>
          Aqui você pode acessar os Laboratórios
          fazer Reservas ou verificar suas reservas.
        </p>
        <div className="DivBtn">
          <Link to="/laboratorio">
            <Button nome="Laboratórios" />
          </Link>
          <Link to="/reserva">
            <Button nome="Reservar" />
          </Link>
          <Link to="/usuario">
            <Button nome="Usuário" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export  {Inicio};
