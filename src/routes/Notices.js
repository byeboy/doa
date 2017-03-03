import React from 'react';
import { connect } from 'dva';
import { Card, Icon, Button } from 'antd';
import Noticer from '../components/notices.jsx';
import Searcher from '../components/search';
import NoticeEditer from '../components/edit/notice';
import styles from './common.less';

function Notices({ dispatch, loading, notice }) {
  const { loginUser, notices, modal2Edit, item2Edit, loading2Modal } = notice;
  const { id, authority } = loginUser;
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
        type: 'notice/search',
        payload: {
          param: param,
          val: val,
        }
      })
    }
  }
  const editProps = {
    modal2Edit,
    item2Edit,
    loading2Modal,
    handleCancel(){
      dispatch({
        type: 'notice/hideModal2Edit',
      })
    },
    onCreate(values){
      dispatch({
        type: 'notice/save',
        payload: {
          values: {
            ...values,
            publisher_id: loginUser.id,
          }
        },
      })
    },
    onUpdate(values){
      dispatch({
        type:'notice/update',
        payload: {
          id: item2Edit.id,
          values: values,
        }
      })
    },
  }
  const noticesProps = {
    loginUser_id: id,
    content: notices,
    type: 'notices',
    link: '/notices',
  }
  const actionProps = {
    onEdit(item) {
      dispatch({
        type: 'notice/showModal2Edit',
        payload: {
          item2Edit: item,
        }
      })
    },
    onDelete(id) {
      dispatch({
        type: 'notice/del',
        payload: {
          id: id,
        }
      })
    },
  }
  const onEdit = () => {
    dispatch({
      type: 'notice/showModal2Edit',
      payload: {
        item2Edit: null,
      }
    })
  }
  return (
    <Card title={<div>
                  <b><Icon type="notification"/> 最新公告</b>
                 </div>}
      extra={<Searcher {...searchProps}/>}
      loading={loading}
    >
      {authority === 9 &&
      <div>
        <NoticeEditer {...editProps}/>
        <div className={styles.actionBtns}>
          <Button type="primary" onClick={onEdit}><Icon type="plus"/>发布公告</Button>
        </div>
      </div>}
      {notices.length !== 0 ?
        <Noticer {...noticesProps} {...actionProps}/> : 
        <div><Icon type="smile-o" />暂无公告</div>}
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
