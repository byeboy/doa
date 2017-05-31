import React, { Component } from 'react'
import { Card, Row, Col, Icon, Tooltip, Form, Select, Table, Input, Dropdown, Popconfirm, Menu } from 'antd'
import styles from './common.less'

/*小细节：RGB颜色自动处理*/
const getFlag = () => {
  let flag = {};
  let c = '';
  /*自动生成随机色号*/
  const R = Math.ceil(Math.random() * 255);
  const G = Math.ceil(Math.random() * 255);
  const B = Math.ceil(Math.random() * 255);
  const bgc = 'rgb('+R+','+G+','+B+')';
  /*通过YUV检测颜色深浅*/
  const grayLevel = R * 0.299 + G * 0.587 + B * 0.114;
  if (grayLevel >= 192) {
    c = 'black';
  } else {
    c = 'white';
  }
  flag = {
    bgc,
    c,
  };
  return flag;
}

class User extends Component 
{ 
  constructor(props) {
    super(props);
  
    this.state = {
      filterDropdownVisible: false,
      data: this.props.data,
      searchText: '',
    };
  };
  
  componentWillReceiveProps(newProps) {
    this.setState({
      data: newProps.data,
      popSelect: newProps.select,
    });
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  onInputChange = (e) => {
    this.setState({ searchText: e.target.value });
  }
  onSearch = (searchText) => {
    const reg = new RegExp(searchText, 'gi');
    this.setState({
      filterDropdownVisible: false,
      data: this.props.data.map((record) => {
        const match = record.name.match(reg);
        console.log('match: ', match)
        if (!match) {
          return null;
        }
        return {
          ...record,
          name: record.name,
        };
      }).filter(record => !!record),
    });
  }

  render() {
    const {data, type, link, loading, loginUser, branches, onEdit} = this.props;
    const getColumns = (loginUser) => {
      let columns = [{
        dataIndex: 'name',
        key: 'flag',
        width: 40,
        render: text => {
          const C = getFlag();
          return (
            <div className={styles.flag} style={{backgroundColor: C.bgc, color: C.color}}>{text.substring(0, 1)}</div>
          );
        }
      }, {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        filterDropdown: (
          <div className="custom-filter-dropdown">
           <Input.Search
              placeholder="在此检索"
              style={{ width: 200 }}
              onSearch={value => this.onSearch(value)}
            />
          </div>
        ),
        filterDropdownVisible: this.state.filterDropdownVisible,
        onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible }),
      }, {
        title: '所属部门',
        dataIndex: 'branch.name',
        key: 'branch',
      }, {
        title: '电子邮箱',
        dataIndex: 'email',
        key: 'email',
        render: text => <span>{text}&nbsp;<a href={'mailto:'+text}>
          <Tooltip title="发送邮件给Ta">
            <Icon type="mail" />
          </Tooltip>
        </a></span>,
      }, {
        title: '联系方式',
        dataIndex: 'phone',
        key: 'phone',
      }, {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Dropdown overlay={
            <Menu>
              <Menu.Item>
                <a onClick={() => onEdit(record)}><Icon type="edit" />&nbsp;编辑</a>
              </Menu.Item>
              {/*<Menu.Item>
                              <Popconfirm title={'确定删除'+record.name+'?'} onConfirm={() => onDelete(record.id)}>
                                <a href="#"><Icon type="delete" />&nbsp;删除</a>
                              </Popconfirm>
              </Menu.Item>*/}
            </Menu>}>
            <a>
              <Icon type="bars" /><Icon type="down" />
            </a>
          </Dropdown>
        ),
      }];
      if(loginUser.authority !== 9) {
        columns = columns.filter(c => c.key !== 'action');
      }
      return columns;
    }
    return (
      <Table columns={getColumns(loginUser)} dataSource={this.state.data} rowKey="id" size="small" bordered />
    )
  }
}

export default User



/*
import React from 'react'
import { Card, Row, Col, Icon, Tooltip, Form, Select, Table } from 'antd'
import styles from './common.less'

const getItem = function(userArray, type, link, loading, loginUser, branches, onEdit) {
  link = link+'/';
  return userArray.map(item => {
    if(type === 'users') {
      if(item.id !== loginUser.id){
        return (
          <Col xs={24} sm={12} md={8} lg={6}  key={item.id} className={styles.col}>
            <Card bodyStyle={{ padding: 0 }} loading={loading}>
              <div className={styles.img}>
                <img alt={item.img === null? "example":item.name} src={item.img || "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"} />
              </div>
              <div className={styles.card}>
                <Tooltip title="发送邮件给Ta">
                  <h3><a href={`mailto:${item.email}`}>{item.name}</a></h3>
                </Tooltip>
                <p><b>联系方式:{item.phone}</b></p>
                <p>
                  <Icon type="appstore-o" />
                  {item.branch !== null ? 
                    `所属部门：${item.branch.name}` :
                    '暂未分配'
                  }
                  {loginUser.authority === 9 &&
                  <Tooltip title="点击编辑">
                    <Icon type="edit" className="actionIcon primary" onClick={(e)=>onEdit(item)} />
                  </Tooltip>}
                </p>
              </div>
            </Card>
          </Col>
        )
      }
    }
  })
};


function User({ content, type, link, loading, loginUser, branches, onEdit }) {
  type = type || 'users';
  link = link || '/'+type;
  console.log(content)
  function handleChange(value) {
//    const value = this.value;
    console.log(`selected ${value}`);
//    changeBranch(id, value);
  }
  const demo = getItem(content, type, link, loading, loginUser, branches, onEdit);
  const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '电子邮箱',
    dataIndex: 'email',
    key: 'email',
    render: text => <span>{text}&nbsp;<a href={'mailto:'+text}>
      <Tooltip title="发送邮件给Ta">
        <Icon type="mail" />
      </Tooltip>
    </a></span>,
  }, {
    title: '联系方式',
    dataIndex: 'phone',
    key: 'phone',
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a>
          <Icon type="bars" /><Icon type="down" />
        </a>
      </span>
    ),
  }];
  return (
    <Table columns={columns} dataSource={content} rowKey="id" />
  )
}

export default User
*/