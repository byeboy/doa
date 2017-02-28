import { message } from 'antd';
import * as serve from '../services/users';
import { delay } from '../services/util';

export default {
  namespace: 'user',
  state: {
    users: [],
    loginUser: {},
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
    *init({ payload }, {call, put}) {
      const { data } = yield call(serve.query);
      const { success, post, message } = data;
      yield put({
        type: 'querySuccess',
        payload: {
          users: post.users,
        }
      });
    },
    *query({ payload }, {call, put, select}) {
      yield call(delay);
      const user = yield select(state=>state.app.user);
      const { data } = yield call(serve.query);
      const { success, post, message } = data;
      if(success){
        message.success(message);
        yield put({
          type: 'querySuccess',
          payload: {
            users: post.users,
            loginUser: user,
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
          message.info('部门信息初始化中...');
          dispatch({type: 'branch/init'});
          dispatch({type: 'query'})
        }
      });
    }
  },
};
