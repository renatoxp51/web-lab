import React, { useState } from 'react';
import { criarReserva } from '../service/service';
import Button from '../components/Button';
import './css/Reserva.css';

function Reserva() {
  const [laboratorioId, setLaboratorioId] = useState('');
  const [dataHora, setDataHora] = useState('');

  const laboratorios = [
    { id: 'lab1', nome: 'Lab 1' },
    { id: 'lab2', nome: 'Lab 2' },
    { id: 'lab3', nome: 'Lab 3' },
  ];

  const handleReserva = () => {
    criarReserva({
      laboratorioId: laboratorioId,
      data: dataHora
    });
  };

  return (
    <div>
      <h1>Reserva</h1>
      <p>A reserva padrão é de 1 hora por aluno.</p>
      <div className='Forms-Create-Reserva'> 
      <select
        value={laboratorioId}
        onChange={(e) => setLaboratorioId(e.target.value)}
        >
        <option value="">Selecione um laboratório</option>
        {laboratorios.map((lab) => (
          <option key={lab.id} value={lab.id}>
            {lab.nome}
          </option>
        ))}
      </select>
      <input
        type="datetime-local"
        value={dataHora}
        onChange={(e) => setDataHora(e.target.value)}
        />
      </div>
      <Button nome="Reservar" onClick={handleReserva} />
    </div>
  );
}

export {Reserva};
