import * as serve from '../services/goods'
import { message } from 'antd'

export default {
  namespace: 'good',
  state: {
    tab: {
      newTabIndex: 0,
      panes: [{
        title: '车型信息',
        content: {
          type: 'models',
          data: [],
        }, 
        key: 'models', 
        closable: false
      },{
        title: '柜体信息',
        content: {
          type: 'cabinets',
          data: [],
        }, 
        key: 'cabinets', 
        closable: false,
      },{
        title: '风机信息',
        content: {
          type: 'fans',
          data: [],
        }, 
        key: 'fans', 
        closable: false,
      },{
        title: '零件信息',
        content: {
          type: 'parts',
          data: [],
        }, 
        key: 'parts', 
        closable: false,
      }],
      activeKey: 'models',
    },
    modal: {
      item: null,
      visible: false,
      loading: false,
    },
    loginUser: {},
  },
  reducers: {
    initSuccess(state, action) {
      const {goodType, data} = action.payload;
      function getNew(old, type, data){
        old.map(o => {
          if(o.key === type){
            o.content.data = data
          }
        })
        return old;
      };
      const panes = getNew(state.tab.panes, goodType, data);
      return {
        ...state,
        tab: {
          ...state.tab,
          panes,
        }
      }
    },
    saveSuccess(state, action) {
      const {type, data} = action.payload;
      function getNew(old, type, data){
        old.map(o => {
          if(o.key === type){
            const n = o.content.data.filter(od => od.id !== data.id);
            n.push(data);
            o.content.data = n;
          }
        });
        return old;
      };
      const panes = getNew(state.tab.panes, type, data);
      return {
        ...state,
        tab: {
          ...state.tab,
          panes,
        }
      }
    },
    showModal(state, action) {
      const { item, goodType, recordType } = action.payload;
      return {
        ...state,
        modal: {
          ...state.modal,
          item,
          goodType,
          recordType,
          visible: true,
        },
      }
    },
    hideModal(state) {
      return {
        ...state,
        modal: {
          ...state.modal,
          visible: false,
        },
      }
    },
    showModalLoading(state) {
      return {
        ...state,
        modal: {
          ...state.modal,
          loading: true,
        },
      }
    },
    hideModalLoading(state) {
      return {
        ...state,
        modal: {
          ...state.modal,
          loading: false,
        },
      }
    },
    changePaneSuccess(state, action) {
      const { activeKey } = action.payload;
      return {
        ...state,
        tab: {
          ...state.tab,
          activeKey,
        },
      }
    },
  },
  effects: {
    *changePane({ payload }, {put, call}) {
      const { activeKey, queryOrNot } = payload;
      yield put({
        type: 'changePaneSuccess',
        payload: {
          activeKey,
        }
      });
      yield put({
        type: 'query',
        payload: {
          activeKey,
        }
      });
    },
    *query({ payload }, {put, call, select}) {
      const goodType = yield select(state => state.good.tab.activeKey);
      const { data } = yield call(serve.query, goodType);
      const { success, post, message } = data;
      if(success) {
        message.success(message);
        yield put({
          type: 'initSuccess',
          payload: {
            goodType,
            data: post[goodType],
          }
        })
      }
    },
    *save({ payload }, {put, call}) {
      const { data } = yield call(serve.save, payload);
      const { success, post } = data;
      if(success) {
        message.success(data.message);
        yield put({
          type: 'saveSuccess',
          payload: {
            type: payload.type,
            data: post,
          },
        });
        yield put({
          type: 'hideModal',
        })
      } else {
        message.warning(data.message);
      }
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      message.info('正在获取相关信息...');
      return history.listen(({ pathname }) => {
        if(pathname === '/goods') {
          dispatch({ 
            type: 'query',
          });
        }
      });
    }
  },
};
