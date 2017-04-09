import request from '../utils/request';

export async function query() {
  return request('/api/files');
}

export async function getRelation(payload) {
  const { type, id } = payload;
  return request(`/api/files/relation/${type}/${id}`);
}

export async function down(id) {
  return request(`/api/files/${id}`);
}