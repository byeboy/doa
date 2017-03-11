import { message } from 'antd';

export default {
  namespace: 'partProperty',
  state: {
    materials: [],
    models: [],
    cabinets: [],
    loginUser: null,
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname }) => {
        if(pathname === '/parts') {
//          const user = yield select(state=>state.app.user);
          message.info('属性信息初始化中...');
//          dispatch({type: 'user/init'});
//          dispatch({ type: 'query' });
        }
      });
    },
  },
};
