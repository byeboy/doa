import React, { PropTypes} from 'react'
import { Carousel, Card, Icon } from 'antd'
import { Link } from 'dva/router'


const notices = [
  {
    id: 1,
    title: 'demo',
    content: 'this is a notice demo',
    publisher: 'admin',
  },{
    id: 2,
    title: 'demo2',
    content: 'this is a notice demo2',
    publisher: 'admin',
  },{
    id: 3,
    title: 'demo3',
    content: 'this is a notice demo3',
    publisher: 'admin',
  },
];
const getItem = function(carouselArray, type, link) {
  link = link+'/';
  return carouselArray.map(item => {
    if(type === 'notices') {
      return (
        <Card key={item.id} 
          title={<h3><Icon type="notification" /> | {item.title}</h3>}
          extra={<Link to={link + item.id}><Icon type="link" />查看详情</Link>}
        >
          <p><b>{item.content}</b></p>
          <p className="txtr"><Icon type="user" /><i>{item.publisher}</i> | <Icon type="clock-circle-o" /><i>{item.created_at}</i></p>
        </Card>
      )
    }
  })
};


function Noticer({ vertical, autoplay, content, type, link }) {
  type = type || 'notices';
  link = link || '/'+type;
  content = content || notices;
  const demo = getItem(content, type, link);
  return (
    <Carousel 
      vertical={vertical || false}
      autoplay={autoplay || true}
    >
      {demo}
    </Carousel>
  );
}

Noticer.propTypes = {
  vertical: PropTypes.bool,
  autoplay: PropTypes.bool,
  content: PropTypes.array,
  type: PropTypes.string,
  link: PropTypes.string.isRequired,
}

export default Noticer