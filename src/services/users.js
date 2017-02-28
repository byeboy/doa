import request from '../utils/request';

export async function query() {
  return request('/api/users');
}

export async function auth() {
  return request('/api/auth');
}

export async function login(values) {
  return request('/api/login', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export async function reg(values) {
  return request('/api/reg', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
