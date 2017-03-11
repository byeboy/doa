import React from 'react'
import { Card, Row, Col, Icon, Tooltip, Form, Select } from 'antd'
import styles from './common.less'

const getItem = function(userArray, type, link, loading, loginUser, branches, onEdit) {
  link = link+'/';
  return userArray.map(item => {
    if(type === 'users') {
      if(item.id !== loginUser.id){
        return (
          <Col xs={24} sm={12} md={8} lg={6}  key={item.id} className={styles.col}>
            <Card bodyStyle={{ padding: 0 }} loading={loading}>
              <div className={styles.img}>
                <img alt={item.img === null? "example":item.name} src={item.img || "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"} />
              </div>
              <div className={styles.card}>
                <Tooltip title="发送邮件给Ta">
                  <h3><a href={`mailto:${item.email}`}>{item.name}</a></h3>
                </Tooltip>
                <p><b>联系方式:{item.phone}</b></p>
                <p>
                  <Icon type="appstore-o" />
                  {item.branch !== null ? 
                    `所属部门：${item.branch.name}` :
                    '暂未分配'
                  }
                  {loginUser.authority === 9 &&
                  <Tooltip title="点击编辑">
                    <Icon type="edit" className="actionIcon primary" onClick={(e)=>onEdit(item)} />
                  </Tooltip>}
                </p>
              </div>
            </Card>
          </Col>
        )
      }
    }
  })
};

function User({ content, type, link, loading, loginUser, branches, onEdit }) {
  type = type || 'users';
  link = link || '/'+type;
  console.log(content)
  function handleChange(value) {
//    const value = this.value;
    console.log(`selected ${value}`);
//    changeBranch(id, value);
  }
  const demo = getItem(content, type, link, loading, loginUser, branches, onEdit);
  return (
    <Row gutter={16}>
      {demo}
    </Row>
  )
}

export default User