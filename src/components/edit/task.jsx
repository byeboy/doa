import React, { Component, PropTypes } from 'react'
import { Modal, Button, Icon, Form, Input } from 'antd'

class TaskEditer extends Component{
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      name: '',
      intro: '',
      
    }
  }
  
  render() {
    const { onCreate, onUpdate, handleCancel, modal2Edit, item2Edit } = this.props;
    const { loading } = this.state;
    const handleOk = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.setState({
            loading: true
          });
          if(item2Edit === null){
            console.log('Create: ', values)
          }
          console.log('Update: ', values);
        }
      });
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal title={item2Edit === null ? '发布新任务':'编辑任务'} 
             visible={modal2Edit}
             onCancel={handleCancel}
             footer={[
                <Button key="back" size="large" onClick={handleCancel}>关闭</Button>,
                <Button key="submit" type="primary" size="large" loading={loading} onClick={handleOk}>
                  {item2Edit === null ? '确认发布':'保存更改'} 
                </Button>,
              ]}
      >
        {item2Edit === null ? 
          
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input addonBefore={<Icon type="user" />} placeholder="Username" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
          )}
        </Form.Item>
      </Form> :
          <div>
            <div style={{ marginBottom: 16 }}>
              <Input addonBefore="Http://" addonAfter=".com" defaultValue={item2Edit.name} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <Input defaultValue="mysite" />
            </div>
            <div style={{ marginBottom: 16 }}>
              <Input addonAfter={<Icon type="setting" />} defaultValue="mysite" />
            </div>
          </div>
        }
      </Modal>
    );
  }
}

TaskEditer.propTypes = {
  item: PropTypes.object,
//  button: PropTypes.bool.isRequired,
//  buttonText: PropTypes.any.isRequired,
//  iconType: PropTypes.string,
//  title: PropTypes.string.isRequired,
//  content: PropTypes.any.isRequired,
  onCreate: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
}

export default Form.create()(TaskEditer)