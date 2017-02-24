import { message } from 'antd';
import * as serve from '../services/notices';

export default {
  namespace: 'notice',
  state: {
    notices: [],
  },
  reducers: {
    querySuccess(state, action){
      return {
        ...state,
        ...action.payload,
      }
    }
  },
  effects: {
    *query({ payload }, { call, put }){
      const { data } = yield call(serve.query);
      console.log(data);
      const { success, post, message } = data;
      if(success){
        message.success(message);
        yield put({
          type: 'querySuccess',
          payload: {
            notices: post.notices,
          }
        });
      } else {
        message.warning(message);
        yield put({
          type: 'querySuccess',
          payload: {
            notices: post.notices,
          }
        });
      }
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({ pathname }) => {
        if (pathname === '/notices') {
          dispatch({ type: 'query' });
        }
      });
    }
  },
};
