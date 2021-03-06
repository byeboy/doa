import React, { PropTypes} from 'react'
import { Collapse, Card, Icon, Tooltip, Tag } from 'antd'
import { Link } from 'dva/router'

const getItem = function(noticesArray, loginUser_id, type, onDelete, onEdit) {
  if(noticesArray.length !== 0) {
    return noticesArray.map(item => {
      if(type === 'notices') {
        return (
          <Collapse.Panel key={item.id} header={
              <p>{item.title} 
                {loginUser_id === item.publisher_id &&
                <span className="fr">
                  <Tooltip title="点击编辑">
                    <Icon type="edit" className="actionIcon primary" onClick={(e)=>onEdit(item)} />
                  </Tooltip>
                  <Tooltip title="点击删除">
                    <Icon type="close" className="actionIcon danger" onClick={(e)=>onDelete(item.id)} />
                  </Tooltip>
                </span>}
              </p>
            }>
            <pre className="pre">简述：{item.intro ? item.intro : '暂无描述'}</pre>
            <p className="indent2">{item.content}</p>
            <div className="txtr">
              <Tag color="#2db7f5">
                <Icon type="user" />
                {item.publisher !== null ? 
                  item.publisher.name : '暂无发布人信息'
                }
              </Tag>
              <Icon type="clock-circle-o" /><i>{item.created_at}</i>
            </div>
          </Collapse.Panel>
        )
      }
    })
  }
};


function Noticer({ content, loginUser_id, type, onDelete, onEdit, loading }) {
  type = type || 'notices';
  const demo = getItem(content, loginUser_id, type, onDelete, onEdit);
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