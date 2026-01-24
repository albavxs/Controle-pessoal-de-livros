import axios from 'axios';

// Em produção (Vercel), usamos caminhos relativos que o vercel.json redireciona para o backend.
// Em desenvolvimento local ou preview do Manus, mantemos a lógica de detecção de porta.
const getBaseURL = () => {
  const hostname = window.location.hostname;
  
  // Se estiver no Vercel (produção)
  if (hostname.includes('vercel.app')) {
    return '/api/';
  }
  
  // Se estiver no ambiente do Manus
  if (hostname.includes('manus.computer')) {
    const href = window.location.href;
    if (href.includes('3000-')) {
      return href.replace('3000-', '3001-').split('?')[0].split('#')[0];
    }
  }
  
  // Padrão local
  return 'http://localhost:3001/';
};

export const inAxios = axios.create({ baseURL: getBaseURL() });
