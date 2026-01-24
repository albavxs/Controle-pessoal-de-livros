import axios from 'axios';

// Detecta se estamos no ambiente do Manus e ajusta a porta para 3001
const getBaseURL = () => {
  const href = window.location.href;
  if (href.includes('3000-')) {
    return href.replace('3000-', '3001-').split('?')[0].split('#')[0];
  }
  return 'http://localhost:3001/';
};

export const inAxios = axios.create({ baseURL: getBaseURL() });
