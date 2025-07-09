import api from './api';

export const getReservations = () => api.get('/reservations');
export const reserveBook = (reservation: { book: string; member: string }) => api.post('/reservations', reservation); 