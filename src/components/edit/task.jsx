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
class Task extends Component{
  render(){
    const { getFieldDecorator } = this.props.form;
    const { item2Edit, onStore, onNext } = this.props;
    const handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, fieldsValue) => {
        if (!err) {
          fieldsValue = {
            ...fieldsValue,
            'deadline': fieldsValue['deadline'].format('YYYY-MM-DD HH:mm:ss'),
          };
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
            rules: [{ required: true, message: '任务名称不可为空' }],
            initialValue: item2Edit.name || null,
          })(
            <Input placeholder="请输入任务名称" />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="最后期限"
         >
          {getFieldDecorator('deadline', {
            rules: [{ type: 'object', required: true, message: '请为任务设置最后期限' }],
            initialValue: item2Edit.deadline ? moment(item2Edit.deadline, "YYYY-MM-DD HH:mm:ss") : null ,
          })(
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="简述"
          >
          {getFieldDecorator('intro', {
            initialValue: item2Edit.intro || null,
          })(
            <Input placeholder="建议输入任务简述" />  
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="详细要求"
          >
          {getFieldDecorator('content', {
            rules: [{ required: true, message: '任务要求不可为空' }],
            initialValue: item2Edit.content || null,
          })(
            <Input type="textarea" rows={3} placeholder="请输入任务的详细要求" />
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
    const { item2Edit, onStore, onNext } = this.props;
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
      onNext();
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

/*流程表单*/
let uuid = 0;
class Step extends Component{
  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const steps = form.getFieldValue('steps');
    // We need at least one passenger
    if (steps.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      steps: steps.filter(step => step.id !== k),
    });
  }

  add = () => {
    uuid++;
    const { form } = this.props;
    // can use data-binding to get
    const steps = form.getFieldValue('steps');
    const nextSteps = steps.concat({
      id: uuid,
      value: null,
    });
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      steps: nextSteps,
    });
  }
  
  initStepList = (steps) => {
    let stepList = [];
    if(typeof(steps) === 'object' && steps !== null) {
      steps.map(item => {
        stepList.push({
          id: item.id,
          value: item.name,
        });
      })
    }
    return stepList;
  }
  
  render(){
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { onStore, onNext, item2Edit } = this.props;
    const handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, fieldsValue) => {
        if (!err) {
          console.log(fieldsValue);
          const steps = [];
//          for( let i = 0; i < fieldsValue.steps.length; i ++){
//            const step = 'step'+fieldsValue.steps[i];
//            console.log(step)
//            console.log(fieldsValue.valueOf())
//          }
          for(let k in fieldsValue){
            if(k !== 'steps'){
              steps.push(fieldsValue[k])
            }
          }
          console.log(steps)
          onStore({ steps });
          onNext();
        }
      });
    };
    getFieldDecorator('steps', { 
      initialValue: item2Edit.steps ? this.initStepList(item2Edit.steps) : [{
        id: 0,
        value: null,
      }] 
    });
    const steps = getFieldValue('steps');
    const formItems = steps.map((item, index) => {
      return (
        <Form.Item
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? '任务流程' : ''}
          required={true}
          key={index}
        >
          {getFieldDecorator(`step${index}`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: "请设置任务流程或删除该流程编辑框",
            }],
            initialValue: item.value
          })(
            <Input placeholder="请设置任务流程" style={{ width: '60%', marginRight: 8 }} />
          )}
          <Icon
            className={styles.dynamicDeleteButton}
            type="minus-circle-o"
            disabled={steps.length === 1}
            onClick={() => this.remove(item.id)}
          />
        </Form.Item>
      );
    });
    return (
      <Form onSubmit={handleSubmit}>
        {formItems}
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> 添加流程项
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" size="large">下一步</Button>
        </Form.Item>
      </Form>
    );
  }
}

/*执行者表单*/
class Doer extends Component{
  initUser = (users, id) => {
    let userArray = [];
    if(users !== null) {
      users.map(item => {
        if(item.id !== id) {
          userArray.push(
            <Select.Option key={item.id} value={item.id.toString()}>
            {item.name}{item.branch !== null && ` | ${item.branch.name}`}
            </Select.Option>);
        }
      })
    }
    return userArray;
  }
  initDoer = (doers) => {
    let doerIdArray = [];
    if(typeof(doers) === 'object' && doers !== null) {
      doers.map(item => {
        if(item.id) {
          doerIdArray.push(item.id.toString());
        } else {
          doerIdArray.push(item.toString());
        }
      })
    }
    return doerIdArray;
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { users, loginUser, item2Edit, onSubmit } = this.props;
    const handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, fieldsValue) => {
        if (!err) {
          onSubmit(fieldsValue);
        }
      });
    };
    return (
      <Form onSubmit={handleSubmit} >
        <Form.Item
          {...formItemLayout}
          label="执行者"
          >
          {getFieldDecorator('users', {
            rules: [{ required: true, message: '执行者不可为空' }],
            initialValue: this.initDoer(item2Edit.users) || [],
          })(
            <Select
              multiple
              style={{ width: '100%' }}
              placeholder="请指定人员来执行该任务"
            >
              {this.initUser(users, loginUser.id)}
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" size="large">提交</Button>
        </Form.Item>
      </Form>
    );
  }
}
export const TaskForm = Form.create()(Task);
export const FileForm = Form.create()(File);
export const StepForm = Form.create()(Step);
export const DoerForm = Form.create()(Doer);

function TaskEditer({ users, loginUser, onCreate, onUpdate, onStore, onNext, onSubmit, handleCancel, modal2Edit, item2Edit, current, loading2Modal }){
  const storeProps = {
    item2Edit,
    onStore: onStore,
    onNext: onNext,
  };
  const doerProps = {
    users,
    loginUser,
    item2Edit,
    onSubmit: onSubmit,
  };
  const steps = [{
    title: '编写任务信息',
    content: (<TaskForm {...storeProps}/>),
  }, {
    title: '上传任务文档',
    content: (<FileForm {...storeProps}/>),
  }, {
    title: '设置任务流程',
    content: (<StepForm {...storeProps}/>),
  }, {
    title: '指定执行者',
    content: (<DoerForm {...doerProps}/>),
  }];
  return(
    <Modal title={item2Edit === null ? '发布新任务':'编辑任务'} 
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

TaskEditer.propTypes = {
  users: PropTypes.array.isRequired,
  onCreate: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired, 
  modal2Edit: PropTypes.bool.isRequired, 
  item2Edit: PropTypes.object,
  loading2Modal: PropTypes.bool.isRequired,
}

export default TaskEditer