import api from './api';

export const getMembers = () => api.get('/members');
export const addMember = (member: { name: string; email: string }) => api.post('/members', member); 