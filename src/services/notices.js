import request from '../utils/request';

export async function query() {
  return request('/api/notices');
}

export async function save(values) {
  return request('/api/notices', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export async function update(payload) {
  const { values, id } = payload;
  return request(`/api/notices/${id}`, {
    method: 'PUT',
    body: JSON.stringify(values),
  });
}

export async function del(id) {
  return request(`/api/notices/${id}`, {
    method: 'DELETE',
  });
}