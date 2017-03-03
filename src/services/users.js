import request from '../utils/request';

export async function query() {
  return request('/api/users');
}

export async function search(payload) {
  const { param, val } = payload;
  if(val === ''){
    return request('/api/users');    
  }
  return request(`/api/users/${param}/${val}`);
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

export async function update(payload) {
  const { values, id } = payload;
  return request(`/api/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(values),
  });
}
