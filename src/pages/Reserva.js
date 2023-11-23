import React, { useState } from 'react';
import { criarReserva, fazerLogin } from '../service/service';
import Button from '../components/Button';
import './css/Reserva.css';

function Reserva() {
  const [laboratorioId, setLaboratorioId] = useState('');
  const [dataHora, setDataHora] = useState('2023-01-01T12:00:00');
  const [mensagem, setMensagem] = useState('');


  const laboratorios = [
    { id: 'lab1', nome: 'Lab 1' },
    { id: 'lab2', nome: 'Lab 2' },
    { id: 'lab3', nome: 'Lab 3' },
  ];


  const handleReserva = () => {

    const user = fazerLogin();

     // Se estiver disponível, criar a reserva
     criarReserva({
       idUsuario: user.response.usuario.idUsuario,
       laboratorioId: laboratorioId,
       data: dataHora,
       numeroBoleto: 12345687
     });
 
     setMensagem('Reserva realizada com sucesso!');
   };

  return (
    <div className='Forms-Create-Reserva'>
      <h1>Reserva</h1>
      <p>A reserva padrão é de 1 hora por aluno.</p>
      <div> 
      <select
      className='Select-Reserva'
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
        className='Input-Reserva'
        type="datetime-local"
        value={dataHora}
        onChange={(e) => setDataHora(e.target.value)}
        />
      </div>
      <Button nome="Reservar" onClick={handleReserva} />
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export {Reserva};
