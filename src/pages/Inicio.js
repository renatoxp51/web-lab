import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import '../pages/css/Inicio.css'

function Inicio() {
  return (
    <div>
      <h2 className='h1Inicio'>Bem-vindo ao nosso</h2>
      <h1 className='h1Inicio2'><strong>ReservaLab!</strong></h1>
      <div className="BodyInicio">
        <p className='paragrafo'>
          Aqui você pode acessar os Laboratórios
          fazer Reservas ou verificar suas reservas.
        </p>
        <div>
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
