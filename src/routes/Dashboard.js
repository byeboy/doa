import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Row, Col, Carousel, Card, Timeline } from 'antd';
import Noticer from '../components/dashboard/notices';
import Tasker from '../components/dashboard/tasks';
import Carder from '../components/card';

const noticesProps = {
  content: [
    {
      id: 1,
      title: 'demo4',
      content: 'this is a notice demo',
      publisher: 'admin',
    },{
      id: 2,
      title: 'demo5',
      content: 'this is a notice demo2',
      publisher: 'admin',
    },{
      id: 3,
      title: 'demo6',
      content: 'this is a notice demo3',
      publisher: 'admin',
    },
  ],
  type: 'notices',
  link: '/notices',
  vertical: true,
}

const todoProps = {
  title:'待办事项',
  content: [
    {
      id: 1,
      name: 'demo',
      intro: 'this is a notice demo',
      poster: 'admin',
      status: 0
    },{
      id: 2,
      name: 'demo2',
      intro: 'this is a notice demo2',
      poster: 'admin',
      status: 0
    },{
      id: 3,
      name: 'demo3',
      intro: 'this is a notice demo3',
      poster: 'admin',
      status: 0
    },
  ],
  type: 'tasks',
}

const doneProps = {
  title:'已完成',
  content: [
    {
      id: 1,
      name: 'demo',
      intro: 'this is a notice demo',
      poster: 'admin',
      status: 2
    },{
      id: 2,
      name: 'demo2',
      intro: 'this is a notice demo2',
      poster: 'admin',
      status: 9
    },{
      id: 3,
      name: 'demo3',
      intro: 'this is a notice demo3',
      poster: 'admin',
      status: 9
    },
  ],
  type: 'tasks',
}

function Dashboard() {  
  return (
    <div>
      <h1>欢迎使用办公自动化系统</h1>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Dashboard);
