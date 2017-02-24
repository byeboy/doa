import React from 'react'
import { Card, Badge, Row, Col, Icon, Tooltip } from 'antd'
import styles from './common.less'

const getItem = function(branchArray, type, link, loading) {
  link = link+'/';
  return branchArray.map(item => {
    if(type === 'branches') {
      return (
        <Col xs={24} sm={12} md={8} lg={6}  key={item.id} className={styles.col}>
          <Tooltip title={item.intro || '该部门暂无简介'}>
            <Card 
              title={item.name}
              loading={loading}
            >
              <p>总人数:{item.users_count}</p>
              <p className="txtr"><Icon type="clock-circle-o" /><i>{item.created_at}</i></p>
            </Card>
          </Tooltip>
        </Col>
      )
    }
  })
};

function Brancher({ content, type, link, loading }) {
  type = type || 'branches';
  link = link || '/'+type;
  content = content || branches;
  const demo = getItem(content, type, link, loading);
  return (
    <Row gutter={16}>
      {demo}
    </Row>
  )
}

export default Brancher