import { message } from 'antd';
import * as serve from '../services/branches';

export default {
  namespace: 'branch',
  state: {
    branches: [],
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
    *query({ payload }, { call, put }){
      const { data } = yield call(serve.query);
      const { success, post, message } = data;
      if(success){
        message.success(message);
        yield put({
          type: 'querySuccess',
          payload: {
            branches: post.branches,
          }
        });
      } else {
        message.success(message);
        yield put({
          type: 'querySuccess',
          payload: {
            branches: post.branches,
          }
        });
      }
    },
  },
  subscriptions: {
    setup({dispatch, history}){
      return history.listen(({ pathname }) => {
        if (pathname === '/branches') {
          dispatch({ type: 'query' });
        }
      });
    }
  },
};
