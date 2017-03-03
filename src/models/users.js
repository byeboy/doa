import { message } from 'antd';
import * as serve from '../services/users';
import { delay } from '../services/util';

export default {
  namespace: 'user',
  state: {
    users: [],
    loginUser: {},
    branches: [],
    modal2Edit: false,
    item2Edit: null,
    loading2Modal: false,
  },
  reducers: {
    querySuccess(state, action){
      return {
        ...state,
        ...action.payload,
      }
    },
    showModal2Edit(state, action){
      return {
        ...state,
        ...action.payload,
        modal2Edit: true,
      }
    },
    hideModal2Edit(state){
      return {
        ...state,
        modal2Edit: false,
      }
    },
    showLoading(state){
      return {
        ...state,
        loading2Modal: true,
      }
    },
    hideLoading(state){
      return {
        ...state,
        loading2Modal: false,
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
      const branches = yield select(state=>state.branch.branches);
      const { data } = yield call(serve.query);
      const { success, post, message } = data;
      if(success){
        message.success(message);
        yield put({
          type: 'querySuccess',
          payload: {
            users: post.users,
            loginUser: user,
            branches: branches,
          }
        });
      } else {
        message.warning(message);
        yield put({
          type: 'querySuccess',
          payload: {
            users: post.users,
            loginUser: user,
            branches: branches,
          }
        });
      }
    },
    *search({ payload }, { call, put }){
      const { data } = yield call(serve.search, payload);
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
    *update({ payload },{ call, put }){
      yield put({
        type: 'showLoading',
      });
      const { id, values } = payload;
      const { data } = yield call(serve.update, payload);
      const { success, post, message } = data;
      if(success){
        message.success(message);
        yield call(delay);
        yield put({
          type: 'query',
        })
      } else {
        message.warning(message);
      }
      yield put({
        type: 'hideLoading',
      });
      yield put({
        type: 'hideModal2Edit',
      });
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
