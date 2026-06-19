import sendRequest from './sendRequest.js';

const BASE_URL = '/api';

export function listMailLogs(slug: string) {
  return sendRequest(`${BASE_URL}/organization/${slug}/mail/logs`);
}
