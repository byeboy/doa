import { message } from 'antd';
import * as serve from '../services/tasks';

export default {
  namespace: 'task',
  state: {
    tasks: [],
    todos: [],
    dones: [],
    posts: [],
    modal2View: false,
    modal2Edit: false,
    item2Edit: {},
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
  },
  effects: {
    *query({ payload }, {call, put}){
      const { data } = yield call(serve.query);
      const { success, post, message } = data;
      if(success){
        message.success(message);
        yield put({
          type: 'querySuccess',
          payload: {
            todos: post.todos,
            dones: post.dones,
            posts: post.posts,
          },
        })
      } else {
        message.warning(message);
      }
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
    *patch({ payload }, {call, put}){
      const { id, param } = payload;
      const { data } = yield call(serve.patch, payload);
      const { success, post, message } = data;
      if(success){
        message.success(message);
        yield put({
          type: 'query',
        })
      } else {
        message.warning(message);
      }
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({ pathname }) => {
        if(pathname === '/tasks') {
          dispatch({ type: 'query' });
        }
      });
    }
  },
};
