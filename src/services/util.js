import request from '../utils/request';

export function delay(timeout=1700){
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}