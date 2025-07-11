import { fetchWithAuth } from './api';

export async function getLoansReport(token: string) {
  const res = await fetchWithAuth('/api/reports/loans', token);
  if (!res.ok) throw new Error('Failed to fetch loans report');
  return res.json();
}

export async function getOverdueReport(token: string) {
  const res = await fetchWithAuth('/api/reports/overdue', token);
  if (!res.ok) throw new Error('Failed to fetch overdue report');
  return res.json();
} 