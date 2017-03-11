import React from 'react'
import { Card, Badge, Row, Col, Icon, Tooltip } from 'antd'
import styles from './common.less'

const getItem = function(loginUser, branchArray, type, link, onDelete, onEdit) {
  link = link+'/';
  return branchArray.map(item => {
    if(type === 'branches') {
      return (
        <Col xs={24} sm={12} md={8} lg={6}  key={item.id} className={styles.col}>
          <Tooltip title={item.intro || '该部门暂无简介'}>
            <Card 
              title={item.name}
              extra={loginUser.authority===9 &&
                <span>
                  <Tooltip title="点击编辑">
                    <Icon type="edit" className="actionIcon primary" onClick={(e)=>onEdit(item)} />
                  </Tooltip>
                  {item.id !== loginUser.branch_id &&
                  <Tooltip title="点击删除">
                    <Icon type="delete" className="actionIcon primary" onClick={(e)=>onDelete(item.id)} />
                  </Tooltip>}
                </span>
              }
            >
              <h3>总人数:{item.users_count}</h3>
              <p className="txtr"><Icon type="clock-circle-o" /><i>{item.created_at}</i></p>
            </Card>
          </Tooltip>
        </Col>
      )
    }
  })
};

function Brancher({ loginUser, content, type, link, onDelete, onEdit }) {
  type = type || 'branches';
  link = link || '/'+type;
  const demo = getItem(loginUser, content, type, link, onDelete, onEdit);
  return (
    <Row gutter={16}>
      {demo}
    </Row>
  )
}

export default Brancher