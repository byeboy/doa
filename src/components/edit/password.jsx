import React, { Component, PropTypes } from 'react';
import { Modal, Form, Input, Button, Icon } from 'antd';
import styles from './common.less';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Rewriter extends Component{
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }
  render(){
    const { modal2Rewrite, rewrite, onCancel, user } = this.props;
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    
    // Only show error after a field is touched.
    const oldPwdError = isFieldTouched('oldPwd') && getFieldError('oldPwd');
    const newPwdError = isFieldTouched('newPwd') && getFieldError('newPwd');
    const confirmError = isFieldTouched('confirm') && getFieldError('confirm');
    
    const handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          const payload = {
            values,
            id: user.id,
          }
          console.log('Received values of form: ', values);
          console.log('payload', payload);
          rewrite(payload);
        }
      });
    }
    
    const checkOldPwd = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value === form.getFieldValue('oldPwd')) {
        callback('新旧密码不可相同');
      } else {
        callback();
      }
    }

    const checkNewPwd = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('newPwd')) {
        callback('两次密码输入不一致');
      } else {
        callback();
      }
    }
    
    return ( 
      <Modal title="修改密码"
             visible={modal2Rewrite}
             onCancel={onCancel}
             footer={null}
      >
        <Form onSubmit={handleSubmit}>
          <Form.Item
            validateStatus={oldPwdError ? 'error' : ''}
            help={oldPwdError || ''}
          >
            {getFieldDecorator('oldPwd', {
              rules: [{ 
                required: true, message: '请输入旧密码' 
              }],
            })(
              <Input addonBefore="输入旧密码" type="password" placeholder="请输入原始密码" />
            )}
          </Form.Item>
          <Form.Item
            validateStatus={newPwdError ? 'error' : ''}
            help={newPwdError || ''}
          >
            {getFieldDecorator('newPwd', {
              rules: [{ 
                required: true, message: '请输入密码' 
              }, {
                min: 6, message: '请设置6位以上的密码',
              }, {
                whitespace: true, message: '密码中不应存在空格',
              }, {
                validator: checkOldPwd,
              }],
            })(
              <Input addonBefore="设置新密码" type="password" placeholder="设置一个6位以上的新密码" />
            )}
          </Form.Item>
          <Form.Item
            validateStatus={confirmError ? 'error' : ''}
            help={confirmError || ''}
          >
            {getFieldDecorator('confirm', {
              rules: [{ 
                required: true, message: '请确认新密码'
              }, {
                validator: checkNewPwd,
              }],
            })(
              <Input addonBefore="确认新密码" type="password" placeholder="请再次输入新密码" />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
            >
              确认更改
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

Rewriter.propTypes = {

}

export default Form.create()(Rewriter);