import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Tabs, Table, Button, Icon } from 'antd';
import Gooder from '../components/goods';
import RecordEditer from '../components/edit/record';
import styles from './common.less';

function Goods({ dispatch, good}) {
  const { tab, modal, models, cabinets, fans, parts, loginUser } = good;
  const { activeKey, panes } = tab;
  function onChange(activeKey) {
    const panes = good.tab.panes;
    const paneIndex = panes.map( (pane, i) => {
      if(pane.key === activeKey){
        return 1;
      } else {
        return 0;
      }
    }).indexOf(1);
    const queryOrNot = panes[paneIndex].content.upType === null;
    dispatch ({
      type: 'good/changePane',
      payload: {
        activeKey,
        queryOrNot,
      },
    })
  };
  function onExp() {
    dispatch ({
      type: 'good/exp',
    })
  }
  const actionProps = {
    onEdit(item, goodType, recordType){
      dispatch({
        type: 'good/showModal',
        payload: {
          item,
          goodType,
          recordType,
        }
      })
    },
    loginUser,
  };
  const editProps = {
    ...modal,
    loginUser,
    handleCancel() {
      dispatch({
        type: 'good/hideModal',
      });
    },
    onSubmit(payload) {
      dispatch({
        type: 'good/save',
        payload,
      })
    },
  };
  return (
    <Card extra={(loginUser.authority === 1 || loginUser.authority === 9) && <a href="http://oa.app/records/export"><Icon type="file-excel" />导出文件</a>}>
      <RecordEditer {...editProps}/>
      <Tabs
        onChange={onChange}
        activeKey={activeKey}
        tabPosition="top"
      >
        {panes.map(pane => {
          if(pane.content.panes){
            let children = pane.content.panes.map(pane => <Tabs.TabPane tab={pane.title} key={pane.key} closable={pane.closable}><gooder {...pane.content} {...actionProps}/></Tabs.TabPane>);
            return (
              <Tabs.TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
              <Tabs
                tabPosition="right"
              >{children}</Tabs>
              </Tabs.TabPane>
            );
          }else{
            return (<Tabs.TabPane tab={pane.title} key={pane.key} closable={pane.closable}><Gooder {...pane.content} {...actionProps}/></Tabs.TabPane>)
          }
        })}
      </Tabs>
    </Card>
  );
}

function mapStateToProps(state) {
  return {
    good: state.good,
  };
}

export default connect(mapStateToProps)(Goods);



/*import React from 'react';
import { connect } from 'dva';
import { Card, Icon, Button, Row } from 'antd';
import Parter from '../components/parts';
import Gooder from '../components/goods';
import PartEditer from '../components/edit/part';
import PartPropertier from '../components/partProperties';
import Searcher from '../components/search'; 

const searchProps = {
  selectOpts: [
    {
      name: '零件名称',
      value: 'name',
    }
  ],
  defaultSelected: 'name',
  onSearch(param, val) {
    dispatch({
      type: '',
      payload: {
        param: param,
        val: val,
      },
    })
  }
}

const models = [];
for (let i = 0; i < 3; ++i) {
  models.push({
    id: i,
    name: '和谐I',
    count: i*10,
    updated_at: '2014-12-24 23:12:00',
    remark: '备注'+i,
    cabinets: [{
      id: i,
      name: '柜体名称'+i,
      count: i*10,
      updated_at: '2014-12-24 23:12:00',
      remark: 'remark'+i,
      parts: [{
        id: i,
        name: '零件名称'+i,
        count: i*10,
        updated_at: '2014-12-24 23:12:00',
        remark: 'remark'+i,
      }, {
        id: i+1,
        name: '零件名称'+(i+1),
        count: i*10,
        updated_at: '2014-12-24 23:12:00',
        remark: 'remark'+(i+1),
      }, {
        id: i+2,
        name: '零件名称'+(i+2),
        count: i*10,
        updated_at: '2014-12-24 23:12:00',
        remark: 'remark'+(i+2),
      }],
    }, {
      id: i+1,
      name: '柜体名称'+(i+1),
      count: i*10,
      updated_at: '2014-12-24 23:12:00',
      remark: 'remark'+(i+1),
    }],
    fans: [{
      id: i,
      name: '风机名称'+i,
      count: i*10,
      updated_at: '2014-12-24 23:12:00',
      remark: 'remark'+i,
    }, {
      id: i+1,
      name: '风机名称'+(i+1),
      count: i*10,
      updated_at: '2014-12-24 23:12:00',
      remark: 'remark'+(i+1),
    }],
  });
}

function Goods({ dispatch, good }) {
  const { models } = good;
  const goodProps = {
    data: models
  };
  return (
    <Card title={<b><Icon type="appstore-o"/> 仓储信息</b>}
      extra={<Button type="primary">新增</Button>}
    >
      <Gooder {...goodProps}/>
    </Card>
    
  );
}

function mapStateToProps(state) {
  return {
    good: state.good,
  };
}

export default connect(mapStateToProps)(Goods);
*/