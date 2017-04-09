import React, { Component } from 'react'
import { Collapse, Timeline, Icon, Badge, Button, Tooltip, Popover, Tag, Progress, Steps, Row, Col, Slider, InputNumber } from 'antd'

const getDoer = (userArray) => {
  if(userArray.length != 0){
      return userArray.map(item => item.name);
  }
};

const getFile = (fileArray) => {
  if(fileArray.length != 0){
      return fileArray.map(item => (
        <Tag key={item.id} color="purple"><a href={item.url} target="_blank">{item.name}</a></Tag>
      )
    )
  }
};

const getStepLine = (task, onProgressPatch, loginUser) => {
  const tlItems = [];
  if(task.parts.length !== 0){
    task.parts.map(item => {
      const tli = (
        <Timeline.Item key={'parts,' + item.id} 
        dot={item.pivot.done_count === item.pivot.plan_count ? 
          <Icon type="check-circle-o" style={{ fontSize: 16 }}/>:
          <Badge status="processing" />}
        >
          <div>
              {item.name}
                <Row>
                  <Col span={16}>
                    <Slider min={0} max={item.pivot.plan_count} defaultValue={item.pivot.done_count}/>
                  </Col>
                </Row>
            </div>
        </Timeline.Item>
      );
      tlItems.push(tli);
    });
  }
  if(task.fans.length !== 0){
    task.fans.map(item => {
      const tli = (
        <Timeline.Item key={'fans,' + item.id} 
        dot={item.pivot.done_count === item.pivot.plan_count ? 
          <Icon type="check-circle-o" style={{ fontSize: 16 }}/>:
          <Badge status="processing" />}
        >
          <div>
            {item.name}
              <Row>
                <Col span={16}>
                  <Slider min={0} max={item.pivot.plan_count} defaultValue={item.pivot.done_count} />
                </Col>
              </Row>
          </div>
        </Timeline.Item>
      );
      tlItems.push(tli);
    });
  }
  if(task.cabinets.length !== 0){
    task.cabinets.map(item => {
      const tli = (
        <Timeline.Item key={'cabinets,' + item.id} 
        dot={item.pivot.done_count === item.pivot.plan_count ? 
          <Icon type="check-circle-o" style={{ fontSize: 16 }}/>:
          <Badge status="processing" />}
        >
          <div>
              {item.name}
                <Row>
                  <Col span={16}>
                    <Slider min={0} max={item.pivot.plan_count} defaultValue={item.pivot.done_count} />
                  </Col>
                </Row>
            </div>
        </Timeline.Item>
      );
      tlItems.push(tli);
    });
  }
  if(task.models.length !== 0){
    task.models.map(item => {
      const tli = (
        <Timeline.Item key={'models,' + item.id} 
        dot={item.pivot.done_count === item.pivot.plan_count ? 
          <Icon type="check-circle-o" style={{ fontSize: 16 }}/>:
          <Badge status="processing" />}
        >
            <div>
              {item.name}
                <Row>
                  <Col span={16}>
                    <Slider min={0} max={item.pivot.plan_count} defaultValue={item.pivot.done_count} />
                  </Col>
                </Row>
            </div>
        </Timeline.Item>
      );
      tlItems.push(tli);
    });
  }
  return tlItems;
}

const getItem = (data, type, onDone, onRedo, onCheck, onDelete, onEdit, onProgressPatch, loginUser) => {
  if(data.length !== 0){
    return data.map((item, index) => {
      switch(type){
        case 'todos': {
          return (
            <Collapse.Panel header={item.name} key={index}>
              <Row gutter={16}>
                <Col span={24}>
                  <div>
                    <Tag color="#87d068">发布人：{item.poster.name}</Tag>
                    <Tag color="#2db7f5">监管人员：{getDoer(item.users)}</Tag>
                    <Tag color="#f50">最后期限：{item.deadline}</Tag>
                  </div>
                </Col>
                <Col span={24} style={{marginTop: 20}}>
                  <Timeline>   
                    {getStepLine(item, onProgressPatch, loginUser)}
                  </Timeline>
                </Col>
              </Row>
            </Collapse.Panel>);
        };
        case 'dones': {

        };
        case 'posts': {

        };
        default: return;
      }
    })
  }
}

class Todo extends Component{
  constructor(props) {
    super(props);
  
    this.state = {
      progress: [],
    };
  }
  patchProgress(upId){
    const values = this.state.progress.filter(p => p.upId === upId);
    if(values.length !== 0 && values[0].progress.length !== 0){
      this.props.onProgressPatch({
        id: upId,
        progress: values[0]
      });
      // console.log(values[0])
    }
  }
  render(){
    return (
      <Collapse bordered={false} defaultActiveKey={[]}>
        {this._renderItem()}
      </Collapse>
    )
  }
  _renderItem(){
    const {data, onProgressPatch, onDownloadZip, loginUser} = this.props;
    if(data.length !== 0){
      return data.map((item, index) => {
        switch(type){
          case 'todos': {
            return (
              <Collapse.Panel 
                header={
                  <Row>
                    <Col span={12}>
                      {item.name}
                    </Col>
                    <Col span={12}>
                      <Progress percent={item.progress} status="active" />
                    </Col>
                  </Row>
                }
                key={index}
              >
                <Row gutter={16}>
                  <Col span={18}>
                    <div>
                      <Tag color="#87d068">发布人：{item.poster.name}</Tag>
                      <Tag color="#2db7f5">监管人员：{getDoer(item.users)}</Tag>
                      <Tag color="#f50">最后期限：{item.deadline}</Tag>
                    </div>
                  </Col>
                  <Col span={3}>
                    <Button type="primary" 
                      disabled={this._disable2Button(item.id)}
                      onClick={() => this.patchProgress(item.id)}
                    >保存进度</Button>
                  </Col>
                  <Col span={3}>
                    <a href={"http://oa.app/zip/tasks/"+item.id} download="filename.zip">下载任务文件</a>
                    {/*<Button type="default" 
                                          onClick={() => onDownloadZip(item.id)}
                                        ></Button>*/}
                  </Col>
                  <Col span={24} style={{marginTop: 20}}>
                    <Timeline>   
                      {this._renderStep(item, loginUser)}
                    </Timeline>
                  </Col>
                </Row>
              </Collapse.Panel>);
          };
          case 'dones': {

          };
          default: return;
        }
      })
    }
  }
  _renderStep(task, loginUser){
    const tlItems = [];
    console.log('step', task)
    if(task.parts.length !== 0){
      task.parts.map(item => {
        const tli = (
          <Timeline.Item key={'parts,' + item.id} 
          dot={item.pivot.done_count === item.pivot.plan_count ? 
            <Icon type="check-circle-o" style={{ fontSize: 16 }}/>:
            <Badge status="processing" />}
          >
            <div>
                {item.name} &nbsp; (计划生产数量:{item.pivot.plan_count})
                  <Row>
                    <Col span={16}>
                      <Slider min={0} max={item.pivot.plan_count} defaultValue={item.pivot.done_count}
                        onChange={(e) => this._onStepChange(task.id, 'parts', item.id, e, item.pivot.done_count)}
                        disabled={loginUser.id === task.poster_id}
                      />
                    </Col>
                  </Row>
              </div>
          </Timeline.Item>
        );
        tlItems.push(tli);
      });
    }
    if(task.fans.length !== 0){
      task.fans.map(item => {
        const tli = (
          <Timeline.Item key={'fans,' + item.id} 
          dot={item.pivot.done_count === item.pivot.plan_count ? 
            <Icon type="check-circle-o" style={{ fontSize: 16 }}/>:
            <Badge status="processing" />}
          >
            <div>
              {item.name} &nbsp; (计划生产数量:{item.pivot.plan_count})
                <Row>
                  <Col span={16}>
                    <Slider min={0} max={item.pivot.plan_count} defaultValue={item.pivot.done_count} 
                      onChange={(e) => this._onStepChange(task.id, 'fans', item.id, e, item.pivot.done_count)}
                      disabled={loginUser.id === task.poster_id}
                    />
                  </Col>
                </Row>
            </div>
          </Timeline.Item>
        );
        tlItems.push(tli);
      });
    }
    if(task.cabinets.length !== 0){
      task.cabinets.map(item => {
        const tli = (
          <Timeline.Item key={'cabinets,' + item.id} 
          dot={item.pivot.done_count === item.pivot.plan_count ? 
            <Icon type="check-circle-o" style={{ fontSize: 16 }}/>:
            <Badge status="processing" />}
          >
            <div>
                {item.name} &nbsp; (计划生产数量:{item.pivot.plan_count})
                  <Row>
                    <Col span={16}>
                      <Slider min={0} max={item.pivot.plan_count} defaultValue={item.pivot.done_count} 
                        onChange={(e) => this._onStepChange(task.id, 'cabinets', item.id, e, item.pivot.done_count)}
                        disabled={loginUser.id === task.poster_id}
                      />
                    </Col>
                  </Row>
              </div>
          </Timeline.Item>
        );
        tlItems.push(tli);
      });
    }
    if(task.models.length !== 0){
      task.models.map(item => {
        const tli = (
          <Timeline.Item key={'models,' + item.id} 
          dot={item.pivot.done_count === item.pivot.plan_count ? 
            <Icon type="check-circle-o" style={{ fontSize: 16 }}/>:
            <Badge status="processing" />}
          >
              <div>
                {item.name} &nbsp; (计划生产数量:{item.pivot.plan_count})
                  <Row>
                    <Col span={16}>
                      <Slider min={0} max={item.pivot.plan_count} defaultValue={item.pivot.done_count} 
                        onChange={(e) => this._onStepChange(task.id, 'models', item.id, e, item.pivot.done_count)}
                        disabled={loginUser.id === task.poster_id}
                      />
                    </Col>
                  </Row>
              </div>
          </Timeline.Item>
        );
        tlItems.push(tli);
      });
    }
    return tlItems;
  }
  _onStepChange(upId, type, id, newDone, oldDone){
    let newProgress = [];
    const i = this.state.progress.filter(pr => pr.upId === upId);
    // 以对象形式存储progress，[type]:...
    /*if(i.length === 0){
      newProgress = [
        ...this.state.progress,
        {
          upId,
          progress: {
            [type]: [{
              id,
              newDone,
            }]
          }
        }
      ];
    } else {
      if(typeof(i[0].progress[type]) === "undefined"){
        i[0].progress = {
          ...i[0].progress,
          [type]: [{
            id,
            newDone,
          }]
        }
      } else {
        const ii = i[0].progress[type].filter(ipt => ipt.id === id);
        if(ii.length === 0){
          i[0].progress[type].push({
            id,
            newDone,
          })
        } else if(newDone !== oldDone){
          i[0].progress[type].map(ipt => {
            if(ipt.id === id){
              return ipt.newDone = newDone;
            }
          })
        } else{
          i[0].progress[type] = i[0].progress[type].filter(ipt => ipt.id !== id);
        }
      }
      const iii = this.state.progress.filter(pr => pr.upId !== upId);
      newProgress = [
        ...iii,
        i[0],
      ]
    }*/
    // 以数组形式存储progress，[{type,...}]
    if(i.length === 0){
      newProgress = [
        ...this.state.progress,
        {
          upId,
          progress: [{
            type,
            id,
            newDone,
          }]
        }
      ];
    } else {
      const ii = i[0].progress.filter(iP => (iP.type === type && iP.id === id));
      if(ii.length === 0){
        i[0].progress.push({
          type,
          id,
          newDone,
        })
      } else if(newDone !== oldDone){
        i[0].progress.map(iP => {
          if(iP.type === type && iP.id === id){
            return iP.newDone = newDone;
          }
        })
      } else {
        // i.progress.splice(index, 1);
        i[0].progress = i[0].progress.filter(iP => (iP.type !== type || iP.id !== id))
      }
      const iii = this.state.progress.filter(pr => pr.upId !== upId);
      newProgress = [
        ...iii,
        i[0],
      ]
    }
    this.setState({
      progress: newProgress,
    })
  }
  _disable2Button(upId){
    let rst = true;
    const i = this.state.progress.filter(p => p.upId === upId);
    if(i.length !== 0 && i[0].progress.length !== 0){
      rst = false;
    }
    return rst;
  }
}

class Done extends Component{
  constructor(props) {
    super(props);
  
    this.state = {};
  }
  render(){
    return (
      <Collapse bordered={false} defaultActiveKey={[]}>
        {this._renderItem()}
      </Collapse>
    )
  }
  _renderItem(){
    const {data, onCheck, onDownloadZip, loginUser} = this.props;
    if(data.length !== 0){
      return data.map((item, index) => (
        <Collapse.Panel 
          header={
            <Row>
              <Col span={12}>
                {item.name}
              </Col>
              <Col span={12}>
                <Progress percent={item.progress} status="active" />
              </Col>
            </Row>
          }
          key={index}
          style={{
            background: '#f7f7f7',
            borderRadius: 4,
            marginBottom: 24,
            border: 0,
          }}
        >
          <Row gutter={16}>
            <Col span={18}>
              <div>
                <Tag color="#2db7f5">监管人员：{getDoer(item.users)}</Tag>
                <Tag color="#f50">最后期限：{item.deadline}</Tag>
              </div>
            </Col>
            <Col span={6}>
              <a href={"http://oa.app/zip/tasks/"+item.id} download="filename.zip">下载任务文件</a>
              {/*<Button type="default" 
                                    onClick={() => onDownloadZip(item.id)}
                                  ></Button>*/}
            </Col>
            <Col span={24} style={{marginTop: 20}}> 
              {this._renderStep(item, loginUser)}
            </Col>
          </Row>
        </Collapse.Panel>)
      )
    }
  }
  _renderStep(task, loginUser){
    const tlItems = [];
    if(task.parts.length !== 0){
      task.parts.map(item => {
        const tli = (
          <Row key={'parts,' + item.id}>
            <Col span={16}>
              <Tag color="#FF8000">
                {item.name}
              </Tag>
              <Badge status={item.pivot.done_count !== item.pivot.plan_count ? 'processing' : 'success'} 
                text={'已完成'+item.pivot.done_count+'件，计划生产'+item.pivot.plan_count+'件'}
              />
            </Col>
            <Col span={8}>
              <Slider min={0} max={item.pivot.plan_count} defaultValue={item.pivot.done_count}
                disabled={loginUser.id === task.poster_id}
              />
            </Col>
          </Row>
        );
        tlItems.push(tli);
      });
    }
    if(task.fans.length !== 0){
      task.fans.map(item => {
        const tli = (
          <Row key={'fans,' + item.id}>
            <Col span={16}>
              <Tag color="#FF8000">
                {item.name}
              </Tag>
              <Badge status={item.pivot.done_count !== item.pivot.plan_count ? 'processing' : 'success'} 
                text={'已完成'+item.pivot.done_count+'件，计划生产'+item.pivot.plan_count+'件'}
              />
            </Col>
            <Col span={8}>
              <Slider min={0} max={item.pivot.plan_count} defaultValue={item.pivot.done_count}
                disabled={loginUser.id === task.poster_id}
              />
            </Col>
          </Row>
        );
        tlItems.push(tli);
      });
    }
    if(task.cabinets.length !== 0){
      task.cabinets.map(item => {
        const tli = (
          <Row key={'cabinets,' + item.id}>
            <Col span={16}>
              <Tag color="#FF8000">
                {item.name}
              </Tag>
              <Badge status={item.pivot.done_count !== item.pivot.plan_count ? 'processing' : 'success'} 
                text={'已完成'+item.pivot.done_count+'件，计划生产'+item.pivot.plan_count+'件'}
              />
            </Col>
            <Col span={8}>
              <Slider min={0} max={item.pivot.plan_count} defaultValue={item.pivot.done_count}
                disabled={loginUser.id === task.poster_id}
              />
            </Col>
          </Row>
        );
        tlItems.push(tli);
      });
    }
    if(task.models.length !== 0){
      task.models.map(item => {
        const tli = (
          <Row key={'models,' + item.id}>
            <Col span={16}>
              <Tag color="#FF8000">
                {item.name}
              </Tag>
              <Badge status={item.pivot.done_count !== item.pivot.plan_count ? 'processing' : 'success'} 
                text={'已完成'+item.pivot.done_count+'件，计划生产'+item.pivot.plan_count+'件'}
              />
            </Col>
            <Col span={8}>
              <Slider min={0} max={item.pivot.plan_count} defaultValue={item.pivot.done_count}
                disabled={loginUser.id === task.poster_id}
              />
            </Col>
          </Row>
        );
        tlItems.push(tli);
      });
    }
    return tlItems;
  }
}

class Post extends Component{
  constructor(props) {
    super(props);
  
    this.state = {};
  }
  render(){
    return (
      <Collapse bordered={false} defaultActiveKey={[]}>
        {this._renderItem()}
      </Collapse>
    )
  }
  _renderItem(){
    const {data, onDelete, onEdit, onCheck, onDownloadZip, loginUser} = this.props;
    if(data.length !== 0){
      return data.map((item, index) => (
        <Collapse.Panel 
          header={
            <Row>
              <Col span={12}>
                {item.name}
              </Col>
              <Col span={12}>
                <Progress percent={item.progress} status="active" />
              </Col>
            </Row>
          }
          key={index}
          style={{
            background: '#f7f7f7',
            borderRadius: 4,
            marginBottom: 24,
            border: 0,
          }}
        >
          <Row gutter={16}>
            <Col span={18}>
              <div>
                <Tag color="#2db7f5">监管人员：{getDoer(item.users)}</Tag>
                <Tag color="#f50">最后期限：{item.deadline}</Tag>
              </div>
            </Col>
            <Col span={6}>
              <a href={"http://oa.app/zip/tasks/"+item.id} download="filename.zip">下载任务文件</a>
              {/*<Button type="default" 
                                    onClick={() => onDownloadZip(item.id)}
                                  ></Button>*/}
            </Col>
            <Col span={24} style={{marginTop: 20}}> 
              {this._renderStep(item, loginUser)}
            </Col>
          </Row>
        </Collapse.Panel>)
      )
    }
  }
  _renderStep(task, loginUser){
    const tlItems = [];
    if(task.parts.length !== 0){
      task.parts.map(item => {
        const tli = (
          <Row key={'parts,' + item.id}>
            <Col span={16}>
              <Tag color="#FF8000">
                {item.name}
              </Tag>
              <Badge status={item.pivot.done_count !== item.pivot.plan_count ? 'processing' : 'success'} 
                text={'已完成'+item.pivot.done_count+'件，计划生产'+item.pivot.plan_count+'件'}
              />
            </Col>
            <Col span={8}>
              <Slider min={0} max={item.pivot.plan_count} defaultValue={item.pivot.done_count}
                disabled={loginUser.id === task.poster_id}
              />
            </Col>
          </Row>
        );
        tlItems.push(tli);
      });
    }
    if(task.fans.length !== 0){
      task.fans.map(item => {
        const tli = (
          <Row key={'fans,' + item.id}>
            <Col span={16}>
              <Tag color="#FF8000">
                {item.name}
              </Tag>
              <Badge status={item.pivot.done_count !== item.pivot.plan_count ? 'processing' : 'success'} 
                text={'已完成'+item.pivot.done_count+'件，计划生产'+item.pivot.plan_count+'件'}
              />
            </Col>
            <Col span={8}>
              <Slider min={0} max={item.pivot.plan_count} defaultValue={item.pivot.done_count}
                disabled={loginUser.id === task.poster_id}
              />
            </Col>
          </Row>
        );
        tlItems.push(tli);
      });
    }
    if(task.cabinets.length !== 0){
      task.cabinets.map(item => {
        const tli = (
          <Row key={'cabinets,' + item.id}>
            <Col span={16}>
              <Tag color="#FF8000">
                {item.name}
              </Tag>
              <Badge status={item.pivot.done_count !== item.pivot.plan_count ? 'processing' : 'success'} 
                text={'已完成'+item.pivot.done_count+'件，计划生产'+item.pivot.plan_count+'件'}
              />
            </Col>
            <Col span={8}>
              <Slider min={0} max={item.pivot.plan_count} defaultValue={item.pivot.done_count}
                disabled={loginUser.id === task.poster_id}
              />
            </Col>
          </Row>
        );
        tlItems.push(tli);
      });
    }
    if(task.models.length !== 0){
      task.models.map(item => {
        const tli = (
          <Row key={'models,' + item.id}>
            <Col span={16}>
              <Tag color="#FF8000">
                {item.name}
              </Tag>
              <Badge status={item.pivot.done_count !== item.pivot.plan_count ? 'processing' : 'success'} 
                text={'已完成'+item.pivot.done_count+'件，计划生产'+item.pivot.plan_count+'件'}
              />
            </Col>
            <Col span={8}>
              <Slider min={0} max={item.pivot.plan_count} defaultValue={item.pivot.done_count}
                disabled={loginUser.id === task.poster_id}
              />
            </Col>
          </Row>
        );
        tlItems.push(tli);
      });
    }
    return tlItems;
  }
}

function Tasker({loginUser, data, type, onDone, onRedo, onCheck, onDelete, onEdit, onProgressPatch, onDownloadZip}) {
  // const demo = getItem(data, type, onDone, onRedo, onCheck, onDelete, onEdit, onProgressPatch, loginUser);
  const todoProps = {data, onProgressPatch, onDownloadZip, loginUser};
  const postProps = {data, onDelete, onEdit, onCheck, onDownloadZip, loginUser};
  const doneProps = {data, onCheck, onDownloadZip, loginUser};
  switch(type){
    case 'todos':
      return (
        <Todo {...todoProps}/> 
      );
      break;
    case 'dones':
      return (
        <Done {...doneProps}/> 
      );
      break;
    case 'posts':
      return (
        <Post {...postProps}/> 
      );
      break;
    default: return;
  }
  
}

Tasker.propTypes = {
  /*title: PropTypes.string.isRequired,
  content: PropTypes.array,
  type: PropTypes.string.isRequired,
  onDone: PropTypes.func.isRequired, 
  onRedo: PropTypes.func.isRequired, 
  onCheck: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onStepDone: PropTypes.func.isRequired, 
  onStepRedo: PropTypes.func.isRequired, 
  onStepChose: PropTypes.func.isRequired,
  link: PropTypes.string,
  extra: PropTypes.element,*/
}

export default Tasker