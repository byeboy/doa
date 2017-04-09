import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Button, Collapse, Icon, Row, Col, Timeline, Popconfirm, Transfer, Tree, InputNumber, Cascader, Form, Input, DatePicker, Select, Modal } from 'antd';
import Tasker from '../components/tasks';
import Searcher from '../components/search';
import TaskEditer from '../components/edit/task';

const createProps = {
  item: null,
  button: true,
  iconType: 'plus',
  onOk(params){
    dispatch({
      type:'',
    })
  },
}
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const searchProps = {
  selectOpts: [
    {
      name: '任务名称',
      value: 'name',
    }
  ],
  defaultSelected: 'name',
  onSearch(param, val) {
    dispatch({
      type: '',
      payload: {
        param: param,
        val: val,
      }
    })
  },
}



function Tasks({ dispatch, loading, task}) {
  const { loginUser, users, todos, dones, posts, modal2Edit, item2Edit, current, loading2Modal, proOpts } = task;
  const editProps = {
    current,
    users,
    loginUser,
    modal2Edit,
    item2Edit,
    loading2Modal,
    proOpts,
    getOpts(proType){
      dispatch({
        type: 'task/getOpts',
        payload: {
          type: proType,
        }
      })
    },
    initOpts(){
      dispatch({
        type: 'task/initOpts',
      })
    },
    handleCancel(){
      dispatch({
        type: 'task/hideModal2Edit',
      });
    },
    onStore(values){
      dispatch({
        type: 'task/store',
        payload: {
          values: {
            ...values,
          },
        }
      });
    },
    onNext(){
      dispatch({
        type: 'task/next',       
      });          
    },
    onSubmit(values){
      dispatch({
        type: 'task/submit',
        payload: {
          values: {
            ...values,
            poster_id: loginUser.id,
          },
        }
      });
    },
    onCreate(values){
      dispatch({
        type:'task/save',
        payload: {
          values: {
            ...values,
            poster_id: loginUser.id,
          },
        }
      });
    },
    onUpdate(values){
      dispatch({
        type:'task/update',
        payload: {
          id: item2Edit.id,
          values: values,
        }
      })
    },
    hideEdit() {
      dispatch({
        type: 'task/hideModal2Edit',
      });
    }
  }
  const actionProps = {
    onDone(id){
      dispatch({
        type: 'task/patch',
        payload: {
          id: id,
          values: {
            'status': 5,
          },
        }
      })
    },
    onRedo(id){
      dispatch({
        type: 'task/patch',
        payload: {
          id: id,
          values: {
            'status': 1,
          },
        }
      })
    },
    onCheck(id){
      dispatch({
        type: 'task/patch',
        payload: {
          id: id,
          values: {
            'status': 9,
          },
        }
      })
    },
    onDelete(id){
      dispatch({
        type: 'task/del',
        payload: {
          id: id,
        }
      })
    },
    onEdit(item){
      dispatch({
        type: 'task/showModal2Edit',
        payload: {
          item2Edit: item,
        }
      })
    },
    onProgressPatch(payload){
      dispatch({
        type: 'task/progressPatch',
        payload,
      })
    },
    onStepChose(id){
      dispatch({
        type: 'task/stepPatch',
        payload: {
          id: id,
          values: {
            'user_id': loginUser.id,
          },
        }
      })
    },
    onStepDone(id){
      dispatch({
        type: 'task/stepPatch',
        payload: {
          id: id,
          values: {
            'status': 9,
          },
        }
      })
    },
    onStepRedo(id){
      dispatch({
        type: 'task/stepPatch',
        payload: {
          id: id,
          values: {
            'status': 1,
          },
        }
      })
    },
    onDownloadZip(id){
      dispatch({
        type: 'task/downloadZip',
        payload: {
          id
        }
      })
    },
  }
  const todoProps = {
    loginUser,
    data: todos,
    type: 'todos',
  }

  const doneProps = {
    loginUser,
    data: dones,
    type: 'dones',
  }

  const postProps = {
    loginUser,
    data: posts,
    type: 'posts',
  }
  
  const showEdit = () => {
    dispatch({
      type: 'task/showModal2Edit',
      payload: {
          item2Edit: {
                id: null,
                users: [],
            },
        }
    })
  }
  
  const { authority } = loginUser;

  return (
      <div>
        {/*authority >= 5 && <TaskEditer {...editProps}/>*/}
        {/*<Row gutter={16}>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <Card title={<b><Icon type="info-circle-o" /> 任务模块说明</b>}>
                      <Row gutter={16}>
                        <Col xs={24} sm={24} md={16} lg={16}>
                          <h3>该页面为任务管理页</h3>
                          <p>主要功能为查看并操作相关任务，需要注意的地方有以下几点：</p>
                          <p>任务共划分为三种状态：正在进行（蓝色圆圈标识）、完成待验收（绿色圆圈标识）、验收成功（绿色对勾圆圈标识）</p>
                          <p>具体任务状态请看右侧示例<Icon type="arrow-right" /></p>
                          <p>对于任务操作在对应的按钮上有操作提示</p>
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8}>
                          <Timeline>
                            <Timeline.Item color="blue">
                              <p>正在进行的任务</p>
                            </Timeline.Item>
                            <Timeline.Item color="green">
                              <p>已完成待验收的任务</p>
                            </Timeline.Item>
                            <Timeline.Item dot={<Icon type="check-circle-o" style={{ fontSize: 16 }}/>} color="green">
                              <p>验收成功的任务</p>
                            </Timeline.Item>
                          </Timeline>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>*/}
        {modal2Edit && <TaskEdit {...editProps} />}
        {(authority === 4 || authority === 9) &&
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={24}>
            <Card title={<b><Icon type="bars"/>任务管理</b>}
              loading={loading}
              extra={authority >= 5 && !modal2Edit && <Button type="primary" disabled={users.length <= 1} onClick={showEdit}><Icon type="plus" />发布新任务</Button>}
            >
              {posts.length !== 0 ?
                <Tasker {...postProps} {...actionProps}/> : 
                <div><Icon type="smile-o" />暂无需管理的任务</div>
              }
            </Card>
          </Col>
        </Row>}
        {(authority === 2 || authority === 3) &&
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={24}>
            <Card title={<b><Icon type="bars"/>待验收任务</b>}
              loading={loading}
            >
              {posts.length !== 0 ?
                <Tasker {...doneProps} {...actionProps}/> : 
                <div><Icon type="smile-o" />暂无需验收的任务</div>
              }
            </Card>
          </Col>
        </Row>}
        {authority === 3 &&
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={24}>
            <Card title={<b><Icon type="solution"/>我的待办</b>}
              /*extra={<Searcher {...searchProps}/>}*/
              loading={loading}
              >
              {todos.length !== 0 ?
                <Tasker {...todoProps} {...actionProps}/>: 
                <div><Icon type="smile-o" />暂无待办事项</div>
              }
            </Card>
          </Col>
        </Row>}
      </div>
  );
}

class TaskEdit extends Component{
  constructor(props) {
    super(props);
  
    this.state = {
      plan: [],
    };
  }
  componentWillUnmount() {
    this.props.initOpts();
  }
  /*onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }
  onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  }*/
  onChange = (value, selectedOptions) => {
    if(this.state.plan.filter(p => p.key === selectedOptions[0].value).length === 0){
      this.state.plan.push({
        key: selectedOptions[0].value,
        title: selectedOptions[0].label,
        data: [
          {
            ...selectedOptions[1],
            plan_count: 1,
          },
        ]
      });
    } else {
      this.state.plan.map(p => {
        if(p.key === selectedOptions[0].value) {
          const v = p.data.filter(pd => pd.id === selectedOptions[1].id);
          if(v.length === 0) {
            p.data.push({
              ...selectedOptions[1],
              plan_count: 1,
            });
          }
        }
      });
    }
    this.setState({plan: this.state.plan});
  }
  onCountChange = (value, upKey, id) => {
    let newPlan = this.state.plan;
    console.log(newPlan)
    console.log(this.state.plan)
    newPlan.map(p => {
      if(p.key === upKey) {
        console.log(p)
        p.data.map(pd => {
          if(pd.id === id) {
            pd.plan_count = value;
          }
        });
      }
    });
    this.setState({
      plan: newPlan,
    });
  }
  onDelete = (upKey, id) => {
    let newPlan = this.state.plan;
    newPlan.map(p => {
      if(p.key === upKey) {
        p.data = p.data.filter(pd => pd.id !== id);
      }
    });
    newPlan = newPlan.filter(np => np.data.length !== 0);
    this.setState({
      plan: newPlan,
    });
  }
  loadData = (selectedOptions) => {
    this.props.getOpts(selectedOptions[0].value);
  }
  render() {
    const {item2Edit, hideEdit} = this.props;
    return (
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Card title={item2Edit.id === null ? <b><Icon type="plus"/>新增任务</b> : <b><Icon type="edit"/>编辑任务</b>}
            extra={
              <Popconfirm title="确认放弃相关操作?" onConfirm={hideEdit} okText="确定" cancelText="取消">
                <Button type="danger">放弃编辑</Button>
              </Popconfirm>
            }
          >
            <Col xs={24} sm={24} md={12} lg={12}>
              <Tree
                showLine
                defaultExpandAll
              >
                <Tree.TreeNode title="生产列表" key="products">
                  {this._renderPlanTree()}
                </Tree.TreeNode>
              </Tree>

              <Cascader 
                options={this.props.proOpts} 
                onChange={this.onChange}
                loadData={this.loadData}
              >
                <a href="#">添加产品</a>
              </Cascader>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <TaskForm {...this.props} products={this.state.plan}/>
            </Col>
          </Card>
        </Col>
      </Row>
    )
  }
  _renderPlanTree() {
    return this.state.plan.map(plc => (
      <Tree.TreeNode title={plc.title} key={plc.key}>
        {this._renderProductTree(plc.key)}
      </Tree.TreeNode>
    ))
  }
  _renderProductTree(upKey) {
    return this.state.plan.find(p => p.key === upKey).data.map(prc => (
      <Tree.TreeNode title={
        <div>
          名称:{prc.name} &nbsp; | &nbsp;
          数量:<InputNumber size="small" min={1} defaultValue={prc.plan_count} onChange={(e) => this.onCountChange(e, upKey, prc.id)} /> &nbsp; | &nbsp;
          <Popconfirm title="确认删除?" onConfirm={() => this.onDelete(upKey, prc.id)} okText="确定" cancelText="取消">
            <span style={{color: 'red'}}>删除</span>
          </Popconfirm>
        </div>
      } key={upKey+prc.id.toString()}>

      </Tree.TreeNode>  
    ));
  }
}

/*内容表单*/
class TaskInfoForm extends Component{
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
  render(){
    const { getFieldDecorator } = this.props.form;
    const { users, loginUser, item2Edit, onCreate } = this.props;
    const handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, fieldsValue) => {
        if (!err) {
          const values = {
            ...fieldsValue,
            'deadline': fieldsValue['deadline'].format('YYYY-MM-DD HH:mm:ss'),
            products: this.props.products,
          };
          console.log(values);
          if(this.props.products.length === 0){
            Modal.confirm({
              title: '确认提交？',
              content: '检测到生产任务为空，是否提交以创建非生产任务？',
              onOk() {
                onCreate(values);
              },
            })
          } else {
            onCreate(values);
          }
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
          label="执行者"
          >
          {getFieldDecorator('doers', {
            rules: [{ required: true, message: '执行者不可为空' }],
            initialValue: this.initDoer(item2Edit.doers) || [],
          })(
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="请指定人员来执行该任务"
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => option.props.children[0].toLowerCase().indexOf(input.toLowerCase()) >= 0}
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

function mapStateToProps(state) {
  return {
    task: state.task,
    loading: state.loading.models.task,
  };
}

export const TaskForm = Form.create()(TaskInfoForm);
export default connect(mapStateToProps)(Tasks);
