import { fetchWithAuth } from './api';

export async function getLoans(token: string) {
  const res = await fetchWithAuth('/api/loans', token);
  if (!res.ok) throw new Error('Failed to fetch loans');
  return res.json();
}

export async function getLoan(token: string, id: string) {
  const res = await fetchWithAuth(`/api/loans/${id}`, token);
  if (!res.ok) throw new Error('Failed to fetch loan');
  return res.json();
}

export async function getMyLoans(token: string) {
  const res = await fetchWithAuth('/api/loans/my-loans', token);
  if (!res.ok) throw new Error('Failed to fetch my loans');
  return res.json();
}

export async function getOverdueLoans(token: string) {
  const res = await fetchWithAuth('/api/loans/overdue', token);
  if (!res.ok) throw new Error('Failed to fetch overdue loans');
  return res.json();
}

export async function createLoan(token: string, loan: any) {
  const res = await fetchWithAuth('/api/loans', token, {
    method: 'POST',
    body: JSON.stringify(loan),
  });
  if (!res.ok) throw new Error('Failed to create loan');
  return res.json();
}

export async function updateLoan(token: string, id: string, loan: any) {
  const res = await fetchWithAuth(`/api/loans/${id}`, token, {
    method: 'PUT',
    body: JSON.stringify(loan),
  });
  if (!res.ok) throw new Error('Failed to update loan');
  return res.json();
}

export async function returnBook(token: string, loanId: string, notes?: string) {
  const res = await fetchWithAuth(`/api/loans/${loanId}/return`, token, {
    method: 'POST',
    body: JSON.stringify({ notes }),
  });
  if (!res.ok) throw new Error('Failed to return book');
  return res.json();
}

export async function deleteLoan(token: string, id: string) {
  const res = await fetchWithAuth(`/api/loans/${id}`, token, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete loan');
  return res.json();
} 