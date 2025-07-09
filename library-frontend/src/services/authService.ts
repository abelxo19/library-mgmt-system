import api from './api';

export const login = async (username: string, password: string) => {
  // Sample login request
  return api.post('/auth/login', { username, password });
};

export const logout = () => {
  // Sample logout logic
  localStorage.removeItem('token');
}; 