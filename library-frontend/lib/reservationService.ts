import { fetchWithAuth } from './api';

export async function getReservations(token: string) {
  const res = await fetchWithAuth('/api/reservations', token);
  if (!res.ok) throw new Error('Failed to fetch reservations');
  return res.json();
}

export async function getReservation(token: string, id: string) {
  const res = await fetchWithAuth(`/api/reservations/${id}`, token);
  if (!res.ok) throw new Error('Failed to fetch reservation');
  return res.json();
}

export async function getMyReservations(token: string) {
  const res = await fetchWithAuth('/api/reservations/my-reservations', token);
  if (!res.ok) throw new Error('Failed to fetch my reservations');
  return res.json();
}

export async function getReadyReservations(token: string) {
  const res = await fetchWithAuth('/api/reservations/ready', token);
  if (!res.ok) throw new Error('Failed to fetch ready reservations');
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

export async function fulfillReservation(token: string, reservationId: string, dueDate: string) {
  const res = await fetchWithAuth(`/api/reservations/${reservationId}/fulfill`, token, {
    method: 'POST',
    body: JSON.stringify({ dueDate }),
  });
  if (!res.ok) throw new Error('Failed to fulfill reservation');
  return res.json();
}

export async function cancelReservation(token: string, id: string) {
  const res = await fetchWithAuth(`/api/reservations/${id}/cancel`, token, {
    method: 'POST',
  });
  if (!res.ok) throw new Error('Failed to cancel reservation');
  return res.json();
}

export async function deleteReservation(token: string, id: string) {
  const res = await fetchWithAuth(`/api/reservations/${id}`, token, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete reservation');
  return res.json();
} 