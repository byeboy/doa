import request from '../utils/request';

export async function query() {
  return request('/api/branches');
}

export async function save(values) {
  return request('/api/branches', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export async function update(payload) {
  const { values, id } = payload;
  return request(`/api/branches/${id}`, {
    method: 'PUT',
    body: JSON.stringify(values),
  });
}

export async function del(id) {
  return request(`/api/branches/${id}`, {
    method: 'DELETE',
  });
}
