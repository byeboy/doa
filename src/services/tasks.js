import request from '../utils/request';

export async function query() {
  return request('/api/tasks/user');
}

export async function patch(params) {
  const {param, id} = params;
  return request(`/api/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(param),
  });
}

export async function del(id) {
  return request(`/api/tasks/${id}`, {
    method: 'DELETE',
  });
}