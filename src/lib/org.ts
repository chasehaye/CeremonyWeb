import sendRequest from './sendRequest';

export function createOrg(data: { name: string }) {
  return sendRequest('/api/organization', 'POST', data);
}

export function getOrg(slug: string) {
  return sendRequest(`/api/organization/${slug}`);
}

export function listOrgs() {
  return sendRequest('/api/organizations');
}

export function deleteOrg(slug: string) {
  return sendRequest(`/api/organization/${slug}`, 'DELETE');
}
