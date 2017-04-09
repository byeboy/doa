import request from '../utils/request';

export async function query(type) {
  return request(`/api/${type}`);
}

export async function getRelation(payload) {
  const { type, upType, upId } = payload;
  return request(`/api/${type}/relation/${upType}/${upId}`);
}

export async function save(payload) {
  const { type, item } = payload;
  if(item.id) {
    const {id, ...values} = item;
    return request(`/api/${type}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(values),
    });
  }
  return request(`/api/${type}`, {
    method: 'POST',
    body: JSON.stringify(item),
  });
}

export async function saveRelation(payload) {
  const { type, id, upType, upId } = payload;
  return request(`/api/${upType}/${upId}`, {
    method: 'POST',
    body: JSON.stringify({
      type,
      id,
    }),
  });
}

export async function patchRelationCount(payload) {
  const { type, id, upType, upId, required_count } = payload;
  return request(`/api/${upType}/relations/${upId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      type,
      id,
      required_count,
    }),
  });
}

export async function del(payload) {
  const { type, id } = payload;
  return request(`/api/${type}/${id}`, {
    method: 'DELETE',
  });
}

export async function delRelation(payload) {
  const { type, id, upType, upId } = payload;
  return request(`/api/${upType}/${upId}/${type}/${id}`, {
    method: 'DELETE',
  });
}