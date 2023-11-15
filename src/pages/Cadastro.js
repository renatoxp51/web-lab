import React, { useState } from 'react';
import {criarUsuario} from '../service/service'; 
import './css/Cadastro.css';

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [documento, setDocumento] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('CPF'); // Default to CPF
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');

  const formatarDocumento = (input) => {
    // Remove caracteres não numéricos
    const numericInput = input.replace(/\D/g, '');

    // Limita o campo a 14 caracteres para CNPJ e 11 para CPF
    const formattedDocumento =
      tipoDocumento === 'CNPJ'
        ? numericInput.substring(0, 14)
        : numericInput.substring(0, 11);

      // Formata o CPF no formato "111.111.111-11" e CNPJ no formato "11.111.111/1111-11"
      return tipoDocumento === 'CNPJ'
      ? formattedDocumento.replace(
          /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
          '$1.$2.$3/$4-$5'
        )
      : formattedDocumento.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
  };

  const formatarTelefone = (input) => {
    // Remove caracteres não numéricos
    const numericInput = input.replace(/\D/g, '');

    // Limita o campo a 11 caracteres
    const formattedTelefone = numericInput.substring(0, 11);

    // Formata o telefone no formato "(11) 11111-1111"
    return formattedTelefone.replace(
      /^(\d{2})(\d{5})(\d{4})$/,
      '($1) $2-$3'
    );
  };


  const handleTipoDocumentoChange = (newTipoDocumento) => {
    setTipoDocumento(newTipoDocumento);

    // Limpar o campo "Tipo Documento" ao trocar de CPF para CNPJ e vice-versa
    setDocumento('');
  };


  const handleCadastro = () => {
    if (!nome || !email || !senha || !documento  || !telefone) {
      setMensagem('Preencha todos os campos');
      return;
    }

    criarUsuario({
      idTipoUsuario: 0,
      nomeUsuario: nome,
      emailUsuario: email,
      senhaUsuario: senha,
      cpfCnpjUsuario: documento,
      telefoneUsuario: telefone,
    })
      .then((response) => {
        if (response.status === 'success') {
          setMensagem('Cadastro realizado com sucesso');
        } else {
          setMensagem('Erro ao cadastrar: ' + response.message);
        }
      })
      .catch((error) => {
        console.error('Erro ao cadastrar:', error);
        setMensagem('Erro ao cadastrar');
      });
  };

  return (
    <div className="cadastro-background-container">
      <div className="cadastro-form-container">
        <h1>Cadastro</h1>
        <label>
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Senha:
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </label>
        <div>
          <label>
            Tipo de Documento:{' '}
            <select
              value={tipoDocumento}
              onChange={(e) => handleTipoDocumentoChange(e.target.value)}
            >
              <option value="CPF">CPF</option>
              <option value="CNPJ">CNPJ</option>
            </select>
          </label>
        </div>
        <label>
          Documento:
          <input
            type="text"
            value={documento}
            onChange={(e) => {
              const input = e.target.value;
              if (tipoDocumento === 'CNPJ' ? input.length <= 14 : input.length <= 11) {
                setDocumento(formatarDocumento(input));
              }
            }}
          />
        </label>
        <label>
          Telefone:
          <input
            type="text"
            placeholder="(DDD e número)"
            value={telefone}
            onChange={(e) => {
              const input = e.target.value;
              if (input.length <= 11) {
                setTelefone(formatarTelefone(input));
              }
            }}
          />
        </label>
        <div className="button-container">
  <button onClick={handleCadastro}>Confirmar</button>
</div>

        <p>{mensagem}</p>
      </div>
    </div>
  );
}

export default Cadastro;