import request from '../utils/request';

export async function query() {
  return request('/api/part-properties');
}

export async function search(payload) {
  const { param, val } = payload;
  if(val === ''){
    return request('/api/notices');
  }
  return request(`/api/notices/${param}/${val}`);
}

export async function save(payload) {
  const { property, values } = payload;
  return request(`/api/${property}`, {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export async function patch(payload) {
  const { property, key, value, id } = payload;
  const values = {key, value};
  return request(`/api/${property}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}

export async function del(payload) {
  const { property, id } = payload;
  return request(`/api/${property}/${id}`, {
    method: 'DELETE',
  });
}