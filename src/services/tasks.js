import request from '../utils/request';

export async function query() {
  return request('/api/tasks/user');
}

export async function save(values) {
  return request(`/api/tasks`, {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export async function patch(payload) {
  const {values, id} = payload;
  return request(`/api/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}

export async function update(payload) {
  const {values, id} = payload;
  return request(`/api/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(values),
  });
}

export async function del(id) {
  return request(`/api/tasks/${id}`, {
    method: 'DELETE',
  });
}