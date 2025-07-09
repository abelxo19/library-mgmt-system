import api from './api';

export const getBooks = () => api.get('/books');
export const addBook = (book: { title: string; author: string }) => api.post('/books', book); 