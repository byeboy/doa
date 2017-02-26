import React, { Component, PropTypes } from 'react'
import { Modal, Button, Icon, Form, Input, DatePicker, Select } from 'antd'
import moment from 'moment'

const authority = [
  {
    key: 1,
    name: '高级管理层',
    authority: 9,
  },{
    key: 2,
    name: '管理承接层',
    authority: 7,
  },{
    key: 3,
    name: '后勤服务层',
    authority: 3,
  },{
    key: 4,
    name: '业务整合层',
    authority: 1,
  },
];


const getSelect = (authArray) => {
  if(authArray.length !== 0) {
    return authArray.map(item => (
      <Select.Option key={item.key} value={item.authority.toString()}>{item.name}</Select.Option>
    ))
  }
};

class BranchEditer extends Component{
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
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    return (
      <Modal title={item2Edit === null ? '新建部门':'编辑部门信息'} 
             visible={modal2Edit}
             onCancel={onCancel}
             footer={[
                <Button key="back" size="large" onClick={handleCancel}>关闭</Button>,
                <Button key="submit" type="primary" size="large" loading={loading2Modal} onClick={handleOk}>
                  {item2Edit === null ? '确认':'保存更改'} 
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
                rules: [{ required: true, message: '部门名称不可为空' }],
                initialValue: null,
              })(
                <Input placeholder="请输入部门名称" />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="简述"
              >
              {getFieldDecorator('intro', {
                initialValue: null,
              })(
                <Input placeholder="建议输入部门简述" />  
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="部门职权"
              >
              {getFieldDecorator('authority', {
                rules: [{ required: true, message: '部门职权不可为空' }],
                initialValue: null,
              })(
                <Select
                  showSearch
                  placeholder="请选择部门职权"
                  optionFilterProp="children"
                  filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {getSelect(authority)}
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
                rules: [{ required: true, message: '部门名称不可为空' }],
                initialValue: item2Edit.name,
              })(
                <Input placeholder="请输入部门名称" />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="简述"
              >
              {getFieldDecorator('intro', {
                initialValue: item2Edit.intro,
              })(
                <Input placeholder="建议输入部门简述" />  
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="部门职权"
              >
              {getFieldDecorator('authority', {
                rules: [{ required: true, message: '部门职权不可为空' }],
                initialValue: item2Edit.authority.toString(),
              })(
                <Select
                  showSearch
                  placeholder="请选择部门职权"
                  optionFilterProp="children"
                  filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {getSelect(authority)}
                </Select>
              )}
            </Form.Item>
          </Form>
        }
      </Modal>
    );
  }
}

BranchEditer.propTypes = {
  onCreate: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired, 
  modal2Edit: PropTypes.bool.isRequired, 
  item2Edit: PropTypes.object,
  loading2Modal: PropTypes.bool.isRequired,
}

export default Form.create()(BranchEditer)