import React, { useState } from 'react';
import { criarReserva } from '../service/service';

function Reserva() {
  const [laboratorioId, setLaboratorioId] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');

  const laboratorios = [
    { id: 'lab1', nome: 'Lab 1' },
    { id: 'lab2', nome: 'Lab 2' },
    { id: 'lab3', nome: 'Lab 3' },
  ];

  const handleReserva = () => {
    criarReserva({
      laboratorioId: laboratorioId,
      data: data,
      hora: hora,
    });
  };

  return (
    <div>
      <h1>Reserva</h1>
      <p>A reserva padrão é de 1 hora por aluno.</p>
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
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <input
        type="time"
        value={hora}
        onChange={(e) => setHora(e.target.value)}
      />
      <button onClick={handleReserva}>Reservar</button>
    </div>
  );
}

export default Reserva;
