import React, { useState } from 'react';
import {criarUsuario} from '../service/service'; 
import { useNavigate } from 'react-router-dom';
import './css/Cadastro.css';


const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [documento, setDocumento] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('CPF');
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('Aluno');
  const navigate = useNavigate();

  // Função para formatar o documento
  const handleDocumentoChange = (e) => {
    const input = e.target.value;
    setDocumento(() => {
      const numericInput = input.replace(/\D/g, '');
      const limitedInput =
        tipoDocumento === 'CNPJ' ? numericInput.substring(0, 14) : numericInput.substring(0, 11);

      const formattedInput =
        tipoDocumento === 'CNPJ'
          ? limitedInput.replace(
              /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
              '$1.$2.$3/$4-$5'
            )
          : limitedInput.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');

      return formattedInput;
    });
  };

  // Função para formatar o telefone
  const handleTelefoneChange = (e) => {
    const input = e.target.value;
    setTelefone(() => {
      const numericInput = input.replace(/\D/g, '');
      const limitedInput = numericInput.substring(0, 11);
      const formattedInput = limitedInput.replace(/^(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3');
      return formattedInput;
    });
  };

  // Função para lidar com a troca de tipo de documento
  const handleTipoDocumentoChange = (e) => {
    const novoTipoDocumento = e.target.value;

    // Se o tipo de documento foi alterado, limpar o valor do documento
    if (novoTipoDocumento !== tipoDocumento) {
      setDocumento('');
    }

    setTipoDocumento(novoTipoDocumento);
  };

  // Função para lidar com o cadastro
  const handleCadastro = async () => {
    try {
      if (!nome || !email || !senha || !documento || !telefone || !tipoUsuario) {
        setMensagem('Preencha todos os campos');
        return;
      }

      const response = await criarUsuario({
        idTipoUsuario: tipoUsuario === 'Aluno' ? 1 : 2,
        nomeUsuario: nome,
        emailUsuario: email,
        senhaUsuario: senha,
        cpfCnpjUsuario: documento.replace(/\D/g, ''),
        telefoneUsuario: telefone.replace(/\D/g, ''),
      });

      if (response.status === 'success') {
        setMensagem('Cadastro realizado com sucesso');
        navigate('/');
      } else {
        setMensagem('Erro ao cadastrar: ' + response.message);
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      setMensagem('Erro ao cadastrar. Tente novamente mais tarde.');
    }
  };

  return (
    <div className="cadastro-background-container">
      <div className="cadastro-form-container">
        <h1>Cadastro</h1>
        <label>
          Nome:
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </label>
        <div>
          <label>
            Você é um{' '}
            <select value={tipoUsuario} onChange={(e) => setTipoUsuario(e.target.value)}>
              <option value="Aluno">Aluno</option>
              <option value="Professor">Professor</option>
            </select>
          </label>
        </div>
        <label>
          Email:
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Senha:
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
        </label>
        <div>
          <label>
            Tipo de Documento:{' '}
            <select
              value={tipoDocumento}
              onChange={handleTipoDocumentoChange} // Atualizado para usar a nova função
            >
              <option value="CPF">CPF</option>
              <option value="CNPJ">CNPJ</option>
            </select>
          </label>
        </div>
        <label>
          Documento:
          <input type="text" value={documento} onChange={handleDocumentoChange} />
        </label>
        <label>
          Telefone:
          <input
            type="text"
            placeholder="(DDD e número)"
            value={telefone}
            onChange={handleTelefoneChange}
          />
        </label>
        <div className="button-container">
          <button onClick={handleCadastro}>Confirmar</button>
        </div>
        <p>{mensagem}</p>
      </div>
    </div>
  );
};

export { Cadastro };