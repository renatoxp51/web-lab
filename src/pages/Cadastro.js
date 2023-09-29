import React, { useState } from 'react';
import {criarUsuario} from '../service/service'; 

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');

  const formatarCpf = (input) => {
    // Remove caracteres não numéricos
    const numericInput = input.replace(/\D/g, '');

    // Limita o campo a 11 caracteres
    const formattedCpf = numericInput.substring(0, 11);

    // Formata o CPF no formato "111.111.111/11"
    return formattedCpf.replace(
      /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
      '$1.$2.$3/$4'
    );
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

  const handleCadastro = () => {
    if (!nome || !email || !senha || !cpf || !telefone) {
      setMensagem('Preencha todos os campos');
      return;
    }

    criarUsuario({
      idTipoUsuario: 0,
      nomeUsuario: nome,
      emailUsuario: email,
      senhaUsuario: senha,
      cpfCnpjUsuario: cpf,
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
    <div>
      <h1>Cadastro</h1>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        style={{ display: 'block', marginBottom: '10px' }}
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: 'block', marginBottom: '10px' }}
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        style={{ display: 'block', marginBottom: '10px' }}
      />
      <input
        type="text"
        placeholder="CPF (apenas números)"
        value={cpf}
        onChange={(e) => {
          const input = e.target.value;
          // Limita o campo a 11 caracteres
          if (input.length <= 11) {
            setCpf(formatarCpf(input));
          }
        }}
        style={{ display: 'block', marginBottom: '10px' }}
      />
      <input
        type="text"
        placeholder="Telefone (DDD e número)"
        value={telefone}
        onChange={(e) => {
          const input = e.target.value;
          // Limita o campo a 11 caracteres
          if (input.length <= 11) {
            setTelefone(formatarTelefone(input));
          }
        }}
        style={{ display: 'block', marginBottom: '10px' }}
      />
      <button onClick={handleCadastro} style={{ display: 'block', marginBottom: '10px' }}>Cadastrar</button>
      <p>{mensagem}</p>
    </div>
  );
  
}

export default Cadastro;
