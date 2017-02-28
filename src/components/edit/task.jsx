import React, { Component, PropTypes } from 'react'
import { Modal, Button, Icon, Form, Input, DatePicker, Select } from 'antd'
import moment from 'moment'

class TaskEditer extends Component{
  constructor(props){
    super(props);
  }
  initUser = (users, id) => {
    let userArray = [];
    if(users !== null) {
      users.map(item => {
        if(item.id !== id) {
          userArray.push(<Select.Option key={item.id} value={item.id.toString()}>{item.name}</Select.Option>);
        }
      })
    }
    return userArray;
  }
  initDoer = (doers) => {
    let doerIdArray = [];
    if(doers !== null) {
      doers.map(item => {
        doerIdArray.push(item.id.toString());
      })
    }
    return doerIdArray;
  }
  
  render() {
    const { users, loginUser, onCreate, onUpdate, handleCancel, modal2Edit, item2Edit, loading2Modal } = this.props;
    const handleOk = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, fieldsValue) => {
        if (!err) {
          const values = {
            ...fieldsValue,
            'deadline': fieldsValue['deadline'].format('YYYY-MM-DD HH:mm:ss'),
          };
          if(item2Edit === null){
            onCreate(values);
            this.props.form.resetFields();
          } else {
            onUpdate(values);
            this.props.form.resetFields();
          }
        }
      });
    };
    const onCancel = (e) => {
      handleCancel();
      this.props.form.resetFields();
    };
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    const selectOpts = [];
    for (let i = 0; i < 26; i++) {
      selectOpts.push(<Select.Option key={i}>{'user'+i.toString(36)}</Select.Option>);
    }
    return (
      <Modal title={item2Edit === null ? '发布新任务':'编辑任务'} 
             visible={modal2Edit}
             onCancel={onCancel}
             footer={[
                <Button key="back" size="large" onClick={handleCancel}>关闭</Button>,
                <Button key="submit" type="primary" size="large" loading={loading2Modal} onClick={handleOk}>
                  {item2Edit === null ? '确认发布':'保存更改'} 
                </Button>,
              ]}
      >
        {item2Edit === null ? 
          
          <Form onSubmit={this.handleSubmit} >
            <Form.Item
              {...formItemLayout}
              label="名称"
              >
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '任务名称不可为空' }],
                initialValue: null,
              })(
                <Input placeholder="请输入任务名称" />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="简述"
              >
              {getFieldDecorator('intro', {
                initialValue: null,
              })(
                <Input placeholder="建议输入任务简述" />  
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="详细要求"
              >
              {getFieldDecorator('content', {
                rules: [{ required: true, message: '任务要求不可为空' }],
                initialValue: null,
              })(
                <Input placeholder="请输入任务的详细要求" />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="最后期限"
             >
              {getFieldDecorator('deadline', {
                rules: [{ type: 'object', required: true, message: '请为任务设置最后期限' }],
                initialValue: null,
              })(
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="执行者"
              >
              {getFieldDecorator('users', {
                rules: [{ required: true, message: '执行者不可为空' }],
                initialValue: [],
              })(
                <Select
                  multiple
                  style={{ width: '100%' }}
                  placeholder="请指定人员来执行该任务"
                >
                  {this.initUser(users, loginUser.id)}
                </Select>
              )}
            </Form.Item>
          </Form> :
          <Form onSubmit={this.handleSubmit} >
            <Form.Item
              {...formItemLayout}
              label="名称"
              >
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '任务名称不可为空' }],
                initialValue: item2Edit.name,
              })(
                <Input placeholder="请输入任务名称" />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="简述"
              >
              {getFieldDecorator('intro', {
                initialValue: item2Edit.intro,
              })(
                <Input placeholder="建议输入任务简述" />  
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="详细要求"
              >
              {getFieldDecorator('content', {
                rules: [{ required: true, message: '任务要求不可为空' }],
                initialValue: item2Edit.content,
              })(
                <Input placeholder="请输入任务的详细要求" />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="最后期限"
             >
              {getFieldDecorator('deadline', {
                rules: [{ type: 'object', required: true, message: '请为任务设置最后期限' }],
                initialValue: moment(item2Edit.deadline, "YYYY-MM-DD HH:mm:ss")
              })(
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="执行者"
              >
              {getFieldDecorator('users', {
                rules: [{ required: true, message: '执行者不可为空' }],
                initialValue: this.initDoer(item2Edit.users),
              })(
                <Select
                  multiple
                  style={{ width: '100%' }}
                  placeholder="请指定人员来执行该任务"
                >
                  {this.initUser(users, loginUser.id)}
                </Select>
              )}
            </Form.Item>
          </Form>
        }
      </Modal>
    );
  }
}

TaskEditer.propTypes = {
  users: PropTypes.array.isRequired,
  onCreate: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired, 
  modal2Edit: PropTypes.bool.isRequired, 
  item2Edit: PropTypes.object,
  loading2Modal: PropTypes.bool.isRequired,
}

export default Form.create()(TaskEditer)