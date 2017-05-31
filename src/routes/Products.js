import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Tabs, Table } from 'antd';
import { Producter } from '../components/products'
import ProductEditer from '../components/edit/product'
import styles from './common.less';

function Products({ dispatch, product}) {
  const { tab, modal, models, cabinets, fans, parts, loginUser } = product;
  const { activeKey, panes } = tab;
  function onChange(activeKey) {
    const panes = product.tab.panes;
    const paneIndex = panes.map( (pane, i) => {
      if(pane.key === activeKey){
        return 1;
      } else {
        return 0;
      }
    }).indexOf(1);
    const queryOrNot = panes[paneIndex].content.upType === null;
    dispatch ({
      type: 'product/changePane',
      payload: {
        activeKey,
        queryOrNot,
      },
    })
  };
  function onEdit(targetKey, action){
    if(action === 'remove'){
      dispatch ({
        type: 'product/'+action+'Pane',
        targetKey,
      })
    }
  };
  const actionProps = {
    loginUser,
    onEdit(item, type, upType, upId){
      dispatch({
        type: 'product/showModal',
        item,
        relation: {
          type,
          upType, 
          upId,
        },
      })
    },
    onDelete(type, id, upType, upId){
      dispatch({
        type: 'product/del',
        payload: {
          type,
          id,
          upType, 
          upId,
        },
      })
    },
    onDetail(pane){
      dispatch ({
        type: 'product/addPane',
        pane,
      })
    },
    onAddRelation(payload){
      dispatch({
        type: 'product/addRelation',
        payload,
      })
    },
    onPatchRelationCount(payload){
      dispatch({
        type: 'product/patchRelationCount',
        payload,
      })
    }
  };
  const editProps = {
    ...modal,
    handleCancel() {
      dispatch({
        type: 'product/hideModal',
      });
    },
    getRelationFiles(payload) {
      dispatch({
        type: 'product/gerRelationFiles',
        payload,
      })
    },
    getRelation(payload){
      dispatch({
        type: 'product/getRelation',
        payload,
      })
    },
    onSubmit(payload) {
      console.log(payload)
      dispatch({
        type: 'product/save',
        payload,
      })
    },
    downloadFile(id) {
      dispatch({
        type: 'product/down',
        payload: {
          id,
        }
      })
    },
  };
  return (
    <Card >
      <ProductEditer {...editProps} />
      <Tabs
        onChange={onChange}
        activeKey={activeKey}
        type="editable-card"
        onEdit={onEdit}
        hideAdd
        tabPosition="top"
      >
        {panes.map(pane => {
          if(pane.content.panes){
            let children = pane.content.panes.map(pane => <Tabs.TabPane tab={pane.title} key={pane.key} closable={pane.closable}><Producter {...pane.content} {...actionProps}/></Tabs.TabPane>);
            return (
              <Tabs.TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
              <Tabs
                tabPosition="right"
              >{children}</Tabs>
              </Tabs.TabPane>
            );
          }else{
            return (<Tabs.TabPane tab={pane.title} key={pane.key} closable={pane.closable}><Producter {...pane.content} {...actionProps}/></Tabs.TabPane>)
          }
        })}
      </Tabs>
    </Card>
  );
}

function mapStateToProps(state) {
  return {
    product: state.product,
  };
}

export default connect(mapStateToProps)(Products);
