import axios from 'axios';

// Usamos caminhos relativos. 
// Em desenvolvimento, o "proxy" no package.json redireciona para o localhost:3001.
// Em produção (Vercel), o vercel.json redireciona para o backend.
export const inAxios = axios.create({ baseURL: '/api/' });
