import React from 'react';
import { connect } from 'dva';
import { Card, Icon, Row } from 'antd';
import Parter from '../components/parts';
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

function Parts({ dispatch, part }) {
  const { parts, materials, models, cabinets } = part;
  const propertyProps = {
    materials,
    models,
    cabinets,
    onSave(property, values){
      dispatch({
        type: 'part/propertySave',
        payload: {
          property: property,
          values: values,
        }
      })
    },
    onPatch(property, key, value, id, index){
      dispatch({
        type: 'part/propertyPatch',
        payload: {
          property: property,
          key: key,
          value: value,
          id: id,
          index: index,
        }
      })
    },
    onDelete(property, id, index){
      dispatch({
        type: 'part/propertyDel',
        payload: {
          property: property,
          id: id,
          index: index,
        }
      })
    },
  }
  return (
    <div>
      <Row>
        <Card title={<b><Icon type="appstore-o"/> 仓储信息</b>}
          extra={<Searcher {...searchProps}/>}
        >
          <Parter />
        </Card>
      </Row>
      <Row>
        <Card title={<b><Icon type="setting"/> 属性相关设置</b>}>
          <PartPropertier {...propertyProps}/>
        </Card>
      </Row>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    part: state.part,
  };
}

export default connect(mapStateToProps)(Parts);
