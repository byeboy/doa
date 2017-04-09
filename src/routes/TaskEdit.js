import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, Row, Col, Popconfirm, Tree, InputNumber, Cascader } from 'antd';
class TaskEdit extends Component{
  constructor(props) {
    super(props);
  
    this.state = {
      plan: [{
        key: 'models',
        title: '车型',
        data: [{
          id: 1,
          name: 'test'
        }],
      }],
    };
  }
  hideEdit() {
    this.props.dispatch({
      type: 'task/hideModal2Edit',
    });
  }
  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }
  onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  }
  onChange = (value, selectedOptions) => {
    console.log(value)
    console.log(selectedOptions)
    if(this.state.plan.filter(p => p.key === selectedOptions[0].value).length === 0){
      this.state.plan.push({
        key: selectedOptions[0].value,
        title: selectedOptions[0].label,
        data: [
          {...selectedOptions[1]},
        ]
      });
    } else {
      this.state.plan.map(p => {
        if(p.key === selectedOptions[0].value) {
          console.log(p)
          const v = p.data.filter(pd => pd.id === selectedOptions[1].id);
          console.log('v',v)
          if(v.length === 0) {
            console.log(0)
            p.data.push(selectedOptions[1]);
          }
        }
      });
    }
    this.setState({plan: this.state.plan});
  }
  onDelete = (upKey, id) => {
    let newPlan = this.state.plan;
    newPlan.map(p => {
      if(p.key === upKey) {
        p.data = p.data.filter(pd => pd.id !== id);
        // return p.data = newData;
      }
    });
    newPlan = newPlan.filter(np => np.data.length !== 0);
    this.setState({
      plan: newPlan,
    });
  }
  /*loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    // load options lazily
    setTimeout(() => {
      targetOption.loading = false;
      targetOption.children = [{
        label: `${targetOption.label} Dynamic 1`,
        value: 'dynamic1',
        id: 2,
        name: 'test1',
      }, {
        label: `${targetOption.label} Dynamic 2`,
        value: 'dynamic2',
        id: 3,
        name: `${targetOption.label} Dynamic 2`,
      }];
      this.setState({
        options: [...this.state.options],
      });
    }, 1000);
  }*/
  loadData = (selectedOptions) => {
    this.props.dispatch({
      type: 'task/getOpts',
      payload: {
        type: selectedOptions[0].value
      },
    })
  }
  render() {
    console.log(this.props)
    const { loginUser, users, todos, dones, posts, modal2Edit, item2Edit, current, loading2Modal, proOpts, optLoading } = this.props;
    return (
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Card title={item2Edit.id === null ? <b><Icon type="plus"/>新增任务</b> : <b><Icon type="edit"/>编辑任务</b>}
            extra={
              <Popconfirm title="确认放弃相关操作?" onConfirm={() => this.hideEdit} okText="确定" cancelText="取消">
                <Button type="danger">放弃编辑</Button>
              </Popconfirm>
            }
          >
            <Tree
              showLine
              defaultExpandAll
            >
              <Tree.TreeNode title="生产列表" key="products">
                {this._renderPlanTree()}
              </Tree.TreeNode>
            </Tree>

            <Cascader 
              options={proOpts} 
              onChange={this.onChange}
              loadData={this.loadData}
            >
              <a href="#">添加产品</a>
            </Cascader>
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
          数量:<InputNumber size="small" min={1}defaultValue={3} /> &nbsp; | &nbsp;
          <Popconfirm title="确认删除?" onConfirm={() => this.onDelete(upKey, prc.id)} okText="确定" cancelText="取消">
            <span style={{color: 'red'}}>删除</span>
          </Popconfirm>
        </div>
      } key={upKey+prc.id.toString()}>

      </Tree.TreeNode>  
    ));
  }
}

function mapStateToProps(state) {
  return {
    task: state.task,
    loading: state.loading.models.task,
  };
}

export default connect(mapStateToProps)(TaskEdit);
