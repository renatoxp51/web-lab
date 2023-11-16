import api from './api';

export const getLaboratorios = async () => {
  try {
    const response = await api('Laboratorio');
    return response;
  } catch (error) {
    console.error('Erro ao obter laboratórios:', error);
    throw error;
  }
};

export const criarLaboratorio = async (novoLaboratorio) => {
  try {
    const response = await api('Laboratorio', 'POST', novoLaboratorio);
    return response;
  } catch (error) {
    console.error('Erro ao criar laboratório:', error);
    throw error;
  }
};

export const atualizarLaboratorio = async (id, laboratorioAtualizado) => {
  try {
    const response = await api(`Laboratorio/${id}`, 'PUT', laboratorioAtualizado);
    return response;
  } catch (error) {
    console.error('Erro ao atualizar laboratório:', error);
    throw error;
  }
};

export const excluirLaboratorio = async (id) => {
  try {
    const response = await api(`Laboratorio/${id}`, 'DELETE');
    return response;
  } catch (error) {
    console.error('Erro ao excluir laboratório:', error);
    throw error;
  }
};

export const excluirUsuario = async (userData) => {
  try {
    const response = await api('Usuario', 'DELETE', userData);
    return response;
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    throw error;
  }
};

export const atualizarUsuario = async (userData) => {
  try {
    const response = await api('Usuario', 'PUT', userData);
    return response;
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    throw error;
  }
};

export const obterUsuarios = async () => {
  try {
    const response = await api('Usuario');
    return response;
  } catch (error) {
    console.error('Erro ao obter usuários:', error);
    throw error;
  }
};

export const atualizarUsuarioPorId = async (id, userData) => {
  try {
    const response = await api(`Usuario/${id}`, 'PUT', userData);
    return response;
  } catch (error) {
    console.error('Erro ao atualizar usuário por ID:', error);
    throw error;
  }
};

export const criarUsuario = async (userData) => {
  try {
    const response = await api('Usuario', 'POST', userData);
    return { status: 'success', data: response.data };
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return { status: 'error', message: 'Erro ao criar usuário.' };
  }
};

export const fazerLogin = async (loginData) => {
  try {
    const response = await api('Usuario/login', 'POST', loginData);

    // Log the entire API response for debugging
    console.log('Resposta API:', response);
  } catch (error) {
  }
};

export const criarReserva = async (novaReserva) => {
  try {
    const response = await api('Reserva', 'POST', novaReserva);
    return response;
  } catch (error) {
    console.error('Erro ao criar reserva:', error);
    throw error;
  }
};
