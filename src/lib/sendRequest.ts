/* eslint-disable @typescript-eslint/no-explicit-any */
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface Payload {
  [key: string]: any;
}

export default async function sendRequest(
  endpoint: string,
  method: HttpMethod = 'GET',
  payload: Payload | null = null
): Promise<any> {
  const BACKEND_URL = import.meta.env.VITE_API_URL;
  let url = `${BACKEND_URL}${endpoint}`;

  const options: RequestInit = {
    method,
    credentials: 'include',
  };

  if (payload) {
    if (method.toUpperCase() === 'GET') {
      const queryString = new URLSearchParams(payload).toString();
      url += `?${queryString}`;
    } else {
      options.headers = { 'Content-Type': 'application/json' };
      options.body = JSON.stringify(payload);
    }
  }

  const res = await fetch(url, options);
  if (res.ok) return res.json();
  const err = await res.json();
  throw new Error(err.error || 'Bad Request');
}
