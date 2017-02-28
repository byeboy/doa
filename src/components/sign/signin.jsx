import React, { Component, PropTypes } from 'react';
import { Form, Input, Button, Icon } from 'antd';
import styles from './common.less';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Signin extends Component{
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }
  render(){
    const { onLogin, changeMember, buttonLoading } = this.props;
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const emailError = isFieldTouched('email') && getFieldError('email');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    
    const handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          onLogin(values);
        }
      });
    }
    
    return (
      <div className={styles.signForm}>
        <h1>欢迎登录</h1>
        <h2>风林麦谷协同办公系统</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Item
            validateStatus={emailError ? 'error' : ''}
            help={emailError || ''}
          >
            {getFieldDecorator('email', {
              rules: [{ 
                required: true, message: '帐号不可为空' 
              }, {
                type: 'email', message: '输入内容非合法邮箱',
              }],
            })(
              <Input addonBefore={<Icon type="user" />} placeholder="请使用电子邮箱登录" />
            )}
          </Form.Item>
          <Form.Item
            validateStatus={passwordError ? 'error' : ''}
            help={passwordError || ''}
          >
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码' }],
            })(
              <Input addonBefore={<Icon type="lock" />} type="password" placeholder="请输入密码" />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              className={styles.btnCenter}
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
              size="large"
              loading={buttonLoading}
            >
              登录
            </Button>
          </Form.Item>
          <p className="txtr">没有帐号？<a onClick={changeMember}>点此注册</a></p>
        </Form>
      </div>
    );
  }
}

Signin.propTypes = {
  onLogin: PropTypes.func.isRequired,
  changeMember: PropTypes.func.isRequired,
}

export default Form.create()(Signin);