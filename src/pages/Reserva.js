import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import { criarReserva } from '../service/service';
import './css/Reserva.css';

function Reserva({ loggedUser }) {
  const [laboratorioId, setLaboratorioId] = useState('');
  const [data, setdata] = useState(new Date().toISOString().split("T")[0]);
  const [hora, setHora] = useState(moment().tz("America/Sao_Paulo").format('HH:mm')); // Configura o horário para o horário de Brasília
  const [mensagem, setMensagem] = useState('');
  const [reservaConcluida, setReservaConcluida] = useState(false);

    const laboratorios = [
      { id: 1, nome: 'LAB001' },
      { id: 2, nome: 'LAB002' },
      { id: 3, nome: 'LAB003' },
    ];

  const handleReserva = async () => {
    // Cria reserva se estiver disponível
    try {
      await criarReserva({
        IdUsuario: loggedUser.idUsuario,
        IdLaboratorio: Number(laboratorioId),
        DiaHorarioReserva: new Date(`${data}T${hora}`),
        NumeroBoleto: 12345687
      });

      setMensagem('Reserva realizada com sucesso!');
      setReservaConcluida(true);
    } catch (error) {
      setMensagem(error.message);
    }
  };

  useEffect(() => {
    let timeout;

    if (reservaConcluida) {
      // Configura o timeout para liberar o laboratório após uma hora
      timeout = setTimeout(() => {
        setReservaConcluida(false);
        setMensagem('');
      }, 60 * 60 * 1000); // 1 hora em milissegundos
    }

    // Limpa o timeout ao desmontar o componente
    return () => clearTimeout(timeout);
  }, [reservaConcluida]);

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
          type="date"
          value={data}
          min="2023-01-01"
          max="2023-12-31"
          onChange={(e) => setdata(new Date(e.target.value).toISOString().split('T')[0])}
        />
        <input
          type="time"
          value={hora}
          min="09:00"
          max="22:00"
          onChange={(e) => setHora(e.target.value)}
        />
      </div>
      <div className="button-container">
        <button onClick={handleReserva}>Reservar</button>
      </div>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export { Reserva };
