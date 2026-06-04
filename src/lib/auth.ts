import sendRequest from './sendRequest.js';

const BASE_URL = '/api/auth';

interface Payload {
  [key: string]: string | number | boolean;
}

export function registerUser(userData: Payload) {
  return sendRequest(`${BASE_URL}/register`, 'POST', userData);
}

export function loginUser(userData: Payload) {
  return sendRequest(`${BASE_URL}/login`, 'POST', userData);
}

export function logout() {
  return sendRequest(`${BASE_URL}/logout`, 'POST');
}

export function getMe() {
  return sendRequest(`${BASE_URL}/me`);
}

export function sendVerification() {
  return sendRequest(`${BASE_URL}/send-verification`, 'POST');
}

export function verifyEmail(token: string) {
  return sendRequest(`/api/auth/verify/${token}`, 'POST');
}
