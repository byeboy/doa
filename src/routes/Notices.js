import React from 'react';
import { connect } from 'dva';
import { Card, Icon } from 'antd';
import Noticer from '../components/notices.jsx';
import Searcher from '../components/search';

const searchProps = {
  selectOpts: [
    {
      name: '标题',
      value: 'title',
    },{
      name: '发布时间',
      value: 'created_at',
    }
  ],
  defaultSelected: 'title',
  onSearch(param, val) {
    dispatch({
      type: '',
      payload: {
        param: param,
        val: val,
      }
    })
  }
}

function Notices({ dispatch, loading, notice }) {
  const { notices } = notice;
  const noticesProps = {
    content: notices,
    type: 'notices',
    link: '/notices',
    loading,
  }
  return (
    <Card title={<b><Icon type="notification"/> 最新公告</b>}
      extra={<Searcher {...searchProps}/>}
      loading={loading}
    >
      <Noticer {...noticesProps}/>
    </Card>
  );
}

function mapStateToProps(state) {
  return {
    notice : state.notice,
    loading: state.loading.models.notice,
  };
}

export default connect(mapStateToProps)(Notices);
