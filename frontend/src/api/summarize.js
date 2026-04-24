import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 60000,
  headers: { 'Content-Type': 'application/json' },
});

export async function postSummarize({ input_type, content, length }) {
  const response = await api.post('/api/summarize', {
    input_type,
    content,
    length,
  });
  return response.data;
}

export default api;
