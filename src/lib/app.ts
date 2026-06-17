import sendRequest from './sendRequest';

export function listApps() {
  return sendRequest('/api/apps');
}

export function createApp(data: { name: string; description?: string }) {
  return sendRequest('/api/apps', 'POST', data);
}

export function deleteApp(id: number) {
  return sendRequest(`/api/apps/${id}`, 'DELETE');
}

export function rotateKey(id: number) {
  return sendRequest(`/api/apps/${id}/rotate-key`, 'POST');
}
