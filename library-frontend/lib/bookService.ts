import { fetchWithAuth } from './api';

export async function getBooks(token: string) {
  const res = await fetchWithAuth('/api/books', token);
  if (!res.ok) throw new Error('Failed to fetch books');
  return res.json();
}

export async function createBook(token: string, book: any) {
  const res = await fetchWithAuth('/api/books', token, {
    method: 'POST',
    body: JSON.stringify(book),
  });
  if (!res.ok) throw new Error('Failed to create book');
  return res.json();
}

export async function updateBook(token: string, id: string, book: any) {
  const res = await fetchWithAuth(`/api/books/${id}`, token, {
    method: 'PUT',
    body: JSON.stringify(book),
  });
  if (!res.ok) throw new Error('Failed to update book');
  return res.json();
}

export async function deleteBook(token: string, id: string) {
  const res = await fetchWithAuth(`/api/books/${id}`, token, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete book');
  return res.json();
} 