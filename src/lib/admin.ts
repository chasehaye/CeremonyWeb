import sendRequest from './sendRequest';

export function listUsers() {
  return sendRequest('/api/admin/users');
}

export function approveUser(id: number) {
  return sendRequest(`/api/admin/users/${id}/approve`, 'PATCH');
}

export function rejectUser(id: number) {
  return sendRequest(`/api/admin/users/${id}/reject`, 'PATCH');
}
