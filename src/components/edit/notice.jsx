import React, { Component, PropTypes } from 'react'
import { Modal, Button, Icon, Form, Input, DatePicker, Select } from 'antd'
import moment from 'moment'

class NoticeEditer extends Component{
  constructor(props){
    super(props);
  }
  render() {
    const { onCreate, onUpdate, handleCancel, modal2Edit, item2Edit, loading2Modal } = this.props;
    const handleOk = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, fieldsValue) => {
        if (!err) {
          if(item2Edit === null){
            onCreate(fieldsValue);
            this.props.form.resetFields();
          } else {
            onUpdate(fieldsValue);
            this.props.form.resetFields();
          }
        }
      });
    };
    const onCancel = (e) => {
      handleCancel();
      this.props.form.resetFields();
    };
    const { getFieldDecorator, resetFields } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    const selectOpts = [];
    for (let i = 0; i < 26; i++) {
      selectOpts.push(<Select.Option key={i}>{'user'+i.toString(36)}</Select.Option>);
    }
    return (
      <Modal title={item2Edit === null ? '发布公告':'编辑公告'} 
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
              label="标题"
              >
              {getFieldDecorator('title', {
                rules: [{ required: true, message: '公告标题不可为空' }],
                initialValue: null,
              })(
                <Input placeholder="请输入公告标题" />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="简述"
              >
              {getFieldDecorator('intro', {
                initialValue: null,
              })(
                <Input placeholder="建议输入公告简述" />  
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="详细内容"
              >
              {getFieldDecorator('content', {
                rules: [{ required: true, message: '详细内容不可为空' }],
                initialValue: null,
              })(
                <Input placeholder="请输入公告的详细内容" />
              )}
            </Form.Item>
          </Form> :
          <Form onSubmit={this.handleSubmit} >
            <Form.Item
              {...formItemLayout}
              label="标题"
              >
              {getFieldDecorator('title', {
                rules: [{ required: true, message: '公告标题不可为空' }],
                initialValue: item2Edit.title,
              })(
                <Input placeholder="请输入公告标题" />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="简述"
              >
              {getFieldDecorator('intro', {
                initialValue: item2Edit.intro,
              })(
                <Input placeholder="建议输入公告简述" />  
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="详细内容"
              >
              {getFieldDecorator('content', {
                rules: [{ required: true, message: '详细内容不可为空' }],
                initialValue: item2Edit.content,
              })(
                <Input placeholder="请输入公告的详细内容" />
              )}
            </Form.Item>
          </Form>
        }
      </Modal>
    );
  }
}

NoticeEditer.propTypes = {
  onCreate: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired, 
  modal2Edit: PropTypes.bool.isRequired, 
  item2Edit: PropTypes.object,
  loading2Modal: PropTypes.bool.isRequired,
}

export default Form.create()(NoticeEditer)