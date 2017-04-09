import React, { PropTypes } from 'react'
import { Link } from 'dva/router'
import { Collapse, Timeline, Icon, Tooltip, Popover, Tag, Progress, Steps, Row, Col } from 'antd'
import TaskEditer from './edit/task'
import Steper from './steps'

const todos = [
  {
    id: 1,
    name: 'demo',
    intro: 'this is a notice demo',
    poster: 'admin',
  },{
    id: 2,
    name: 'demo2',
    intro: 'this is a notice demo2',
    poster: 'admin',
  },{
    id: 3,
    name: 'demo3',
    intro: 'this is a notice demo3',
    poster: 'admin',
  },
];

const getDoer = function(userArray) {
  if(userArray.length != 0){
      return userArray.map(item => (
        <Tag color="cyan" key={item.id}>{item.name}</Tag>
      )
    )
  }
};

const getFile = function(fileArray) {
  if(fileArray.length != 0){
      return fileArray.map(item => (
        <Tag key={item.id} color="purple"><a href={item.url} target="_blank">{item.name}</a></Tag>
      )
    )
  }
};

const getStep = function(stepArray) {
  if(stepArray.length != 0){
      return stepArray.map(item => {
        if(item.status === 9) {
          return (
            <Tag key={item.id} color="green">{item.name}</Tag>
          );
        } else {
          return (
            <Tag key={item.id} color="blue">{item.name}</Tag>
          );
        }
      }
    )
  }
};

const getPercent = function(stepArray) {
  if(stepArray.length != 0){
    let done = 0;
    stepArray.map(item => {
      if(item.status === 9){
        done ++;  
        }
      }
    );
    return (done/stepArray.length)*100;
  }
};

const getStepLine = function(stepArray, onStepChose, onStepDone, onStepRedo, loginUser) {
  if(stepArray.length != 0){
    return stepArray.map(item => (
        <Timeline.Item key={item.id} dot={item.status === 9? <Icon type="check-circle-o"  style={{ fontSize: 16 }}/>:'' } color={item.status >= 5? 'green':'blue'}>
          <p>
            <b>{item.name}</b>
            <span className="fr">
              {(item.user_id === null || item.user_id === '') ?
                <Tooltip title="点击执行该流程">
                  <Icon type="star-o" className="actionIcon success" onClick={(e)=>onStepChose(item.id)} />
                </Tooltip> :
                item.user_id === loginUser.id && 
                (item.status !== 9 ? 
                <Tooltip title="点击标记为完成">
                  <Icon type="check" className="actionIcon success" onClick={(e)=>onStepDone(item.id)} />
                </Tooltip> :
                <Tooltip title="点击标记为完成">
                  <Icon type="rollback" className="actionIcon warning" onClick={(e)=>onStepRedo(item.id)} />
                </Tooltip>)
              }
            </span>                         
          </p>
        </Timeline.Item>
      )
    )
  }
}


const getItem = function(taskArray, type, link, onDone, onRedo, onCheck, onDelete, onEdit, onStepChose, onStepDone, onStepRedo, loginUser) {
  link = link+'/';
  if(taskArray.length != 0){
    return taskArray.map((item, index) => {
      const stepProps = {
        steps: item.steps,
        loginUser,
        onStepDone: (e) => onStepDone(),
        onStepRedo: (e) => onStepRedo(),
        onStepChose: (e) => onStepChose(),
      };
      if(type === 'todos') {
        return (
          <Collapse.Panel header={item.name} key={index}>
            <Row gutter={16}>
              <Col span={12}>
                <div>发布人：<Tag color="orange-inverse">{item.poster.name}</Tag></div>
                <p>任务简述：{item.intro}</p>
                <div>相关人员：{getDoer(item.users)}</div>
                <p>最后期限：{item.deadline}</p>
                <div>相关文件：{getFile(item.files)}</div>
              </Col>
              <Col span={12}>
                <Timeline>   
                  {getStepLine(item.steps, onStepChose, onStepDone, onStepRedo, loginUser)}
                </Timeline>
              </Col>
            </Row>
          </Collapse.Panel>
        )
      } else if(type === 'dones'){
        return (
          <Timeline.Item key={item.id} dot={item.status === 9? <Icon type="check-circle-o"  style={{ fontSize: 16 }}/>:'' } color={item.status >= 5? 'green':'blue'}>
            <p>
              <b><Link to={link+ item.id}>{item.name}</Link></b> 
              <span className="fr"> 
                <Tooltip title="点击重做">
                  <Icon type="rollback" className="actionIcon warning" onClick={(e)=>onRedo(item.id)} />
                </Tooltip>  
              </span>          
            </p>
            <p>{item.intro}</p>
            <p>最后期限：{item.deadline}</p>
            <p>最近修改：{item.updated_at}</p>
            <p className="txtr">发布人:<i>{item.poster.name}</i> | <Icon type="clock-circle-o" /><i>{item.created_at}</i></p>
          </Timeline.Item>
        )
      } else if(type === 'posts'){
        return (
          <Timeline.Item key={item.id} dot={item.status === 9? <Icon type="check-circle-o"  style={{ fontSize: 16 }}/>:'' } color={item.status >= 5? 'green':'blue'}>
            <h2>
             {item.name}
              <span className="fr"> 
                {(item.status !== 9 && getPercent(item.steps) === 100) &&
                <Tooltip title="点击确认验收">
                  <Icon type="check" className="actionIcon success" onClick={(e)=>onCheck(item.id)} />
                </Tooltip> }
                {item.status >= 5 && 
                <Tooltip title="点击要求重做">
                  <Icon type="rollback" className="actionIcon warning" onClick={(e)=>onRedo(item.id)} />
                </Tooltip> }
                <Tooltip title="点击编辑">
                  <Icon type="edit" className="actionIcon info" onClick={(e)=>onEdit(item)} />
                </Tooltip> 
                <Tooltip title="点击删除">
                  <Icon type="close" className="actionIcon danger" onClick={(e)=>onDelete(item.id)} />
                </Tooltip>
              </span> 
            </h2>
            <Row gutter={16}>
              <Col span={18}>
                <p>任务简述：{item.intro}</p>
                <div>
                  执行者：{getDoer(item.users)}
                </div>
                <p>最后期限：{item.deadline}</p>
                <div>相关文件：{getFile(item.files)}</div>
              </Col>
              <Col span={6}>
                {item.status !== 9 && 
                  <Popover content={
                      getStep(item.steps)
                    } title="任务流程现况">
                    <Progress type="circle" percent={getPercent(item.steps)} width={70} />
                  </Popover>
                }
              </Col>
            </Row>
            <p className="txtr"><Icon type="clock-circle-o" />发布时间:<i>{item.created_at}</i></p>
          </Timeline.Item>
        )
      }
    })
  }
};

function Tasker({loginUser, content, type, link, onDone, onRedo, onCheck, onDelete, onEdit,  onStepChose, onStepDone, onStepRedo}) {
  link = link || '/'+type;
  const demo = getItem(content, type, link, onDone, onRedo, onCheck, onDelete, onEdit, onStepChose, onStepDone, onStepRedo, loginUser);
  switch(type){
    case 'todos':return (
        <Collapse defaultActiveKey={['0']}>
          {demo}
        </Collapse>
    );
    case 'posts':return (
        <Timeline>
          {demo}
        </Timeline>
    );
  }
  
}

Tasker.propTypes = {
//  title: PropTypes.string.isRequired,
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
//  link: PropTypes.string,
//  extra: PropTypes.element,
}

export default Tasker