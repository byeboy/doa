import React, { Component, PropTypes } from 'react'
import { Modal, Button, Icon, Form, Input, Upload, DatePicker, Select, Steps, message } from 'antd'
import moment from 'moment'
import styles from './common.less'

/*表单通用布局*/
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: { span: 20, offset: 4 },
};

/*内容表单*/
class Part extends Component{
  initSelect = (branches) => {
    let selectArray = [];
    if(branches !== null) {
      branches.map(item => {
        selectArray.push(
          <Select.Option key={item.id} value={item.id.toString()}>
          {item.name}
          </Select.Option>
        );
      })
    }
    return selectArray;
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const { materials, models, cabinets, branches, item2Edit, onStore, onNext } = this.props;
    const handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, fieldsValue) => {
        if (!err) {
          console.log(fieldsValue);
          onStore(fieldsValue);
          onNext();
        }
      });
    };
    return (
      <Form onSubmit={handleSubmit} >
        <Form.Item
          {...formItemLayout}
          label="名称"
          >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '零件名称不可为空' }],
            initialValue: item2Edit.name || null,
          })(
            <Input placeholder="请输入任务名称" />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="简述"
          >
          {getFieldDecorator('intro', {
            initialValue: item2Edit.intro || null,
          })(
            <Input placeholder="建议输入零件简述" />  
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="选择材质"
          >
          {getFieldDecorator('material_id', {
            rules: [{ required: true, message: '材质不可为空' }],
            initialValue: item2Edit.material_id ? item2Edit.material_id.toString() : null,
          })(
            <Select
              style={{ width: '100%' }}
              placeholder="请选择所属材质"
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {this.initSelect(materials)}
            </Select>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="选择车型"
          >
          {getFieldDecorator('model_id', {
            rules: [{ required: true, message: '车型不可为空' }],
            initialValue: item2Edit.model_id ? item2Edit.model_id.toString() : null,
          })(
            <Select
              style={{ width: '100%' }}
              placeholder="请选择所属车型"
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {this.initSelect(models)}
            </Select>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="选择柜体"
          >
          {getFieldDecorator('cabinet_id', {
            rules: [{ required: true, message: '柜体不可为空' }],
            initialValue: item2Edit.cabinet_id ?item2Edit.cabinet_id.toString() : null,
          })(
            <Select
              style={{ width: '100%' }}
              placeholder="请选择所属柜体"
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {this.initSelect(cabinets)}
            </Select>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="选择责任部门"
          >
          {getFieldDecorator('branch_id', {
            rules: [{ required: true, message: '责任部门不可为空' }],
            initialValue: item2Edit.branch_id ? item2Edit.branch_id.toString() : null,
          })(
            <Select
              style={{ width: '100%' }}
              placeholder="请选择责任部门"
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {this.initSelect(branches)}
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" size="large">下一步</Button>
        </Form.Item>
      </Form>
    );
  }
}

/*文件上传*/
class File extends Component {
  initFileList = (files) => {
    let fileList = [];
    if(typeof(files) === 'object' && files !== null) {
      files.map((item, index) => {
        fileList.push({
          uid: -(index+1),
          id: item.id,
          name: item.name,
          status: 'done',
          url: item.url,
        });
      })
    }
    return fileList;
  }
  formatFiles = (fileList) => {
    let files = [];
    if(typeof(fileList) === 'object' && fileList !== null) {
      fileList.map(item => {
        files.push(item.id);
      })
    }
    return files;
  }
  constructor(props) {
    super(props);
    this.state = {
      fileList: this.props.item2Edit.files ? this.initFileList(this.props.item2Edit.files) : [],
    };
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { item2Edit, onSubmit } = this.props;
    const handleChange = (info) => {
//      let files = [];
      let fileList = info.fileList;

      // 1. Limit the number of uploaded files
      //    Only to show 5 recent uploaded files, and old ones will be replaced by the new
      fileList = fileList.slice(-5);

      // 2. read from response and show file link
      fileList = fileList.map((file) => {
        if (file.response) {
          // Component will show file.url as link
          file.id = file.response.post.file.id;
          file.url = file.response.post.file.url;
//          files.push(file.id);
        }
        return file;
      });

      // 3. filter successfully uploaded files according to response from server
      fileList = fileList.filter((file) => {
        if (file.response) {
          return file.response.success === true;
        }
        return true;
      });

      this.setState({ fileList });
    };
    const handleStore = () => {
      const files = this.formatFiles(this.state.fileList);
      console.log(this.state.fileList)
      console.log(files)
      onStore({ files });
      onSubmit();
    };
    const props = {
      name: 'file',
      showUploadList: true,
      action: '/api/files',
      onChange: handleChange,
      multiple: true,
    };
    return (
      <div>
        <Upload.Dragger {...props}
          fileList={this.state.fileList}
         >
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">点击或拖拽文件到此进行上传</p>
          <p className="ant-upload-hint">支持单次或大量上传。严格禁止上传公司机密数据或其他频段文件</p>
        </Upload.Dragger>
        <Button type="primary" onClick={handleStore} size="large">下一步</Button>
      </div>
    );
  }
}

export const PartForm = Form.create()(Part);
export const FileForm = Form.create()(File);

function PartEditer({ materials, models, cabinets, branches, loginUser, onStore, onNext, onSubmit, handleCancel, modal2Edit, item2Edit, current, loading2Modal }){
  const storeProps = {
    item2Edit,
    materials,
    models,
    cabinets,
    branches,
    onStore: onStore,
    onNext: onNext,
  };
  const fileProps = {
    item2Edit,
    onSubmit: onSubmit,
  };
  const steps = [{
    title: '编写基本信息',
    content: (<PartForm {...storeProps}/>),
  }, {
    title: '上传相关文件',
    content: (<FileForm {...fileProps}/>),
  }];
  return(
    <Modal title={item2Edit === null ? '添加零件信息':'编辑零件信息'} 
           visible={modal2Edit}
           width={600}
           onCancel={handleCancel}
           footer={false}
    >
      <Steps current={current}>
        {steps.map(item => <Steps.Step key={item.title} title={item.title} />)}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
    </Modal>
  );
}

PartEditer.propTypes = {
  materials: PropTypes.array.isRequired,
  models: PropTypes.array.isRequired,
  cabinets: PropTypes.array.isRequired,
  branches: PropTypes.array.isRequired,
  onStore: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired, 
  modal2Edit: PropTypes.bool.isRequired, 
  item2Edit: PropTypes.object,
  loading2Modal: PropTypes.bool.isRequired,
}

export default PartEditer