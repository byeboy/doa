import React, { Component, PropTypes} from 'react'
import { Modal, Form, Input, Button, Select, Upload, Icon, message } from 'antd'

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}

class ProductEditer extends Component{
  constructor(props){
    super(props);
    this.state = {
      files: this.props.item !== null ? this.props.item.files : [],
    }
  }
  componentWillReceiveProps(newProps) {
    this.setState({
      files: newProps.item !== null ? this.initFiles(newProps.item.files) : [],
    });
  }
  initFiles = (files) => {
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
  handleSearch = (fileName) => {
    this.setState({ fileName });
    fetch(fileName, fileList => this.setState({ fileList }));
  }
  handleSelect = (file) => {
    console.log(file)
  }
  beforeUpload(file) {
    const isLt30M = file.size / 1024 / 1024 < 30;
    if (!isLt30M) {
      message.error('单个文件不得超过30M！请检查'+file.name);
    }
    return isLt30M;
  }
  uploadFiles = (info) => {
    let fileList = info.fileList;

    // 1. Limit the number of uploaded files
    //    Only to show 5 recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-5);

    // 2. read from response and show file link
    fileList = fileList.map((file) => {
      if (file.response) {
        console.log(file)
        if(!file.response.success) {
          message.error(file.response.message)
          file.status = 'error';
        } else {
          // Component will show file.url as link
          file.id = file.response.post.file.id;
          file.url = file.response.post.file.url;
          file.status = 'done';
        }
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

    this.setState({ files: fileList });
  };
    
  render() {
    const { onSubmit, handleCancel, getRelationFiles, getRelation, downloadFile, visible, relation, item, loading } = this.props;
    const { getFieldDecorator } = this.props.form;
    const fileOptions = this.props.fileList.map(file => <Select.Option key={file.id} value={file.id.toString()}>{file.name}</Select.Option>);
    const initRelationSelect = () => {
      getRelation(relation);
    };
    const relationOptions = this.props.relationList.map(opt => <Select.Option key={opt.id} value={opt.id.toString()}>{opt.name}</Select.Option>)
    const relationFileProps = {
      type: relation.type,
      id: item !== null ? item.id : null,
    };
    const initFileSelect = () => {
      getRelationFiles(relationFileProps);
    };
    const handleOk = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, fieldsValue) => {
        if (!err) {
          let sending = {};
          if(item !== null) {
            sending = {
              ...relation,
              item: {
                id: item.id,
                name: fieldsValue.name,
                intro: fieldsValue.intro,
              }
            };
          } else if(relation.upType === null) {
            const newFiles = this.state.files.map(file => file.id);
            const relationFiles = fieldsValue.files.map(id => parseInt(id));
            sending = {
              ...relation,
              item: {
                ...fieldsValue,
                files: [
                  ...relationFiles,
                  ...newFiles,
                ],
              },
            };
          } else if(relation.type === 'files'){
            const newFiles = this.state.files.map(file => file.id);
            const relationFiles = fieldsValue.ids.map(id => parseInt(id));
            sending = {
              ...relation,
              id: [
                ...relationFiles,
                ...newFiles,
              ],
            };
          } else {
            const id = fieldsValue.ids.map(id => parseInt(id));
            sending = {
              ...relation,
              id,
            };
          }
          onSubmit(sending);
          this.props.form.resetFields();
          this.setState({ files: [] });
        }
      });
    };
    const onCancel = (e) => {
      handleCancel();
      this.props.form.resetFields();
      this.setState({ files: [] });
    };
    const uploadProps = {
      name: 'file',
      headers: {
        type: relation.upType !== null? relation.upType : relation.type,
      },
      multiple: true,
      action: '/api/files',
      beforeUpload: this.beforeUpload,
      onChange: this.uploadFiles,
    };


    return (
      <Modal title={item === null ? ((relation.upType === null || relation.type === 'files') ? '新建': '关联'):'编辑'+item.name} 
             visible={visible}
             onCancel={onCancel}
             footer={[
                <Button key="back" size="large" onClick={onCancel}>关闭</Button>,
                <Button key="submit" type="primary" size="large" loading={loading} onClick={handleOk}>
                  {item === null ? '确认':'保存更改'} 
                </Button>,
              ]}
      >
        {relation.upType === null ? <Form>
          <Form.Item
            {...formItemLayout}
            label="名称"
            >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '名称不可为空' }],
              initialValue: item !== null ? item.name : null,
            })(
              <Input placeholder="请输入名称" />
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="简述"
            >
            {getFieldDecorator('intro', {
              initialValue: item !== null ? item.intro : null,
            })(
              <Input placeholder="建议输入简述" />  
            )}
          </Form.Item>
          {item === null && <Form.Item
            {...formItemLayout}
            label="关联文件"
            >
            {getFieldDecorator('files', {
              initialValue: [],
            })(
              <Select
                mode="multiple"
                showSearch
                style={{ width: '100%' }}
                placeholder="请选择要关联的文件"
                onFocus={initFileSelect}
                notFoundContent="暂未找到相关文件"
                defaultActiveFirstOption={false}
                showArrow={true}
                optionFilterProp="children"
              >
              {fileOptions}
            </Select>
            )}
          </Form.Item>}
        </Form>: 
        <Form>
          <Form.Item
            {...formItemLayout}
            label="关联">
            {getFieldDecorator('ids', {
              rules: [{ required: (relation.type === 'files' || relation.upType === null) && false, message: '请选择要关联的内容', type: 'array' }],
              initialValue: [],
            })(
              <Select
                mode="multiple"
                showSearch
                placeholder="请选择要关联的内容"
                notFoundContent="暂未找到相关内容"
                defaultActiveFirstOption={false}
                onFocus={initRelationSelect}
                showArrow={true}
                optionFilterProp="children"
              >
              {relationOptions}
            </Select>
            )}
          </Form.Item>
        </Form>
        }
        {((item === null && relation.upType === null) || relation.type === 'files') && <Upload.Dragger {...uploadProps}
         fileList={this.state.files}
         >
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">上传文件</p>
          <p className="ant-upload-hint">若需添加文件，请在此上传。支持单次或大量上传。严格禁止非法上传公司机密数据或其他频段文件。</p>
        </Upload.Dragger>}
      </Modal>
    );
  }
}

ProductEditer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired, 
  visible: PropTypes.bool.isRequired, 
  item: PropTypes.object,
  loading: PropTypes.bool.isRequired,
}

export default Form.create()(ProductEditer)