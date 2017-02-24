import React, { PropTypes} from 'react'
import { Collapse, Card, Icon } from 'antd'
import { Link } from 'dva/router'

const getItem = function(noticesArray, type, link) {
  link = link+'/';
  return noticesArray.map(item => {
    if(type === 'notices') {
      return (
        <Collapse.Panel key={item.id} header={
          <p>{item.title}<i className="fr">{item.intro}</i></p>}>
          <p>{item.content}</p>
          <p className="txtr">
            <Icon type="user" />
            <i>
            {item.publisher !== null ? 
                item.publisher.name : '暂无发布人信息'
            }</i> | 
            <Icon type="clock-circle-o" /><i>{item.created_at}</i>
          </p>
        </Collapse.Panel>
      )
    }
  })
};


function Noticer({ content, type, link, loading }) {
  type = type || 'notices';
  link = link || '/'+type;
  const demo = getItem(content, type, link);
  return (
    <Collapse accordion loading={loading}>
      {demo}
    </Collapse>
  );
}

Noticer.propTypes = {
  content: PropTypes.array,
  type: PropTypes.string,
  link: PropTypes.string.isRequired,
}

export default Noticer