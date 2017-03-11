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
      id: null,
      users: [],    //初始化任务执行者，避免报undefined错误
    },
    current: 0,
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
        current: 0,
      }
    },
    next(state){
      return {
        ...state,
        current: state.current + 1,
      }
    },
    prev(state){
      return {
        ...state,
        current: state.current - 1,
      }
    },
    handleStore(state, action){
      return {
        ...state,
        item2Edit: {
          ...state.item2Edit,
          ...action.payload,
        },
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
    *store({ payload }, {call, put}){
      const { values } = payload;
      yield put({
        type: 'handleStore',
        payload: values,
      });
    },
    *submit({ payload }, {call, put, select}){
      const { values } = payload;
      yield put({
        type: 'handleStore',
        payload: values,
      });
      const item2Edit = yield select(state => state.task.item2Edit);
      console.log(item2Edit)
      if(item2Edit.id === null){
        yield put({
          type: 'showLoading',
        });
        const { data, response } = yield call(serve.save, item2Edit);
        const { success, post } = data;
        if(success){
          message.success(data.message);
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
      } else {
        yield put({
          type: 'showLoading',
        });
        const { data, response } = yield call(serve.update, item2Edit);
        const { success, post } = data;
        if(success){
          message.success(data.message);
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
    },
    *stepPatch({ payload }, {call, put}){
      const { id, values } = payload;
      const { data } = yield call(serve.stepPatch, payload);
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
