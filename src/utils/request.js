import fetch from 'dva/fetch';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else if (response.status === 401) {
    window.location.href = '/';
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}


/** 
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
  /*return fetch(url, options, response)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));*/
  if(sessionStorage.getItem('authorization') !== null) {
    options = {
      ...options,
      headers: {
        'authorization': sessionStorage.getItem('authorization'),
      }
    }
  }
  const response = await fetch(url, options);
 
  checkStatus(response);
 
  const data = await response.json();
 
  const ret = {
    data,
    response: response,
  };
 
/*  if (response.headers.get('x-total-count')) {
    ret.headers['x-total-count'] = response.headers.get('x-total-count');
  }*/
 
  return ret;
}
