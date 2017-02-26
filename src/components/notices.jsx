import React, { PropTypes} from 'react'
import { Collapse, Card, Icon, Tooltip } from 'antd'
import { Link } from 'dva/router'

const getItem = function(noticesArray, type, onDelete, onEdit) {
  return noticesArray.map(item => {
    if(type === 'notices') {
      return (
        <Collapse.Panel key={item.id} header={
            <p>{item.title} 【<i>{item.intro ? item.intro : '暂无描述'}</i>】
              <span className="fr">
                <Tooltip title="点击编辑">
                  <Icon type="edit" className="actionIcon primary" onClick={(e)=>onEdit(item)} />
                </Tooltip>
                <Tooltip title="点击删除">
                  <Icon type="close" className="actionIcon danger" onClick={(e)=>onDelete(item.id)} />
                </Tooltip>
              </span>
            </p>
          }>
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


function Noticer({ content, type, onDelete, onEdit, loading }) {
  type = type || 'notices';
  const demo = getItem(content, type, onDelete, onEdit);
  return (
    <Collapse accordion loading={loading}>
      {demo}
    </Collapse>
  );
}

Noticer.propTypes = {
  content: PropTypes.array,
  type: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
}

export default Noticer