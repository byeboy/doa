import { message } from 'antd';
import * as serve from '../services/branches';
import { delay } from '../services/util';

export default {
  namespace: 'branch',
  state: {
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
    *init({ payload }, { call, put }){
      const { data } = yield call(serve.query);
      const { success, post, message } = data;
      yield put({
        type: 'querySuccess',
        payload: {
          branches: post.branches,
        }
      });
    },
    *query({ payload }, { call, put, select }){
      yield call(delay);
      const user = yield select(state=>state.app.user);
      const { data } = yield call(serve.query);
      const { success, post, message } = data;
      if(success){
        message.success(message);
        yield put({
          type: 'querySuccess',
          payload: {
            branches: post.branches,
            loginUser: user
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
    *search({ payload }, { call, put }){
      const { data } = yield call(serve.search, payload);
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
        message.warning(message);
        yield put({
          type: 'querySuccess',
          payload: {
            branches: post.branches,
          }
        });
      }
    },
    *save({ payload }, {put, call}){
      yield put({
        type: 'showLoading',
      });
      const { values } = payload;
      const { data } = yield call(serve.save, values);
      const { success, post, message } = data;
      if(success){
        message.success(message);
        /*const { dataT } = yield call(serve.query);*/
        yield put({
          type: 'query',
        });
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
    *del({ payload },{call, put}){
      const { id } = payload;
      const { data } = yield call(serve.del, id);
      const { success, post, message } = data;
      if(success){
        message.success(message);
        yield put({
          type: 'query',
        })
      } else {
        message.warning(message);
      }
    },
    *update({ payload }, {call, put}){
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
      return history.listen(({ pathname }) => {
        if (pathname === '/branches') {
          dispatch({ type: 'query' });
        }
      });
    }
  },
};
