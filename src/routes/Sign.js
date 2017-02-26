import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Button, Icon } from 'antd';
import styles from './common.less';

class Signer extends Component{
  render(){
    return (
      <Row className={styles.sign}>
        <Col xs={{ span: 20, offset: 2 }} md={{ span: 9, offset: 15 }}>
          <div className={styles.signForm}>
            form
          </div>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state){
  return {
    app: state.app,
  }
}

export default connect(mapStateToProps)(Form.create()(Signer));