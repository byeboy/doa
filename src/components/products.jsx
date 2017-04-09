import React, { Component, PropTypes } from 'react'
import { Table, Input, InputNumber, Button, Icon, Dropdown, Menu, Tooltip, Popconfirm, Popover, Form, Select, Row, Col } from 'antd'
import styles from './common.less'

const getDetail = (r, t, uT) => {
  let panes = [];
  r.cabinets && panes.push({
    title: '柜体信息',
    content: {
      upId: r.id,
      upType: t,
      type: 'cabinets',
      data: r.cabinets,
      countRequired: true,
    },
    key: 'cabinets'
  });
  r.fans && panes.push({
    title: '风机信息',
    content: {
      upId: r.id,
      upType: t,
      type: 'fans',
      data: r.fans,
      countRequired: true,
    },
    key: 'fans'
  });
  r.parts && panes.push({
    title: '零件信息',
    content: {
      upId: r.id,
      upType: t,
      type: 'parts',
      data: r.parts,
      countRequired: true,
    },
    key: 'parts'
  });
  r.files && panes.push({
    title: '工程文件',
    content: {
      upId: r.id,
      upType: t,
      type: 'files',
      data: r.files,
      countRequired: false,
    },
    key: 'files'
  });
  const pane = {
    key: r.name,
    title: r.name,
    content: {
      panes,
    }
  };
  return pane;
}

class EditableCell extends Component {
  state = {
    value: this.props.value,
    editable: false,
  }
  handleChange = (value) => {
    this.setState({ value });
  }
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  cancel = () => {
    this.setState({ editable: false });
  }
  edit = () => {
    this.setState({ editable: true });
  }
  render() {
    const { value, editable } = this.state;
    return (
      <div className={styles.editableCell}>
        {
          editable ?
            <div className={styles.editableCellInputWrapper}>
              <InputNumber 
                min={1}
                size="small"
                defaultValue={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
              />
              <span className={styles.editableCellIcon}>
               <Tooltip title="保存更改">
                <Icon
                  type="check"
                  onClick={this.check}
                />
               </Tooltip>
               <Tooltip title="撤销">
                <Icon
                  type="rollback"
                  onClick={this.cancel}
                />
               </Tooltip>
              </span>
            </div>
            :
            <div className={styles.editableCellTextWrapper}>
              {this.props.value || ''}
             <Tooltip title="编辑">
              <Icon
                type="edit"
                className={styles.editableCellIcon}
                onClick={this.edit}
              />
             </Tooltip>
            </div>
        }
      </div>
    );
  }
}

export class Producter extends Component{
  constructor(props){
    super(props);
    this.state = {
      selectedRowKeys: [],  // Check here to configure the default column
      loading: false,
      filterDropdownVisible: false,
      type: this.props.type,
      data: this.props.data,
      popSelect: this.props.select,
      searchText: '',
    }
  }
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
//    const { searchText } = this.state;
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
    const { type, upType, upId, data, select, countRequired, onEdit, onDetail, onDelete, getRelation, onAddRelation, onPatchRelationCount } = this.props;
    const { loading, selectedRowKeys } = this.state;
    const relationProps = {
      type,
      upType,
      upId,
      popSelect: select,
      getRelation,
      onSubmit(relation){
        onAddRelation(relation);
      },
    };
    const onCellChange = (id, key) => {
      return (value) => {
        onPatchRelationCount({upType, upId, type, id, [key]: value});
      };
    };
    const handleDelete = (id, index) => {
      console.log(id, index)
      onDelete(property, id, index);
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const getColumns = (countRequired, type) => {
      const columns = [{
        title: '名称',
        dataIndex: 'name',
        width: type !== 'files' ? 150 : '',
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
        title: '简介',
        dataIndex: 'intro',
      }, {
        title: '所需数量',
        dataIndex: 'pivot.required_count',
        width: 120,
        render: (text, record, index) => (
          <EditableCell
            name='required_count'
            value={text}
            onChange={onCellChange(record.id, 'required_count')}
          />
        ),
      }, {
        title: '更新时间',
        dataIndex: 'updated_at',
        width: 200,
      }, {
        title: '操作',
        dataIndex: 'operation',
        width: 60,
        render: (text, record, index) => {
          const pane = getDetail(record, this.props.type, this.props.upType);
          return (
            data.length > 0 ?
            (
              <Dropdown overlay={
               <Menu>
                {(record.files || record.cabinets || record.fans || record.parts) && <Menu.Item>
                  <a onClick={() => onDetail(pane)}>查看明细</a>
                </Menu.Item>}
                {this.props.upType === null && <Menu.Item>
                    <a onClick={() => onEdit(record, type, upType, upId)}>更新</a>
                </Menu.Item>}
                <Menu.Item>
                  <Popconfirm title={'确定删除'+record.name+'?'} onConfirm={() => onDelete(type, record.id, upType, upId)}>
                    <a href="#">删除</a>
                  </Popconfirm>
                </Menu.Item>
              </Menu>}>
                <a>
                  <Icon type="bars" /><Icon type="down" />
                </a>
              </Dropdown>
            ) : null
          );
        },
      }]
      if(!countRequired) {
        columns.splice(2,1);
      }
      switch(type) {
        case 'files':
          columns.splice(1,1);
          break;
        default: break;
      }
      return columns;
    }
  
    const columns = getColumns(countRequired, type);
    return (
      <div>
        <div className="actionBtns">
          <Button type="primary"
            className={styles.editableAddBtn}
            disabled={hasSelected}
            onClick={() => onEdit(null, type, upType, upId)}
          ><Icon type="plus" />{(upType === null || type === 'files') ? '新增':'关联'}</Button>
          <Button type="danger"
            disabled={!hasSelected} 
            loading={loading}
          ><Icon type="delete" />删除</Button>
          <span style={{ marginLeft: 8 }}>{hasSelected ? `已选择 ${selectedRowKeys.length} 项` : ''}</span>
        </div>
        <Table rowSelection={rowSelection} 
          columns={columns} 
          dataSource={this.state.data} 
          rowKey="id"
          size="small"
          bordered
          />
      </div>
    );
  }
}

Producter.propTypes = {
  
}
