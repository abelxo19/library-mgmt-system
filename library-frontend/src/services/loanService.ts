import api from './api';

export const getLoans = () => api.get('/loans');
export const createLoan = (loan: { book: string; member: string; dueDate: string }) => api.post('/loans', loan); 