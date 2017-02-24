import React, { Component, PropTypes } from 'react'
import { Modal, Button, Icon, Input } from 'antd'

class TaskEditer extends Component{
  constructor(props){
    super(props);
    this.state = {
      visible: this.props.modal2Edit,
      loading: false,
      item: this.props.item,
    }
  }
  showModal = () => {
    this.setState({
      visible: true,
    })
  }
  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }
  render() {
    const { button, buttonText, iconType, onOK } = this.props;
    const { visible, loading, item } = this.state;
    const handleOk = () => {
      console.log('handleOk')
    };
    return (
      <div>
        {button ?
          <Button type="primary" onClick={this.showModal}>
            {item === null?
              <div><Icon type="plus"/>发布新任务</div>:
              <div><Icon type="edit"/>编辑任务</div>
            }
          </Button> :
          <Icon type={item === null?'plus':'edit'} 
            className="actionIcon primary" onClick={this.showModal} />
        }
        <Modal title={item === null ? '发布新任务':'编辑任务'} 
               visible={visible}
               onCancel={this.handleCancel}
               footer={[
                  <Button key="back" size="large" onClick={this.handleCancel}>关闭</Button>,
                  <Button key="submit" type="primary" size="large" loading={loading} onClick={handleOk}>
                    确认提交
                  </Button>,
                ]}
        >
          {item === null ? 
            <div>
              <div style={{ marginBottom: 16 }}>
                <Input addonBefore="Http://" addonAfter=".com" defaultValue="mysite" />
              </div>
              <div style={{ marginBottom: 16 }}>
                <Input defaultValue="mysite" />
              </div>
              <div style={{ marginBottom: 16 }}>
                <Input addonAfter={<Icon type="setting" />} defaultValue="mysite" />
              </div>
            </div> :
            <div>
              <div style={{ marginBottom: 16 }}>
                <Input addonBefore="Http://" addonAfter=".com" defaultValue={item.name} />
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
      </div>
    );
  }
}

TaskEditer.propTypes = {
  item: PropTypes.object,
  button: PropTypes.bool.isRequired,
//  buttonText: PropTypes.any.isRequired,
//  iconType: PropTypes.string,
//  title: PropTypes.string.isRequired,
//  content: PropTypes.any.isRequired,
  onOk: PropTypes.func.isRequired,
}

export default TaskEditer