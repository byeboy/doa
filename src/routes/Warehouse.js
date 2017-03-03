import React from 'react';
import { connect } from 'dva';
import { Card, Icon } from 'antd';
import Warer from '../components/wares';
import Searcher from '../components/search';
import styles from './Warehouse.css';

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

function Warehouse() {
  return (
    <Card title={<b><Icon type="appstore-o"/> 仓储信息</b>}
      extra={<Searcher {...searchProps}/>}
    >
		<Warer />
	</Card>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Warehouse);
