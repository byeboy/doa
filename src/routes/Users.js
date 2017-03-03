import React from 'react';
import { connect } from 'dva';
import { Card, Icon } from 'antd';
import User from '../components/users';
import Searcher from '../components/search';
import UserEditer from '../components/edit/user';

function Users({ dispatch, loading, user }) {
  const { users, loginUser, branches, modal2Edit, item2Edit, loading2Modal } = user;
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
        type: 'user/search',
        payload: {
          param: param,
          val: val,
        },
      })
    }
  }
  const editProps = {
    branches,
    modal2Edit,
    item2Edit,
    loading2Modal,
    handleCancel(){
      dispatch({
        type: 'user/hideModal2Edit',
      })
    },
    onCreate(values){
      dispatch({
        type: 'user/save',
        payload: {
          values: {
            ...values,
            publisher_id: 1,
          }
        },
      })
    },
    onUpdate(values){
      dispatch({
        type:'user/update',
        payload: {
          id: item2Edit.id,
          values: values,
        }
      })
    },
  }
  const actionProps = {
    onEdit(item) {
      dispatch({
        type: 'user/showModal2Edit',
        payload: {
          item2Edit: item,
        }
      })
    },
    onDelete(id) {
      dispatch({
        type: 'user/del',
        payload: {
          id: id,
        }
      })
    },
  }
  const onEdit = () => {
    dispatch({
      type: 'user/showModal2Edit',
      payload: {
        item2Edit: null,
      }
    })
  }
  const usersProps = {
    loginUser,
    branches,
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
      <UserEditer {...editProps}/>
      {users.length !== 0 ?
      <User {...usersProps} {...actionProps}/> :
      <div><Icon type="smile-o" />暂无职员</div>}
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
