import request from '../utils/request';

export async function query(type) {
  return request(`/api/records/${type}`);
}

export async function save(payload) {
  const { type, item } = payload;
  return request(`/api/records/${type}/${item.id}`, {
    method: 'POST',
    body: JSON.stringify(item),
  });
}

export async function exp() {
  return request('/api/records/export');
}