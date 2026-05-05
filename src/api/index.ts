import taskApi from './endpoints/tasks';

export { taskApi };

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export async function fetcher<Response, Body = unknown>(
  url: string,
  method: HttpMethod = 'GET',
  body?: Body
): Promise<Response> {
  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body && method !== 'GET' ? JSON.stringify(body) : undefined,
  });

  if (method === 'DELETE') {
    return true as Response;
  }

  return response.json();
}
export const fetchApi = {
  get: <R>(url: string) => fetcher<R>(url, 'GET'),
  post: <R, B>(url: string, body?: B) => fetcher<R, B>(url, 'POST', body),
  put: <R, B>(url: string, body?: B) => fetcher<R, B>(url, 'PUT', body),
  delete: <R = boolean>(url: string) => fetcher<R>(url, 'DELETE'),
};
