import React, { PropTypes } from 'react'
import { Link } from 'dva/router'
import { Timeline, Icon } from 'antd'

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

const getItem = function(timelineArray, type, link) {
  link = link || '/'+type+'/';
  return timelineArray.map(item => {
    if(type === 'todos') {
      return (
        <Timeline.Item key={item.id} color={item.status === 1? 'green':'blue'}>
          <p><b><Link to={link+ item.id}>{item.name}</Link></b></p>
          <p>{item.intro}</p>
          <p>最后期限：{item.deadline}</p>
          <p className="txtr"><Icon type="user" /><i>{item.poster}</i> | <Icon type="clock-circle-o" /><i>{item.created_at}</i></p>
        </Timeline.Item>
      )
    }
  })
};

function Timeliner({content, type, link}) {
  type = type || 'todos';
  content = content || todos;
  const demo = getItem(content, type, link);
  return (
    <Timeline>
      {demo}
    </Timeline>
  );
}

export default Timeliner