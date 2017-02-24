import React from 'react';
import { connect } from 'dva';
import { Card, Icon } from 'antd';
import User from '../components/users';
import Searcher from '../components/search';

const searchProps = {
  selectOpts: [
    {
      name: '姓名',
      value: 'name',
    },{
      name: '电子邮箱',
      value: 'email',
    },{
      name: '联系方式',
      value: 'phone',
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

function Users({ dispatch, loading, user }) {
  const { users } = user;
  const usersProps = {
    content: users,
    type: 'users',
    link: '/users',
    loading,
  };
  return (
    <Card title={<b><Icon type="team"/> 职员一览</b>}
      extra={<Searcher {...searchProps}/>}
      loading={loading}
    >
      <User {...usersProps}/>
    </Card>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
    loading: state.loading.models.user,
  };
}

export default connect(mapStateToProps)(Users);
