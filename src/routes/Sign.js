import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Icon } from 'antd';
import Docer from '../components/projectDoc';
import Signin from '../components/sign/signin';
import Signup from '../components/sign/signup';
import styles from './common.less';

function Signer({ dispatch, app }) {
  const { isMember, buttonLoading } = app;
  const actionProps = {
    changeMember(){
      dispatch({
        type: 'app/handleChangeMember',
      })
    },
    onLogin(values) {
      dispatch({
        type: 'app/login',
        payload: {
          values: values,
        }
      })
    },
    onReg(values) {
      dispatch({
        type: 'app/reg',
        payload: {
          values: values,
        }
      })
    },
    buttonLoading: buttonLoading,
  }
  return (
    <div className={styles.welcome}>
      <div className={styles.doc}>
        <Docer />
      </div>
      <Row className={styles.sign}>
        <Col xs={ 24 } sm={{ span: 16, offset: 4 }} md={{ span: 10, offset: 7 }}>
          {isMember ? <Signin {...actionProps}/> : <Signup {...actionProps}/>}
        </Col>
      </Row>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    app: state.app,
  }
}

export default connect(mapStateToProps)(Signer);