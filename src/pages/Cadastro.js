
import React, { useState } from 'react';
import {criarUsuario} from '../service/service'; 
import { useNavigate } from 'react-router-dom';
import './css/Cadastro.css';


const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [documento, setDocumento] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');
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
          
          <input type="text" placeholder='Digite seu nome' value={nome} onChange={(e) => setNome(e.target.value)} />
        </label>
        <div>
  <label>
      <select
      value={tipoUsuario}
      onChange={(e) => setTipoUsuario(e.target.value)}
        >
      <option value="" disabled hidden>Você é um:</option>
      <option value="Aluno">Aluno</option>
      <option value="Professor">Professor</option>
      </select>
       </label>
        </div>
        <label>
    
          <input type="text" placeholder='Digite seu email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
        
          <input type="password" placeholder='Digite sua senha' value={senha} onChange={(e) => setSenha(e.target.value)} />
        </label>
        <div>
  <label>
        <select
        value={tipoDocumento}
        onChange={handleTipoDocumentoChange}
        >
        <option value="" disabled hidden>Tipo de Documento:</option>
        <option value="CPF">CPF</option>
        <option value="CNPJ">CNPJ</option>
        </select>
        </label>
        </div>
        <label>
        
          <input type="text" placeholder='Digite seu documento' value={documento} onChange={handleDocumentoChange} />
        </label>
        <label>
  
          <input
            type="text"
            placeholder="Digíte seu telefone (DDD e número)"
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