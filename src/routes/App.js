import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import Rewriter from '../components/edit/password';
import Header from '../components/layout/header';
import Bread from '../components/layout/bread';
import Footer from '../components/layout/footer';
import Sider from '../components/layout/sider';
import IndexPage from './IndexPage';
import Signer from './Sign';
import styles from '../components/layout/main.less';
import { Spin } from 'antd';
import { classnames } from '../utils';
import '../components/layout/common.less';

function App({children, location, dispatch, app}) {
  const {login, loading, loginButtonLoading, user, modal2Rewrite, siderFold, darkTheme, isNavbar, menuPopoverVisible} = app;
  const { authority } = user;

  const headerProps = {
    user,
    siderFold,
    location,
    isNavbar,
    menuPopoverVisible,
    switchMenuPopover () {
      dispatch({type: 'app/switchMenuPopver'})
    },
    logout () {
      dispatch({type: 'app/logout'})
    },
    showRewrite() {
      dispatch({type: 'app/showModal2Rewrite'})
    },
    switchSider () {
      dispatch({type: 'app/switchSider'})
    }
  }

  const rewriterProps = {
    user,
    modal2Rewrite,
    rewrite (params) {
      dispatch({
        type: 'app/rewrite',
        payload: params,
      })
    },
    onCancel() {
      dispatch({type: 'app/hideModal2Rewrite'})
    },
  }

  const siderProps = {
    authority,
    siderFold,
    darkTheme,
    location,
    changeTheme () {
      dispatch({type: 'app/changeTheme'})
    }
  }

  return (
    <div>{login
      ? authority !== -1 && 
      <div className={classnames(styles.layout, {[styles.fold]: isNavbar ? false : siderFold}, {[styles.withnavbar]: isNavbar})}>
        {!isNavbar ? <aside className={classnames(styles.sider, {[styles.light]: !darkTheme})}>
            <Sider {...siderProps} />
          </aside> : null}
        <div className={styles.main}>
          <Header {...headerProps} />
          <Rewriter {...rewriterProps} />
          { authority !== 0 ? 
          <div>
            <Bread location={location} />
            <div className={styles.container}>
              <div className={styles.content}>
                {children}
              </div>
            </div>
            <Footer />
          </div> : <h1>帐号未启用，请联系管理员</h1>}
        </div>
      </div>
      : /*<div className={styles.spin}><Spin tip='加载用户信息...' spinning={loading} size='large'><IndexPage/></Spin></div>*/
      <Signer />}
    </div>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  loginButtonLoading: PropTypes.bool,
  login: PropTypes.bool,
  user: PropTypes.object,
  siderFold: PropTypes.bool,
  darkTheme: PropTypes.bool
}

export default connect(({app}) => ({app}))(App)
