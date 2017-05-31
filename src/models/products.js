import * as serve from '../services/products'
import * as fileServe from '../services/files'
import { message } from 'antd'

export default {
  namespace: 'product',
  state: {
    tab: {
      newTabIndex: 0,
      panes: [{
        title: '车型信息',
        content: {
          type: 'models',
          upType: null,
          upId: null,
          data: [],
          countRequired: false,
        }, 
        key: 'models', 
        closable: false
      },{
        title: '柜体信息',
        content: {
          type: 'cabinets',
          upType: null,
          upId: null,
          data: [],
          countRequired: false,
        }, 
        key: 'cabinets', 
        closable: false,
      },{
        title: '风机信息',
        content: {
          type: 'fans',
          upType: null,
          upId: null,
          data: [],
          countRequired: false,
        }, 
        key: 'fans', 
        closable: false,
      },{
        title: '零件信息',
        content: {
          type: 'parts',
          upType: null,
          upId: null,
          data: [],
          countRequired: false,
        }, 
        key: 'parts', 
        closable: false,
      }],
      activeKey: 'models',
    },
    modal: {
      item: null,
      fileList: [],
      relationList: [],
      relation: {},
      visible: false,
      loading: false,
    },
    table: {},
    models: [],
    cabinets: [],
    fans: [],
    parts: [],
    loginUser: {},
  },
  reducers: {
    authSuccess(state, action) {
      const { loginUser } = action.payload;
      return {
        ...state,
        loginUser,
      }
    },
    initSuccess(state, action) {
      const {productType, data} = action.payload;
      function getNew(old, type, data){
        old.map(o => {
          if(o.key === type){
            o.content.data = data
          }
        })
        return old;
      };
      const panes = getNew(state.tab.panes, productType, data);
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
        })
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
    saveRelationSuccess(state, action) {
      const {type, data} = action.payload;
      function getNew(old, type, data){
        old.map(o => {
          if(o.key === type){
            o.content.data = data;
          }
        })
        return old;
      };
      const pane = state.tab.panes.filter(pane => pane.key === data.name);
      const panes = getNew(pane[0].content.panes, type, data[type]);
      const newPane = {
        ...pane[0],
        content: {
          ...pane.content,
          panes,
        }
      };
      const newPanes = state.tab.panes.filter(pane => pane.key !== data.name);
      newPanes.push(newPane);
      return {
        ...state,
        tab: {
          ...state.tab,
          panes: [
            ...newPanes,
          ]
        }
      }
    },
    delSuccess(state, action) {
      const {type, id} = action.payload;
      const panes = state.tab.panes.map(pane => {
        if(pane.key === type){
          pane.content.data = pane.content.data.filter(d => d.id !== id);
        };
        return pane;
      });
      return {
        ...state,
        tab: {
          ...state.tab,
          panes,
        }
      }
    },
    delRelationSuccess(state, action) {
      const { type, data } = action.payload;
      const panes = state.tab.panes.map(pane => {
        if(pane.key === data.name){
          pane.content.panes.map(p => {
            if(p.key === type){
              p.content.data = data[type];
            }
          })
        }
        return pane;
      });
      return {
        ...state,
        tab: {
          ...state.tab,
          panes
        }
      }
    },
    getRelationFilesSuccess(state, action) {
      return {
        ...state,
        modal: {
          ...state.modal,
          fileList: action.data,
        }
      }
    },
    getRelationSuccess(state, action) {
      return {
        ...state,
        modal: {
          ...state.modal,
          relationList: action.data,
        }
      }
    },
    patchRelationCountSuccess(state, action) {
      console.log(action.payload)
      const { type, data } = action.payload;
      const panes = state.tab.panes.map(pane => {
        if(pane.key === data.name){
          pane.content.panes.map(p => {
            if(p.key === type){
              p.content.data = data[type];
            }
          })
        }
        return pane;
      });
      return {
        ...state,
        tab: {
          ...state.tab,
          panes
        }
      }
    },
    showModal(state, action) {
      const { item, relation } = action;
      return {
        ...state,
        modal: {
          ...state.modal,
          relation,
          item,
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
    addPane(state, action) {
      const { pane } = action;
      const activeKey = pane.key;
//      function getNew(old, now){
//        now.map(n => {
//          old = old.filter(o => o.key !== n.key);
//          old.push(n);
//        })
//        return old;
//      };
      const panes = state.tab.panes.filter(pane => pane.key !== activeKey);
      panes.push(pane);
//      const panes = getNew(state.tab.panes, pane);
      return {
        ...state,
        tab: {
          ...state.tab,
          activeKey,
          panes,
        },
      }
    },
    removePane(state, action) {
      const { targetKey } = action;
      let activeKey = state.tab.activeKey;
      let lastIndex;
      state.tab.panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1;
        }
      });
      const panes = state.tab.panes.filter(pane => pane.key !== targetKey);
      if (lastIndex >= 0 && activeKey === targetKey) {
        activeKey = panes[lastIndex].key;
      }
      return {
        ...state,
        tab: {
          ...state.tab,
          activeKey,
          panes,
        }
      }
    },
    closePanes(state) {
      const panes = state.tab.panes.filter(pane => pane.closable === false);
      return {
        ...state,
        tab: {
          ...state.tab,
          activeKey: 'models',
          panes,
        }
      }
    },
  },
  effects: {
    *auth({ payload }, {call, put, select}) {
      const loginUser = yield select(state => state.app.user);
      yield put({
        type: 'authSuccess',
        payload: {
          loginUser,
        }
      })
    },
    *changePane({ payload }, {put, call}) {
      const { activeKey, queryOrNot } = payload;
      yield put({
        type: 'changePaneSuccess',
        payload: {
          activeKey,
        }
      });
      if(queryOrNot) {
        yield put({
          type: 'query',
          payload: {
            activeKey,
          }
        });
      }
    },
    *query({ payload }, {put, call, select}) {
      const productType = yield select(state => state.product.tab.activeKey);
      const { data } = yield call(serve.query, productType);
      const { success, post, message } = data;
      if(success) {
        message.success(message);
        yield put({
          type: 'initSuccess',
          payload: {
            productType,
            data: post[productType],
          }
        })
      }
    },
    *save({ payload }, {put, call}) {
      const { type, upType, upId } = payload;
      if(upType === null) {
        const { item } = payload;
        const { data } = yield call(serve.save, { type, item});
        const { success, post } = data;
        if(success) {
          message.success(data.message);
          yield put({
            type: 'saveSuccess',
            payload: {
              type,
              data: post,
            },
          });
          yield put({
            type: 'hideModal',
          })
        } 
      } else {
        const { data } = yield call(serve.saveRelation, payload);
        const { success, post } = data;
        if(success) {
          message.success(data.message);
          yield put({
            type: 'saveRelationSuccess',
            payload: {
              type,
              data: post,
            },
          });
          yield put({
            type: 'hideModal',
          })
        } 
      }
    },
    *del({ payload }, {put, call}){
      const { type, id, upType, upId } = payload;
      if(upType === null) {
        const { data } = yield call(serve.del, payload);
        const { success } = data;
        if(success) {
          message.success(data.message);
          yield put({
            type: 'delSuccess',
            payload: {
              type,
              id,
            },
          });
        }
      } else {
        const { data } = yield call(serve.delRelation, payload);
        const { success, post } = data;
        if(success) {
          message.success(data.message);
          yield put({
            type: 'delRelationSuccess',
            payload: {
              type,
              data: post,
            },
          });
        }
      }
    },
    *gerRelationFiles({ payload }, {put, call}) {
      const { data } = yield call(fileServe.getRelation, payload);
      const { success, post, message } = data;
      if(success) {
        message.success(message);
        yield put({
          type: 'getRelationFilesSuccess',
          data: post.files,
        })
      }
    },
    *getFile({ payload }, {put, call}) {
      const { id } = payload;
      yield call(fileServe.down, id);
    },
    *getRelation({ payload }, {put, call}) {
      const { data } = yield call(serve.getRelation, payload);
      const { success, post, message } = data;
      if(success) {
        message.success(message);
        yield put({
          type: 'getRelationSuccess',
          data: post[payload.type],
        })
      }
    },
    *patchRelationCount({ payload }, {call, put}) {
      const { data } = yield call(serve.patchRelationCount, payload);
      const { success, post, message } = data;
      if(success) {
        message.success(message);
        yield put({
          type: 'patchRelationCountSuccess',
          payload: {
            type: payload.type,
            data: post,
          }
        })
      } else {
        message.warning(message);
      }
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      message.info('正在获取相关信息...');
      return history.listen(({ pathname }) => {
        if(pathname === '/products') {
          dispatch({
            type: 'auth'
          });
          dispatch({
            type: 'closePanes'
          });
          dispatch({ 
            type: 'query',
          });
        }
      });
    }
  },
};
