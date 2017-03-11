import { message } from 'antd';
import { delay } from '../services/util';
import * as propertyServe from '../services/partProperties';

export default {
  namespace: 'part',
  state: {
    parts: [],
    materials: [],
    models: [],
    cabinets: [],
    loginUser: null,
  },
  reducers: {
    initSuccess(state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
    propertySaveSuccess(state, action) {
      return { 
        ...state,
        [action.payload.property]: [
          ...state[action.payload.property],
          action.payload.data
        ]
      };
    },
    propertyPatchSuccess(state, action) {
      const newData = state[action.payload.property];
      console.log(newData)
      console.log(action.payload)
      console.log(newData[action.payload.index][action.payload.key])
      newData[action.payload.index][action.payload.key] = action.payload.value;
      return { 
        ...state,
        [action.payload.property]: newData,
      };
    },
    propertyDelSuccess(state, action) {
      const newData = state[action.payload.property];
      newData.splice(action.payload.index, 1);
      return { 
        ...state,
        [action.payload.property]: newData,
      };
    },
  },
  effects: {
    *init({ payload }, { call, put, select }) {
      yield call(delay);
      const user = yield select(state => state.app.user);
      if(user.authority >= 7) {
        message.info('属性信息初始化中...');
        const { data } = yield call(propertyServe.query);
        const { success, post } = data;
        if(success) {
          message.success(data.message)
          yield put({
            type: 'initSuccess',
            payload: {
              materials: post.materials,
              models: post.models,
              cabinets: post.cabinets,
            }
          })
        }
      }
      message.info('仓储信息初始化中...');
      const { data } = yield call(propertyServe.query);
      const { success, post } = data;
      if(success) {
        message.success(data.message)
        yield put({
          type: 'initSuccess',
          payload: {
            loginUser: user,
          }
        })
      }
    },
    *propertySave({ payload }, {call, put}){
      const { property, values } = payload;
      const { data } = yield call(propertyServe.save, payload);
      const { success, post, message } = data;
      if(success){
        message.success(message);
        yield put({
          type: 'propertySaveSuccess',
          payload: {
            property: property,
            data: post,
          },
        });
      } else {
        message.warning(message);
      }
    },
    *propertyPatch({ payload }, {call, put}){
      const { property, key, value, id, index } = payload;
      const sending = {
        property,
        key,
        value,
        id,
      };
      const { data } = yield call(propertyServe.patch, sending);
      const { success, post, message } = data;
      if(success){
        message.success(message);
        yield put({
          type: 'propertyPatchSuccess',
          payload: {
            property: property,
            key: key,
            value: value,
            index: index,
          },
        });
      } else {
        message.warning(message);
      }
    },
    *propertyDel({ payload }, {call, put}){
      const { property, id, index } = payload;
      const { data } = yield call(propertyServe.del, payload);
      const { success, post, message } = data;
      if(success){
        message.success(message);
        yield put({
          type: 'propertyDelSuccess',
          payload: {
            property: property,
            index: index,
          },
        });
      } else {
        message.warning(message);
      }
    },
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname }) => {
        if(pathname === '/parts') {
          dispatch({type: 'init'});
        }
      });
    },
  },
};
