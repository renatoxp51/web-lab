import React, { useEffect, useState } from 'react';
import {
  getLaboratorios,
  criarLaboratorio,
  atualizarLaboratorio,
  excluirLaboratorio,
} from '../service/service';

function Laboratorio() {
  const [laboratorios, setLaboratorios] = useState([]);
  const [novoLaboratorio, setNovoLaboratorio] = useState({
    NomeLaboratorio: '',
    AndarLaboratorio: '',
    DescricaoLaboratorio: '',
    IsActivate: true,
  });

  useEffect(() => {
    // Função para carregar a lista de laboratórios
    const carregarLaboratorios = async () => {
      try {
        const data = await getLaboratorios();
        setLaboratorios(data);
      } catch (error) {
        console.error('Erro ao carregar laboratórios:', error);
      }
    };

    carregarLaboratorios();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoLaboratorio({
      ...novoLaboratorio,
      [name]: value,
    });
  };

  const handleCriarLaboratorio = async () => {
    try {
      const novoLab = await criarLaboratorio(novoLaboratorio);
      setLaboratorios([...laboratorios, novoLab]);
      setNovoLaboratorio({
        NomeLaboratorio: '',
        AndarLaboratorio: '',
        DescricaoLaboratorio: '',
        IsActivate: true,
      });
    } catch (error) {
      console.error('Erro ao criar laboratório:', error);
    }
  };

  const handleAtualizarLaboratorio = async (id, novoLaboratorio) => {
    try {
      const laboratorioAtualizado = await atualizarLaboratorio(id, novoLaboratorio);
      // Atualize a lista de laboratórios com o laboratório atualizado
      const updatedLaboratorios = laboratorios.map((lab) => {
        if (lab.id === id) {
          return laboratorioAtualizado;
        }
        return lab;
      });
      setLaboratorios(updatedLaboratorios);
    } catch (error) {
      console.error('Erro ao atualizar laboratório:', error);
    }
  };

  const handleExcluirLaboratorio = async (id) => {
    try {
      await excluirLaboratorio(id);
      // Remove o laboratório excluído da lista
      const updatedLaboratorios = laboratorios.filter((lab) => lab.id !== id);
      setLaboratorios(updatedLaboratorios);
    } catch (error) {
      console.error('Erro ao excluir laboratório:', error);
    }
  };

  return (
    <div>
      <h1>Lista de Laboratórios</h1>
      <ul>
        {laboratorios.map((lab) => (
          <li key={lab.id}>
            {lab.NomeLaboratorio} - {lab.AndarLaboratorio} - {lab.DescricaoLaboratorio}
            <button onClick={() => handleAtualizarLaboratorio(lab.id, { ...lab, IsActivate: !lab.IsActivate })}>
              Ativar/Desativar
            </button>
            <button onClick={() => handleExcluirLaboratorio(lab.id)}>Excluir</button>
          </li>
        ))}
      </ul>
      <h2>Criar Novo Laboratório</h2>
      <div>
        <label>Nome:</label>
        <input type="text" name="NomeLaboratorio" value={novoLaboratorio.NomeLaboratorio} onChange={handleInputChange} />
      </div>
      <div>
        <label>Andar:</label>
        <input type="text" name="AndarLaboratorio" value={novoLaboratorio.AndarLaboratorio} onChange={handleInputChange} />
      </div>
      <div>
        <label>Descrição:</label>
        <input type="text" name="DescricaoLaboratorio" value={novoLaboratorio.DescricaoLaboratorio} onChange={handleInputChange} />
      </div>
      <button onClick={handleCriarLaboratorio}>Criar Laboratório</button>
    </div>
  );
}

export default Laboratorio;
