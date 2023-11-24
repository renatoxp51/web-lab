const baseUrl = 'https://localhost:7126/api/';

const getToken = () => {
  return localStorage.getItem('token');
};

export const setToken = (token) => {
  return localStorage.setItem('token', token)
}

const api = async (endpoint, method = 'GET', body = null) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, config);
    const contentType = response.headers.get('content-type');

    if (response.status === 204) {
      // Resposta sem conteúdo (No Content)
      return null;
    }

    if (contentType && contentType.includes('application/json')) {
      // Se a resposta é JSON, parseia a resposta como JSON
      const result = await response.json();

      if (result.error === 'AUTHENTICATION_FAILED') {
        throw new Error('Autenticação falhou. Por favor, faça login novamente.');
      }
      return result;

    } else {
      // Se a resposta não é JSON, obtém mensagem de texto da resposta
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
  } catch (error) {
    throw error;
  }
};

export default api;
