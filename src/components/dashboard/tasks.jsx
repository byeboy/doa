import React, { PropTypes } from 'react'
import { Link } from 'dva/router'
import { Card, Timeline, Icon } from 'antd'

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
  link = link+'/';
  return timelineArray.map(item => {
    if(type === 'tasks') {
      return (
        <Timeline.Item key={item.id} dot={item.status === 9? <Icon type="check-circle-o"  style={{ fontSize: 16 }}/>:'' } color={item.status >= 1? 'green':'blue'}>
          <p><b><Link to={link+ item.id}>{item.name}</Link></b></p>
          <p>{item.intro}</p>
          <p>最后期限：{item.deadline}</p>
          <p className="txtr"><Icon type="user" /><i>{item.poster}</i> | <Icon type="clock-circle-o" /><i>{item.created_at}</i></p>
        </Timeline.Item>
      )
    }
  })
};

function Tasker({title, content, type, link}) {
  type = type || 'tasks';
  link = link || '/'+type;
  content = content || todos;
  const demo = getItem(content, type, link);
  return (
    <Card title={<b><Icon type="solution" />{title || '测试Demo'}</b>}
       extra={<Link to={link}><Icon type="link"/>查看更多</Link>}
     >
      <Timeline>
        {demo}
      </Timeline>
    </Card>
  );
}

Tasker.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.array,
  type: PropTypes.string.isRequired,
  link: PropTypes.string,
}

export default Tasker