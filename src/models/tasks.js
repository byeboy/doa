import { message } from 'antd';
import * as serve from '../services/tasks';
import { delay } from '../services/util';

export default {
  namespace: 'task',
  state: {
    loginUser: {},
    tasks: [],
    todos: [],
    dones: [],
    posts: [],
    users: [],
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
    *query({ payload }, {call, put, select}){
      yield call(delay);
      const user = yield select(state=>state.app.user);
      const users = yield select(state=>state.user.users);
      const { data, response } = yield call(serve.query, user.id);
      const { success, post, message } = data;
      console.log(post)   //证明任务信息分类在前端进行，减轻服务端负载
      if(success){
        message.success(message);
        const todos = [];
        const dones = [];
        if(post.tasks.length != 0){
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
              loginUser: user,
              todos: todos,
              dones: dones,
              posts: post.posts,
              users: users,
            },
          })
        } else {
          yield put({
            type: 'querySuccess',
            payload: {
              loginUser: user,
              todos: todos,
              dones: dones,
              posts: post.posts,
              users: users,
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
          message.info('职员信息初始化中...');
          dispatch({type: 'user/init'});
          dispatch({ type: 'query' });
        }
      });
    }
  },
};
