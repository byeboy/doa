import * as serve from '../services/users';
import { message, notification } from 'antd';
import { delay, socket } from '../services/util';

export default {
  namespace: 'app',
  state: {
    login: sessionStorage.getItem('authorization') !== null,
    isMember: true,
    user: {
      authority: -1,
    },
    modal2Rewrite: false,
    buttonLoading: false,
    menuPopoverVisible: false,
    siderFold: localStorage.getItem('antdAdminSiderFold') === 'true',
    darkTheme: localStorage.getItem('antdAdminDarkTheme') !== 'false',
    isNavbar: document.body.clientWidth < 769,
    message: {
      type: false,
      content: null,
    },
  },
  subscriptions: {
    setup ({dispatch}) {
      dispatch({type: 'auth'});
      window.onresize = function () {
        dispatch({type: 'changeNavbar'});
      }
    },
  },
  effects: {
    *changeMember ({
      payload
    }, {put}) {
      yield put({
        type: 'handleChangeMember'
      })
    },
    *auth ({ payload }, {call ,put}) {
      const { data, response } = yield call(serve.auth);
      const { success, post, message } = data;
      const { status, headers } = response;
      if(success) {
//        message.success(message);
        yield call(socket, (data) => {
          /*dispatch({ type: 'your action', payload: data });*/
          const args = {
            message: data.message,
            description: data.description,
            duration: 0,
            ...data,
          };
          notification.info(args);
        }, post.loginUser.id);
        yield put({
          type: 'authSuccess',
          payload: {
            user: {
              id: post.loginUser.id,
              name: post.loginUser.name,
              branch_id: post.loginUser.branch_id,
              authority: post.loginUser.branch === null ? 0 : post.loginUser.branch.authority,
            },
          }
        })
      } else {
         message.warning(message);
      }
    },
    *login ({
      payload
    }, {call, put}) {
      // yield put({type: 'showButtonLoading'});
      const { values } = payload;
      const { data, response } = yield call(serve.login, values);
      const { success, post, message } = data;
      const { status, headers } = response;
      if (success) {
        message.success(message);
        sessionStorage.setItem('authorization',headers.get('authorization'));
        yield call(socket, (data) => {
          /*dispatch({ type: 'your action', payload: data });*/
          const args = {
            message: data.message,
            description: data.description,
            duration: 0,
            ...data,
          };
          notification.info(args);
        });
        yield put({
          type: 'authSuccess',
          payload: {
            user: {
              ...post.loginUser,
              authority: post.loginUser.branch === null ? 0 : post.loginUser.branch.authority,
            },
            message: message,
          }
        })
      } else {
        message.warning(message);
        yield put({
          type: 'loginFail',
        })
      }
    },
    *reg ({
      payload
    }, {call, put}) {
      // yield put({type: 'showButtonLoading'});
      const { values } = payload;
      const { data } = yield call(serve.reg, values);
      const { success, post, message } = data;
      if (success) {
        message.success(message);
        yield put({
          type: 'regSuccess',
        })
      } else {
        message.warning(message);
        yield put({
          type: 'regFail',
        })
      }
    },
    *rewrite({ payload }, {call, put}) {
      console.log('model' ,payload)
      const { data } = yield call(serve.rewrite, payload);
      console.log(data)
      const { success, post, message } = data;
      if (success) {
        message.success(message);
        yield put({
          type: 'logout',
        })
      } else {
        message.warning(message);
      }
    },
    *logout ({
      payload
    }, {call, put}) {
      sessionStorage.removeItem('authorization');
      if (sessionStorage.getItem('authorization') === null) {
        message.success('注销成功，即将返回登录页面');
        yield put({
          type: 'logoutSuccess'
        })
      } else {
        message.warning('注销失败');
      }
    },
    *switchSider ({
      payload
    }, {put}) {
      yield put({
        type: 'handleSwitchSider'
      })
    },
    *changeTheme ({
      payload
    }, {put}) {
      yield put({
        type: 'handleChangeTheme'
      })
    },
    *changeNavbar ({
      payload
    }, {put}) {
      if (document.body.clientWidth < 769) {
        yield put({type: 'showNavbar'})
      } else {
        yield put({type: 'hideNavbar'})
      }
    },
    *switchMenuPopver ({
      payload
    }, {put}) {
      yield put({
        type: 'handleSwitchMenuPopver'
      })
    }
  },
  reducers: {
    handleChangeMember(state) {
      return {
        ...state,
        isMember: !state.isMember,
      }
    },
    regSuccess (state, action) {
      return {
        ...state,
        ...action.payload,
        buttonLoading: false,
        isMember: true,
      }
    },
    authSuccess (state, action) {
      return {
        ...state,
        ...action.payload,
        login: true,
        buttonLoading: false
      }
    },
    logoutSuccess (state) {
      window.location.href = '/';
      return {
        ...state,
        login: false
      }
    },
    regFail (state) {
      return {
        ...state,
        buttonLoading: false,
      }
    },
    loginFail (state, action) {
      return {
        ...state,
        login: false,
        buttonLoading: false,
      }
    },
    showButtonLoading (state) {
      return {
        ...state,
        buttonLoading: true,
      }
    },
    hideButtonLoading (state) {
      return {
        ...state,
        buttonLoading: false,
      }
    },
    handleSwitchSider (state) {
      localStorage.setItem('antdAdminSiderFold', !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold
      }
    },
    handleChangeTheme (state) {
      localStorage.setItem('antdAdminDarkTheme', !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme
      }
    },
    showNavbar (state) {
      return {
        ...state,
        isNavbar: true
      }
    },
    hideNavbar (state) {
      return {
        ...state,
        isNavbar: false
      }
    },
    handleSwitchMenuPopver (state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible
      }
    },
    showModal2Rewrite(state) {
      return {
        ...state,
        modal2Rewrite: true,
      }
    },
    hideModal2Rewrite(state) {
      return {
        ...state,
        modal2Rewrite: false,
      }
    },
  }
}
