import { fetchWithAuth } from './api';

export async function getMembers(token: string) {
  const res = await fetchWithAuth('/api/members', token);
  if (!res.ok) throw new Error('Failed to fetch members');
  return res.json();
}

export async function createMember(token: string, member: any) {
  const res = await fetchWithAuth('/api/members', token, {
    method: 'POST',
    body: JSON.stringify(member),
  });
  if (!res.ok) throw new Error('Failed to create member');
  return res.json();
}

export async function updateMember(token: string, id: string, member: any) {
  const res = await fetchWithAuth(`/api/members/${id}`, token, {
    method: 'PUT',
    body: JSON.stringify(member),
  });
  if (!res.ok) throw new Error('Failed to update member');
  return res.json();
}

export async function deleteMember(token: string, id: string) {
  const res = await fetchWithAuth(`/api/members/${id}`, token, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete member');
  return res.json();
} 