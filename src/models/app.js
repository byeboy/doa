//import * as appS from '../services/app';

export default {
  namespace: 'app',
  state: {
    login: false,
    sign: false,
    member: false,
    loading: false,
    user: {
      name: '耿耿',
      authority: 9,
    },
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
      // dispatch({type: 'queryUser'})
      window.onresize = function () {
        dispatch({type: 'changeNavbar'})
      }
    }
  },
  effects: {
    *getLogin({ payload }, { put }) {
      yield put({
        type: 'handelGetLogin',
      })
    },
    *getReg({ payload }, { put }) {
      yield put({
        type: 'handelGetReg',
      })
    },
    *login ({
      payload
    }, {call, put}) {
      yield put({type: 'showButtonLoading'});
      const { data } = yield call(appS.login, payload);
      console.log(data)
      const { success, post, message } = data;
      if (success) {
        yield put({
          type: 'loginSuccess',
          payload: {
            user: {
              ...post.loginUser,
              authority: post.loginUser.branch === null ? 0 : post.loginUser.branch.authority,
            },
            message: message,
          }
        })
      } else {
        yield put({
          type: 'loginFail',
          payload: {
            message: message,
          }
        })
      }
    },
    *reg ({
      payload
    }, {call, put}) {
      yield put({type: 'showButtonLoading'});
      const { data } = yield call(appS.reg, payload);
      console.log(data)
      const { success, post, message } = data;
      if (success) {
        yield put({
          type: 'regSuccess',
          payload: {
            message: message,
          }
        })
      } else {
        yield put({
          type: 'regFail',
          payload: {
            message: message,
          }
        })
      }
    },
    *queryUser ({
      payload
    }, {call, put}) {
      yield put({type: 'showLoading'});
      const { data } = yield call(userInfo, payload);
      if (data.success) {
        yield put({
          type: 'loginSuccess',
          payload: {
            user: {
              name: data.username
            }
          }
        })
      }

      yield put({type: 'hideLoading'})
    },
    *logout ({
      payload
    }, {call, put}) {
      const { data } = yield call(logout, payload);
      if (data.success) {
        yield put({
          type: 'logoutSuccess'
        })
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
    handelGetLogin (state) {
      return {
        ...state,
        sign: true,
        member: true,
      }
    },
    handelGetReg (state) {
      return {
        ...state,
        sign: true,
        member: false,
      }
    },
    regSuccess (state, action) {
      return {
        ...state,
        ...action.payload,
        member: true,
        buttonLoading: false
      }
    },
    loginSuccess (state, action) {
      return {
        ...state,
        ...action.payload,
        login: true,
        buttonLoading: false
      }
    },
    logoutSuccess (state) {
      return {
        ...state,
        login: false
      }
    },
    regFail (state, action) {
      return {
        ...state,
        ...action.payload,
        buttonLoading: false
      }
    },
    loginFail (state, action) {
      return {
        ...state,
        ...action.payload,
        login: false,
        buttonLoading: false
      }
    },
    showButtonLoading (state) {
      return {
        ...state,
        buttonLoading: true
      }
    },
    hideButtonLoading (state) {
      return {
        ...state,
        buttonLoading: false
      }
    },
    showLoading (state) {
      return {
        ...state,
        loading: true
      }
    },
    hideLoading (state) {
      return {
        ...state,
        loading: false
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
    }
  }
}
