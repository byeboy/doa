import React, { Component, PropTypes } from 'react'
import { Table, Input, Button, Icon, Popconfirm, Badge, Dropdown, Menu } from 'antd'
import styles from './common.less'

const menu = (
  <Menu>
    <Menu.Item>
      Action 1
    </Menu.Item>
    <Menu.Item>
      Action 2
    </Menu.Item>
  </Menu>
);

const ExpandedRowRender = () => {
  const columns = [
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Status', key: 'state', render: () => <span><Badge status="success" />Finished</span> },
    { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    {
      title: 'Action',
      dataIndex: 'operation',
      key: 'operation',
      render: () => (
        <span className={'table-operation'}>
          <a href="#">Pause</a>
          <a href="#">Stop</a>
          <Dropdown overlay={menu}>
            <a href="#">
              More <Icon type="down" />
            </a>
          </Dropdown>
        </span>
      ),
    },
  ];

  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i,
      date: '2014-12-24 23:12:00',
      name: 'This is production name',
      upgradeNum: 'Upgraded: 56',
    });
  }
  return (
    <Table
      title={() => <h2>存取记录</h2>}
      columns={columns}
      dataSource={data}
      pagination={false}
    />
  );
};

const columns = [{
  title: '零件名称',
  dataIndex: 'name',
}, {
  title: '属性',
  children: [{
    title: '所属材质',
    dataIndex: 'material.name',
    key: 'material',
    filters: [{
      text: 'Joe',
      value: 'Joe',
    }, {
      text: 'Jim',
      value: 'Jim',
    }, {
      text: 'Submenu',
      value: 'Submenu',
      children: [{
        text: 'Green',
        value: 'Green',
      }, {
        text: 'Black',
        value: 'Black',
      }],
    }],
    onFilter: (value, record) => record.material.name.indexOf(value) === 0,
  }, {
    title: '所属车型',
    dataIndex: 'model.name',
    key: 'model',
    filters: [{
      text: 'Joe',
      value: 'Joe',
    }, {
      text: 'Jim',
      value: 'Jim',
    }, {
      text: 'Submenu',
      value: 'Submenu',
      children: [{
        text: 'Green',
        value: 'Green',
      }, {
        text: 'Black',
        value: 'Black',
      }],
    }],
    onFilter: (value, record) => record.model.name.indexOf(value) === 0,
  }, {
    title: '所属柜体',
    dataIndex: 'cabinet.name',
    key: 'cabinet',
    filters: [{
      text: 'Joe',
      value: 'Joe',
    }, {
      text: 'Jim',
      value: 'Jim',
    }, {
      text: 'Submenu',
      value: 'Submenu',
      children: [{
        text: 'Green',
        value: 'Green',
      }, {
        text: 'Black',
        value: 'Black',
      }],
    }],
    onFilter: (value, record) => record.cabinet.name.indexOf(value) === 0,
  }],
}, {
  title: '责任部门',
  dataIndex: 'branch.name',
  filters: [{
    text: 'London',
    value: 'London',
  }, {
    text: 'New York',
    value: 'New York',
  }],
//  filterMultiple: false,
  onFilter: (value, record) => record.branch.name.indexOf(value) === 0,
}, {
  title: '库存量',
  dataIndex: 'count',
  sorter: (a, b) => a.count - b.count,
}, {
  title: '操作',
  dataIndex: 'operation',
  render: (text, record, index) => {
    return (
      data.length > 0 ?
      (
        <Popconfirm title="确认删除?" onConfirm={() => handleDelete(record.id, index)}>
          <a href="#">删除</a>
        </Popconfirm>
      ) : null
    );
  },
}];

const data = [{
  id: '1',
  name: 'John Brown',
  intro: 'test',
  material: {
    name: 'John Brown'
  },
  model: {
    name: 'John Brown'
  },
  cabinet: {
    name: 'John Brown'
  },
  branch: {
    name: 'New York No. 1 Lake Park'
  },
  count: 10,
}, {
  id: '2',
  name: 'John Brown test',
  intro: 'test test',
  material: {
    name: 'John Brown'
  },
  model: {
    name: 'John Brown'
  },
  cabinet: {
    name: 'John Brown'
  },
  branch: {
    name: 'New York No. 1 Lake Park'
  },
  count: 1,
}, {
  id: '3',
  name: 'John',
  intro: 'test',
  material: {
    name: 'John Brown'
  },
  model: {
    name: 'John Brown'
  },
  cabinet: {
    name: 'John Brown'
  },
  branch: {
    name: 'New York No. 1 Lake Park'
  },
  count: 110,
}];

function onChange(pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter);
}


class Parter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],  // Check here to configure the default column
      loading: false,
    };
  };
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  render(){
    const { parts, loginUser, onNew, onDelete, onEdit } = this.props;
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <div className="actionBtns">
          <Button type="primary"
            className={styles.editableAddBtn}
            disabled={hasSelected}
            onClick={onNew}
          ><Icon type="plus" />新增</Button>
          <Button type="danger"
            disabled={!hasSelected} 
            loading={loading}
          ><Icon type="delete" />删除</Button>
          <span style={{ marginLeft: 8 }}>{hasSelected ? `已选择 ${selectedRowKeys.length} 项` : ''}</span>
        </div>
        <Table rowSelection={rowSelection}
        expandedRowRender={
          record => (
              <ExpandedRowRender />
          )
        }
        columns={columns} 
        dataSource={data} 
        onChange={onChange} 
        rowKey="id"/>
      </div>
    );    
  }
}

Parter.propTypes = {
  parts: PropTypes.array.isRequired, 
  loginUser: PropTypes.object.isRequired, 
  onNew: PropTypes.func.isRequired, 
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
}

export default Parter