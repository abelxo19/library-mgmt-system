import { fetchWithAuth } from './api';

export async function getReservations(token: string) {
  const res = await fetchWithAuth('/api/reservations', token);
  if (!res.ok) throw new Error('Failed to fetch reservations');
  return res.json();
}

export async function createReservation(token: string, reservation: any) {
  const res = await fetchWithAuth('/api/reservations', token, {
    method: 'POST',
    body: JSON.stringify(reservation),
  });
  if (!res.ok) throw new Error('Failed to create reservation');
  return res.json();
}

export async function updateReservation(token: string, id: string, reservation: any) {
  const res = await fetchWithAuth(`/api/reservations/${id}`, token, {
    method: 'PUT',
    body: JSON.stringify(reservation),
  });
  if (!res.ok) throw new Error('Failed to update reservation');
  return res.json();
}

export async function deleteReservation(token: string, id: string) {
  const res = await fetchWithAuth(`/api/reservations/${id}`, token, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete reservation');
  return res.json();
} 