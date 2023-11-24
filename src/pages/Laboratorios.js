// Laboratorios.js

import React, { useEffect, useState } from 'react';
import { getLaboratorios, atualizarLaboratorio } from '../service/service';

function Laboratorio({ loggedUser }) {
  const [laboratorios, setLaboratorios] = useState([]);

  useEffect(() => {
    const carregarLaboratorios = async () => {
      try {
        const response = await getLaboratorios(loggedUser.idUsuario);

        if (response.$values && Array.isArray(response.$values)) {
          setLaboratorios(response.$values);
        } else {
          console.error('Erro ao carregar laboratórios: a resposta da API não contém a propriedade $values ou não é um array', response);
        }
      } catch (error) {
        console.error('Erro ao carregar laboratórios:', error);
      }
    };

    carregarLaboratorios();
  }, [loggedUser.idUsuario]);

  const handleAtualizarLaboratorio = async (id, laboratorioAtualizado) => {
    try {
      await atualizarLaboratorio(id, laboratorioAtualizado);
      const response = await getLaboratorios(loggedUser.idUsuario);

      if (response.$values && Array.isArray(response.$values)) {
        setLaboratorios(response.$values);
      } else {
        console.error('Erro ao atualizar laboratório: a resposta da API não contém a propriedade $values ou não é um array', response);
      }
    } catch (error) {
      console.error('Erro ao atualizar laboratório:', error);
    }
  };

  return (
    <div>
      <h1>Lista de Laboratórios</h1>
      <ul>
        {laboratorios.map((lab) => (
          <li key={lab.idLaboratorio}>
            <h3>{lab.nomeLaboratorio}</h3>
            <p>Andar: {lab.andarLaboratorio}</p>
            <p>Descrição: {lab.descricaoLaboratorio}</p>
            <p>Status: {lab.isActivate ? 'Disponível para Reserva' : 'Indisponível para Reserva'}</p>
            {lab.idLaboratorioNavigation && lab.idLaboratorioNavigation.tbReservas && lab.idLaboratorioNavigation.tbReservas.length > 0 && (
              <div>
                <p>Reservas:</p>
                <ul>
                  {lab.idLaboratorioNavigation.tbReservas.map((reserva) => (
                    <li key={reserva.idReserva}>
                      <p>Data e Hora da Reserva: {new Date(reserva.diaHorarioReserva).toLocaleString()}</p>
                      <p>Usuário: {reserva.idUsuarioNavigation.nomeUsuario}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <button onClick={() => handleAtualizarLaboratorio(lab.idLaboratorio, { ...lab, isActivate: !lab.isActivate })}>
              Ativar/Desativar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { Laboratorio };
