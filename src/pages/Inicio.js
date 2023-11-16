import React from 'react';
import { Link } from 'react-router-dom';

function Inicio() {
  return (
    <div>
      <h1>Bem-vindo ao nosso ReservaLab!</h1>
      <p>Aqui você pode acessar os Laboratórios ou fazer Reservas.</p>
      <div>
        <Link to="/laboratorio">
          <button>Laboratórios</button>
        </Link>
        <Link to="/reserva">
          <button>Reservas</button>
        </Link>
      </div>
    </div>
  );
}

export {Inicio};
