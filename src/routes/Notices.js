import React from 'react';
import { connect } from 'dva';
import { Card, Icon, Button } from 'antd';
import Noticer from '../components/notices.jsx';
import Searcher from '../components/search';
import NoticeEditer from '../components/edit/notice';
import styles from './common.less';

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
  const { notices, modal2Edit, item2Edit, loading2Modal } = notice;
  
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
            publisher_id: 1,
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
    content: notices,
    type: 'notices',
    link: '/notices',
    loading,
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
      <NoticeEditer {...editProps}/>
      <div className={styles.actionBtns}>
        <Button type="primary" onClick={onEdit}><Icon type="plus"/>发布公告</Button>
      </div>
      <Noticer {...noticesProps} {...actionProps}/>
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
