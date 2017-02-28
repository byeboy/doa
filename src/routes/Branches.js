import React from 'react';
import { connect } from 'dva';
import { Card, Icon, Button } from 'antd';
import Brancher from '../components/branches';
import Searcher from '../components/search';
import BranchEditer from '../components/edit/branch';
import styles from './common.less';

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
  const { loginUser, branches, modal2Edit, item2Edit, loading2Modal } = branch;
  const { authority } = loginUser;
  
  const editProps = {
    modal2Edit,
    item2Edit,
    loading2Modal,
    handleCancel(){
      dispatch({
        type: 'branch/hideModal2Edit',
      })
    },
    onCreate(values){
      dispatch({
        type: 'branch/save',
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
        type:'branch/update',
        payload: {
          id: item2Edit.id,
          values: values,
        }
      })
    },
  }
  const branchesProps = {
    authority: authority,
    content: branches,
    type: 'branches',
    link: '/branches',
  }
  const actionProps = {
    onEdit(item) {
      dispatch({
        type: 'branch/showModal2Edit',
        payload: {
          item2Edit: item,
        }
      })
    },
    onDelete(id) {
      dispatch({
        type: 'branch/del',
        payload: {
          id: id,
        }
      })
    },
  }
  const onEdit = () => {
    dispatch({
      type: 'branch/showModal2Edit',
      payload: {
        item2Edit: null,
      }
    })
  }
  return (
    <Card title={<b><Icon type="appstore-o"/> 部门详情</b>}
      extra={<Searcher {...searchProps}/>}
      loading={loading}
    >
      {authority === 9 &&
      <div>
        <BranchEditer {...editProps}/>
        <div className={styles.actionBtns}>
          <Button type="primary" onClick={onEdit}><Icon type="plus"/>新建部门</Button>
        </div>
      </div>}
      {branches.length !== 0 ?
      <Brancher {...branchesProps}{...actionProps}/> :
      <div><Icon type="smile-o" />暂无部门</div>}
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
