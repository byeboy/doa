import React from 'react';
import { connect } from 'dva';
import { Card, Icon } from 'antd';
import Brancher from '../components/branches';
import Searcher from '../components/search';

const searchProps = {
  selectOpts: [
    {
      name: '部门名称',
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


function Branches({ dispatch, loading, branch}) {
  const { branches } = branch;
  const branchesProps = {
    content: branches,
    type: 'branches',
    link: '/branches',
  };
  return (
    <Card title={<b><Icon type="appstore-o"/> 部门详情</b>}
      extra={<Searcher {...searchProps}/>}
      loading={loading}
    >
      <Brancher {...branchesProps}/>
    </Card>
  );
}

function mapStateToProps(state) {
  return {
    branch: state.branch,
    loading: state.loading.models.branch,
  };
}

export default connect(mapStateToProps)(Branches);
