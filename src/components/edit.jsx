import React, { Component, PropTypes } from 'react'
import { Modal, Button, Icon } from 'antd'

class Editer extends Component{
  constructor(props){
    super(props);
    this.state = {
      visible: false,
      loading: false,
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
    const { button, buttonText, iconType, title, content, onOK } = this.props;
    const { visible, loading } = this.state;
    const handleOk = () => {
      console.log('handleOk')
    };
    return (
      <div>
        {button ?
          <Button type="primary" onClick={this.showModal}>
            {buttonText || "showModal"}
          </Button> :
          <Icon type={iconType || "edit"} className="actionIcon primary" onClick={this.showModal} />
        }
        <Modal title={title || "Basic Modal"} 
               visible={visible}
               onCancel={this.handleCancel}
               footer={[
                  <Button key="back" size="large" onClick={this.handleCancel}>关闭</Button>,
                  <Button key="submit" type="primary" size="large" loading={loading} onClick={handleOk}>
                    确认提交
                  </Button>,
                ]}
        >
          {content || "Demo"}
        </Modal>
      </div>
    );
  }
}

Editer.propTypes = {
  button: PropTypes.bool.isRequired,
  buttonText: PropTypes.any.isRequired,
  iconType: PropTypes.string,
  title: PropTypes.string.isRequired,
  content: PropTypes.any.isRequired,
  onOk: PropTypes.func.isRequired,
}

export default Editer