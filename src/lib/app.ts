import sendRequest from './sendRequest';

export function listApps(orgSlug: string) {
  return sendRequest(`/api/organization/${orgSlug}/apps`);
}

export function createApp(
  orgSlug: string,
  data: { name: string; description?: string }
) {
  return sendRequest(`/api/organization/${orgSlug}/apps`, 'POST', data);
}

export function deleteApp(orgSlug: string, appSlug: string) {
  return sendRequest(`/api/organization/${orgSlug}/apps/${appSlug}`, 'DELETE');
}

export function rotateKey(orgSlug: string, appSlug: string) {
  return sendRequest(
    `/api/organization/${orgSlug}/apps/${appSlug}/rotate-key`,
    'POST'
  );
}

export function getApp(orgSlug: string, appSlug: string) {
  return sendRequest(`/api/organization/${orgSlug}/apps/${appSlug}`);
}
