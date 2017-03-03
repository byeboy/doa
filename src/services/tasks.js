import request from '../utils/request';

const loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
const user = {
  id:1,
  name:'test',
  branch: {
    id:3,
    authority:9,
  }
}

export async function query(id) {
  return request(`/api/tasks/user/${id}`);
}

export async function search(payload) {
  const { param, val } = payload;
  if(val === ''){
    return request(`/api/tasks/user/${id}`);
  }
  return request(`/api/tasks/${param}/{val}`);
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