import React, { Component, PropTypes } from 'react'
import { Modal, Button, Icon, Form, Input } from 'antd'

class PropertyEditer extends Component{
  getTitle(attr) {
    let title = '';
    switch(attr) {
      case 'material' : 
        title = '材质';
        break;
      case 'model' :
        title = '车型';
        break;
      case 'cabinet':
        title = '柜体';
        break;
    }
    return title;
  }
  render() {
    const { onCreate, onUpdate, handleCancel, modal2Edit, item2Edit, loading2Modal, attr } = this.props;
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
      <Modal title={item2Edit === null ? `新建${this.getTitle(attr)}`:`编辑${this.getTitle(attr)}`}
             visible={modal2Edit}
             onCancel={onCancel}
             footer={[
                <Button key="back" size="large" onClick={handleCancel}>关闭</Button>,
                <Button key="submit" type="primary" size="large" loading={loading2Modal} onClick={handleOk}>
                  {item2Edit === null ? '确认新建':'保存更改'} 
                </Button>,
              ]}
      >
        <Form onSubmit={this.handleSubmit} >
          <Form.Item
            {...formItemLayout}
            label="名称"
            >
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '名称不可为空' }],
              item2Edit !== null && initialValue: item2Edit.title,
            })(
              <Input placeholder="请输入名称" />
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="简述"
            >
            {getFieldDecorator('intro', {
              item2Edit !== null && initialValue: item2Edit.intro,
            })(
              <Input placeholder="建议输入简述" />  
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

PropertyEditer.propTypes = {
  onCreate: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired, 
  modal2Edit: PropTypes.bool.isRequired, 
  item2Edit: PropTypes.object,
  loading2Modal: PropTypes.bool.isRequired,
  attr: PropTypes.string.isRequired,
}

export default Form.create()(PropertyEditer)