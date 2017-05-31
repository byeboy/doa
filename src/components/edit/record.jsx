import React, { Component, PropTypes} from 'react'
import { Modal, Form, Input, InputNumber, Button, Select, Upload, Icon, message } from 'antd'

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}

class RecordEditer extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }
    
  render() {
    const { onSubmit, handleCancel, visible, item, goodType, recordType, loading, loginUser } = this.props;
    const { getFieldDecorator } = this.props.form;
    const getTitle = (item, goodType, recordType) => {
      if(!visible){
        return 'Title';
      }
      let title = '';
      switch(goodType) {
        case 'models': {
          title += '车型：';
          break;
        }
        case 'cabinets': {
          title += '柜体：';
          break;
        }
        case 'fans': {
          title += '风机：';
          break;
        }
        case 'parts': {
          title += '零件：';
          break;
        }
        default: break;
        // return title;
      }
      title += item.name;
      switch(recordType) {
        case 0: {
          title += '出库';
          break;
        }
        case 1: {
          title += '入库';
          break;
        }
        default: break;
        // return title;
      }
      return title;
    }
    const getNumberInput = (recordType, max) => {
      switch(recordType){
        case 0 : {
          return (<InputNumber min={1} max={max}/>);
          break;
        }
        case 1 : {
          return (<InputNumber min={1}/>);
          break;
        }
        default: 
          return false;
      }
    }
    const handleOk = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, fieldsValue) => {
        if (!err) {
          const sending = {
            type: goodType,
            item: {
              ...fieldsValue,
              type: recordType,
              id: item.id,
              operator_id: loginUser.id,
            }
          };
          console.log(sending)
          onSubmit(sending);
          this.props.form.resetFields();
        }
      });
    };
    const onCancel = (e) => {
      handleCancel();
      this.props.form.resetFields();
    };
    return (
      <div>
      {visible && <Modal title={getTitle(item, goodType, recordType)} 
             visible={visible}
             onCancel={onCancel}
             footer={[
                <Button key="back" size="large" onClick={onCancel}>关闭</Button>,
                <Button key="submit" type="primary" size="large" loading={loading} onClick={handleOk}>
                  确认
                </Button>,
              ]}
      >
        <Form>
          <Form.Item
            {...formItemLayout}
            label="数量"
            >
            {getFieldDecorator('count', {
              initialValue: 1,
            })(
              getNumberInput(recordType, item.count)
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="备注"
            >
            {getFieldDecorator('remark', {

            })(
              <Input placeholder="建议输入备注" />  
            )}
          </Form.Item>
        </Form>
      </Modal>}
      </div>
    );
  }
}

RecordEditer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired, 
  visible: PropTypes.bool.isRequired, 
  item: PropTypes.object,
  loading: PropTypes.bool.isRequired,
}

export default Form.create()(RecordEditer)