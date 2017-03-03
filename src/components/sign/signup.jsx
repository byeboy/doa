import React, { Component, PropTypes } from 'react';
import { Form, Input, Button, Icon } from 'antd';
import styles from './common.less';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Signup extends Component{
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }
  render(){
    const { onReg, changeMember, buttonLoading } = this.props;
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const emailError = isFieldTouched('email') && getFieldError('email');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    const confirmError = isFieldTouched('confirm') && getFieldError('confirm');
    const nameError = isFieldTouched('name') && getFieldError('name');
    const phoneError = isFieldTouched('phone') && getFieldError('phone');
    const codeError = isFieldTouched('code') && getFieldError('code');
    
    const handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          onReg(values);
        }
      });
    }
    
    const checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码输入不一致');
    } else {
      callback();
    }
  }
    
    return ( 
      <div className={styles.signForm}>
        <h1>欢迎加入风林麦谷协同办公系统</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Item
            validateStatus={emailError ? 'error' : ''}
            help={emailError || ''}
          >
            {getFieldDecorator('email', {
              rules: [{ 
                required: true, message: '电子邮箱不可为空' 
              }, {
                type: 'email', message: '输入内容非合法邮箱',
              }],
            })(
              <Input addonBefore="电子邮箱" placeholder="给个电子邮箱吧" />
            )}
          </Form.Item>
          <Form.Item
            validateStatus={nameError ? 'error' : ''}
            help={nameError || ''}
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入真实姓名' }],
            })(
              <Input addonBefore="真实姓名" type="text" placeholder="请输入真实姓名" />
            )}
          </Form.Item>
          <Form.Item
            validateStatus={phoneError ? 'error' : ''}
            help={phoneError || ''}
          >
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: '请输入联系方式' }],
            })(
              <Input addonBefore="联系方式" type="text" placeholder="请输入联系方式" />
            )}
          </Form.Item>
          <Form.Item
            validateStatus={passwordError ? 'error' : ''}
            help={passwordError || ''}
          >
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码' }],
            })(
              <Input addonBefore="设置密码" type="password" placeholder="设置一个6位以上的密码" />
            )}
          </Form.Item>
          <Form.Item
            validateStatus={confirmError ? 'error' : ''}
            help={confirmError || ''}
          >
            {getFieldDecorator('confirm', {
              rules: [{ 
                required: true, message: '请确认密码'
              }, {
                validator: checkPassword,
              }],
            })(
              <Input addonBefore="确认密码" type="password" placeholder="请再次输入密码" />
            )}
          </Form.Item>
          <Form.Item
            validateStatus={codeError ? 'error' : ''}
            help={confirmError || ''}
          >
            {getFieldDecorator('text', {
              rules: [{ required: true, message: '请输入图中的验证码' }],
            })(
              <Input addonBefore="验证码" addonAfter={<img src="" alt="验证码占位" />} type="text" placeholder="请输入后面的验证码" />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
              loading={buttonLoading}
            >
              注册
            </Button>
            <span className="fr">已有帐号？<a onClick={changeMember}>点此登录</a></span>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

Signup.propTypes = {
  onReg: PropTypes.func.isRequired,
  changeMember: PropTypes.func.isRequired,
}

export default Form.create()(Signup);