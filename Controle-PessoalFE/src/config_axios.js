import axios from 'axios';

// Com a nova estrutura /api na raiz, o Vercel e o Proxy local 
// funcionarão perfeitamente com caminhos relativos.
export const inAxios = axios.create({ baseURL: '/api' });
