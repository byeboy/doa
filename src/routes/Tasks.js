import React from 'react';
import { connect } from 'dva';
import { Card, Button, Collapse, Icon, Row, Col, Timeline, Input } from 'antd';
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
  const { loginUser, users, todos, dones, posts, modal2Edit, item2Edit, current, loading2Modal } = task;  
  const editProps = {
    current,
    users,
    loginUser,
    modal2Edit,
    item2Edit,
    loading2Modal,
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
  }
  const todoProps = {
    loginUser,
    content: todos,
    type: 'todos',
  }

  const doneProps = {
    content: dones,
    type: 'dones',
  }

  const postProps = {
    content: posts,
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
        {authority >= 5 && <TaskEditer {...editProps}/>}
        <Row gutter={16}>
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
        </Row>
        {authority >= 5 &&
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={24}>
            <Card title={<b><Icon type="bars"/>任务管理</b>}
              loading={loading}
              extra={authority >= 5 && <Button type="primary" disabled={users.length <= 1} onClick={showEdit}><Icon type="plus" />发布新任务</Button>}
            >
              {posts.length !== 0 ?
                <Tasker {...postProps} {...actionProps}/> : 
                <div><Icon type="smile-o" />暂无需管理的任务</div>
              }
            </Card>
          </Col>
        </Row>}
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
        </Row>
      </div>
  );
}

function mapStateToProps(state) {
  return {
    task: state.task,
    loading: state.loading.models.task,
  };
}

export default connect(mapStateToProps)(Tasks);
