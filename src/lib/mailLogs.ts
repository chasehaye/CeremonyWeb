import sendRequest from './sendRequest.js';

const BASE_URL = '/api/mail';

export function listMailLogs() {
  return sendRequest(`${BASE_URL}/logs`);
}
