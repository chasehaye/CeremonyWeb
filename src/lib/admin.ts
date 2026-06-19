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

export function banUser(id: number) {
  return sendRequest(`/api/admin/users/${id}/ban`, 'PATCH');
}

export function unbanUser(id: number) {
  return sendRequest(`/api/admin/users/${id}/unban`, 'PATCH');
}

export function grantCreate(id: number) {
  return sendRequest(`/api/admin/users/${id}/grant-create`, 'PATCH');
}

export function revokeCreate(id: number) {
  return sendRequest(`/api/admin/users/${id}/revoke-create`, 'PATCH');
}

export function grantAdmin(id: number) {
  return sendRequest(`/api/admin/users/${id}/grant-admin`, 'PATCH');
}

export function revokeAdmin(id: number) {
  return sendRequest(`/api/admin/users/${id}/revoke-admin`, 'PATCH');
}
