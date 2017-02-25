import React, { PropTypes } from 'react'
import { Link } from 'dva/router'
import { Timeline, Icon, Tooltip } from 'antd'
import TaskEditer from './edit/task'

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
        <span key={item.id} className="doer">{item.name}</span>
      )
    )
  }
};

const getItem = function(taskArray, type, link, onDone, onRedo, onCheck, onDelete, onEdit) {
  link = link+'/';
  if(taskArray.length != 0){
    return taskArray.map(item => {
      if(type === 'todos') {
        return (
          <Timeline.Item key={item.id} dot={item.status === 9? <Icon type="check-circle-o"  style={{ fontSize: 16 }}/>:'' } color={item.status >= 5? 'green':'blue'}>
            <p>
              <b><Link to={link+ item.id}>{item.name}</Link></b>
              <span className="fr">
                <Tooltip title="点击标记为完成">
                  <Icon type="check" className="actionIcon success" onClick={(e)=>onDone(item.id)} />
                </Tooltip> 
              </span>                         
            </p>
            <p>{item.intro}</p>
            <p>最后期限：{item.deadline}</p>
            <p>最近修改：{item.updated_at}</p>
            <p className="txtr">发布人:<i>{item.poster.name}</i> | <Icon type="clock-circle-o" /><i>{item.created_at}</i></p>
          </Timeline.Item>
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
            <p>
              <b><Link to={link+ item.id}>{item.name}</Link></b> 
              <span className="fr"> 
                {item.status !== 9 &&
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
            </p>
            <p>{item.intro}</p>
            <p>
              执行者：{getDoer(item.users)}
            </p>
            <p>最后期限：{item.deadline}</p>
            <p>最近修改：{item.updated_at}</p>
            <p className="txtr"><Icon type="clock-circle-o" /><i>{item.created_at}</i></p>
          </Timeline.Item>
        )
      }
    })
  }
};

function Tasker({content, type, link, onDone, onRedo, onCheck, onDelete, onEdit}) {
  link = link || '/'+type;
  const demo = getItem(content, type, link, onDone, onRedo, onCheck, onDelete, onEdit);
  return (
      <Timeline>
        {demo || '暂无相关任务'}
      </Timeline>
  );
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
//  link: PropTypes.string,
//  extra: PropTypes.element,
}

export default Tasker