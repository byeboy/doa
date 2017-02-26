import { message } from 'antd';
import * as serve from '../services/users';
import { delay } from '../services/util';

export default {
  namespace: 'user',
  state: {
    users: [],
  },
  reducers: {
    querySuccess(state, action){
      return {
        ...state,
        ...action.payload,
      }
    },
  },
  effects: {
    *query({ payload }, {call, put}) {
      yield call(delay);
      const { data } = yield call(serve.query);
      const { success, post, message } = data;
      if(success){
        message.success(message);
        yield put({
          type: 'querySuccess',
          payload: {
            users: post.users,
          }
        });
      } else {
        message.warning(message);
        yield put({
          type: 'querySuccess',
          payload: {
            users: post.users,
          }
        });
      }
    },
  },
  subscriptions: {
    setup({dispatch, history}){
      return history.listen(({ pathname}) => {
        if (pathname === '/users') {
          dispatch({type: 'query'})
        }
      });
    }
  },
};
