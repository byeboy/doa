import React, { Component, PropTypes } from 'react'
import { Tabs, Table, Dropdown, Menu, Button, Icon } from 'antd'
import styles from './common.less'

const columns = [{
  title: '名称',
  dataIndex: 'name',
}, {
  title: '简介',
  dataIndex: 'intro',
}, {
  title: '所含零件数量',
  dataIndex: 'components_count',
}, {
  title: '更新时间',
  dataIndex: 'updated_at',
}, {
  title: '操作',
  key: 'action',
  render: (text, record) => {
     return (
      <Dropdown overlay={
        <Menu onClick={(e) => handleMenuClick(record, e)}>
          <Menu.Item key='1'>编辑</Menu.Item>
          <Menu.Item key='2'>删除</Menu.Item>
        </Menu>}>
        <Button style={{ border: 'none' }}>
          <Icon style={{ marginRight: 2 }} type='bars' />
          <Icon type='down' />
        </Button>
      </Dropdown>);
  },
}]

function Parter() {
  
  return (
    /*<Tabs defaultActiveKey="1">
      <Tabs.TabPane tab="材质" key="1">
        <Tabler {...materialProps} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="车型" key="2">Content of Tab Pane 2</Tabs.TabPane>
      <Tabs.TabPane tab="柜体" key="3">Content of Tab Pane 3</Tabs.TabPane>
    </Tabs>*/
    <div></div>
  );
}

Parter.propTypes = {
  
}

export default Parter