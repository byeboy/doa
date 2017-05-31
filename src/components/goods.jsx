import React, { Component, TypeProps } from 'react';
import { Table, Badge, Menu, Dropdown, Icon, Button, Input, Popconfirm } from 'antd'
import styles from './common.less'

function Recorder({data}) {
	const columns = [{
		title: '记录类型',
		dataIndex: 'type',
		width: '10%',
		render: (text, record, index) => {
			switch(record.type) {
				case 0: {
					return (<span><Badge status="warning" />出库</span>);
					break;
				};
				case 1: {
					return (<span><Badge status="success" />入库</span>);
					break;
				};
				default: {
					return (<span><Badge status="error" />非法记录</span>);
				}
			}
		},
		filters: [{
			text: '出库',
			value: 0,
			}, {
			text: '入库',
			value: 1,
		}],
		// specify the condition of filtering result
		// here is that finding the name started with `value`
		onFilter: (value, record) => record.type == value,
	}, {
		title: '数量',
		dataIndex: 'count',
		width: '10%',
	}, {
		title: '备注',
		dataIndex: 'remark',
		width: '50%',
	}, {
		title: '记录时间',
		dataIndex: 'created_at',
		width: '20%',
	}, {
		title: '操作人',
		dataIndex: 'operator.name',
	}];

	return (
		<Table columns={columns} 
			dataSource={data} 
			size="small"
			bordered={false}
      pagination={false}
      rowKey="id"
			/>
	);
}

class Gooder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],  // Check here to configure the default column
      loading: false,
      filterDropdownVisible: false,
      data: this.props.data,
      searchText: '',
    };
  };
  componentWillReceiveProps(newProps) {
    this.setState({
      data: newProps.data,
    });
  }
  onInputChange = (e) => {
    this.setState({ searchText: e.target.value });
  }
  onSearch = (searchText) => {
//    const { searchText } = this.state;
    const reg = new RegExp(searchText, 'gi');
    this.setState({
      filterDropdownVisible: false,
      data: this.props.data.map((record) => {
        const match = record.name.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record,
          name: [record.name.split(reg).map((text, i) => (
                  i > 0 ? (match[0]+text) : text
                ))],
        };
      }).filter(record => !!record),
    });
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  onDelete = (index) => {
//    const data = [...this.state.data];
//    data.splice(index, 1);
//    this.setState({ data });
//      console.log(index)
  }
  render() {
    const { type, onEdit, loginUser } = this.props;
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const getColumns = (loginUser) => {
      let columns = [{ 
        title: '名称', 
        dataIndex: 'name', 
        key: 'name',
        width: '10%',
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
        title: '库存', 
        dataIndex: 'count', 
        key: 'count',
        width: '10%'
      }, { 
        title: '最近更新', 
        dataIndex: 'updated_at', 
        key: 'updated_at',
        width: '20%',
      }, { 
        title: '备注', 
        dataIndex: 'remark', 
        key: 'remark',
        width: '55%'
      }, { 
        title: '操作', 
        key: 'action',
        width: '5%',
        render: (text, record, index) => {
          return (
            <Dropdown overlay={
             <Menu>
              <Menu.Item>
                <a onClick={() => onEdit(record, type, 1)}>入库</a>
              </Menu.Item>
              <Menu.Item>
                <a onClick={() => onEdit(record, type, 0)}>出库</a>
              </Menu.Item>
            </Menu>}>
              <a>
                <Icon type="bars" /><Icon type="down" />
              </a>
            </Dropdown>
          );
        },
      }];
      if(loginUser.authority !== 1) {
        columns = columns.filter(c => c.key !== 'action');
      }
      return columns;
    };
    const columns = getColumns(loginUser);
    return (
      <div>
        <Table
          className="components-table-demo-nested"
          columns={columns}
          expandedRowRender={(record) => (
              <Recorder data={record.records}/>
          )}
          dataSource={this.state.data}
          pagination={false}
          rowKey="id"
          size="small"
        />
      </div>
    );
  }
}

export default Gooder