import { message } from 'antd';
import * as serve from '../services/tasks';
import { delay } from '../services/util';

export default {
  namespace: 'task',
  state: {
    tasks: [],
    todos: [],
    dones: [],
    posts: [],
    modal2View: false,
    modal2Edit: false,
    item2Edit: {
      users: [],    //初始化任务执行者，避免报undefined错误
    },
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
    *query({ payload }, {call, put}){
      yield call(delay);
      const { data } = yield call(serve.query);
      const { success, post, message } = data;
      console.log(post)   //证明任务信息分类在前端进行，减轻服务端负载
      if(success){
        message.success(message);
        if(post.tasks.length != 0){
          const todos = [];
          const dones = [];
          post.tasks.map(item => {
            if(item.status <= 1) {
              todos.push(item);
            } else if(item.status <9) {
              dones.push(item);
            }
          });
          yield put({
            type: 'querySuccess',
            payload: {
              todos: todos,
              dones: dones,
              posts: post.posts,
            },
          })
        } else {
          yield put({
            type: 'querySuccess',
            payload: {
              todos: post.todos,
              dones: post.dones,
              posts: post.posts,
            },
          })
        }
      } else {
        message.warning(message);
      }
    },
    *save({ payload }, {call, put}){
      yield put({
        type: 'showLoading',
      });
      const { values } = payload;
      const { data } = yield call(serve.save, values);
      const { success, post, message } = data;
      if(success){
        message.success(message);
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
    *patch({ payload }, {call, put}){
      const { id, values } = payload;
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
      yield put({
        type: 'hideModal2Edit',
      });
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
    setup({dispatch, history}) {
      return history.listen(({ pathname }) => {
        if(pathname === '/tasks') {
          dispatch({ type: 'query' });
        }
      });
    }
  },
};
