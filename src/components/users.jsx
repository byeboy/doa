import React from 'react'
import { Card, Row, Col, Icon, Tooltip } from 'antd'
import styles from './common.less'

const getItem = function(userArray, type, link, loading) {
  link = link+'/';
  return userArray.map(item => {
    if(type === 'users') {
      return (
        <Col xs={24} sm={12} md={8} lg={6}  key={item.id} className={styles.col}>
          <Card bodyStyle={{ padding: 0 }} loading={loading}>
            <div className={styles.img}>
              <img alt={item.img === null? "example":item.name} src={item.img || "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"} />
            </div>
            <div className={styles.card}>
              <Tooltip title="发送邮件给Ta">
                <h2><a href={`mailto:${item.email}`}>{item.name}</a></h2>
              </Tooltip>
              <p><b>联系方式:{item.phone}</b></p>
              <p className="txtr"><Icon type="appstore-o" /><i>{item.branch.name}</i> | <Icon type="clock-circle-o" /><i>{item.updated_at}</i></p>
            </div>
          </Card>
        </Col>
      )
    }
  })
};

function User({ content, type, link, loading }) {
  type = type || 'users';
  link = link || '/'+type;
  const demo = getItem(content, type, link, loading);
  return (
    <Row gutter={16}>
      {demo}
    </Row>
  )
}

export default User