import React, { Component, PropTypes } from 'react'
import { Modal, Button, Icon, Form, Input, DatePicker, Select } from 'antd'

const getSelect = (branchArray) => {
    if(branchArray.length !== 0){
      return branchArray.map(item => (
        <Select.Option key={item.id.toString()} value={item.id.toString()}>{item.name}</Select.Option>
      ));
    }
  }

class UserEditer extends Component{
  constructor(props){
    super(props);
  }
  
  render() {
    const { onUpdate, handleCancel, modal2Edit, item2Edit, loading2Modal, branches } = this.props;
    const handleOk = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, fieldsValue) => {
        if (!err) {
          onUpdate(fieldsValue);
          this.props.form.resetFields();
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
      <Modal title={item2Edit === null ? '发布公告':'编辑用户'} 
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
              label="联系方式"
              >
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: '联系方式不可为空' }],
                initialValue: null,
              })(
                <Input placeholder="请输入联系方式" />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="所属部门"
              >
              {getFieldDecorator('branch_id', {
                rules: [{ required: true, message: '所属部门不可为空' }],
                initialValue: '',
              })(
                <Select
                  showSearch
                  placeholder="请选择所属部门"
                  optionFilterProp="children"
                  filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {getSelect(branches)}
                </Select>
              )}
            </Form.Item>
          </Form> :
          <Form onSubmit={this.handleSubmit} >
            <Form.Item
              {...formItemLayout}
              label="联系方式"
              >
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: '联系方式不可为空' }],
                initialValue: item2Edit.phone,
              })(
                <Input placeholder="请输入联系方式" />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="所属部门"
              >
              {getFieldDecorator('branch_id', {
                rules: [{ required: true, message: '所属部门不可为空' }],
                initialValue: item2Edit.branch_id.toString(),
              })(
                <Select
                  showSearch
                  placeholder="请选择所属部门"
                  optionFilterProp="children"
                  filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {getSelect(branches)}
                </Select>
              )}
            </Form.Item>
          </Form>
        }
      </Modal>
    );
  }
}

UserEditer.propTypes = {
//  onCreate: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired, 
  modal2Edit: PropTypes.bool.isRequired, 
  item2Edit: PropTypes.object,
  branches: PropTypes.array.isRequired,
  loading2Modal: PropTypes.bool.isRequired,
}

export default Form.create()(UserEditer)