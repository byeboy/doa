import React, { Component, PropTypes } from 'react'
import { Tabs, Table, Input, Icon, Button, Popconfirm } from 'antd'
import styles from './common.less'

class EditableCell extends Component {
  state = {
    value: this.props.value,
    editable: false,
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }
  check = () => {
    this.setState({ editable: false });
    console.log('check')
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
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
              <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
              />
              <Icon
                type="check"
                className={styles.editableCellIconCheck}
                onClick={this.check}
              />
            </div>
            :
            <div className={styles.editableCellTextWrapper}>
              {this.props.value || ' '}
              <Icon
                type="edit"
                className={styles.editableCellIcon}
                onClick={this.edit}
              />
            </div>
        }
      </div>
    );
  }
}

class Tabler extends Component{
  constructor(props){
    super(props);
    this.state = {
      /*dataSource: this.props.data,
      count: this.props.data.length,*/
      selectedRowKeys: [],  // Check here to configure the default column
      loading: false,
    }
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  
  render() {
    const { property, data, onSave, onPatch, onDelete } = this.props;
    const { loading, selectedRowKeys } = this.state;
    const handleAdd = () => {
//      const { count, dataSource } = this.state;
      let count = data.length;
      const newData = {
        key: count,
        name: `请修改名称${count}`,
        intro: `请修改简介${count}`,
      };
      onSave(property, newData);
      /*this.setState({
        dataSource: [...dataSource, newData],
        count: count + 1,
      });*/
    };
    const onCellChange = (id, index, key) => {
//      console.log(id, index, key)
//      onPatch()
      return (value) => {
        console.log(value)
        const values = {
          [key]: value,
        };
        console.log(values)
        onPatch(property, key, value, id, index);
        /*const dataSource = [...this.state.dataSource];
        dataSource[index][key] = value;
        this.setState({ dataSource });*/
      };
    }
    const handleDelete = (id, index) => {
      console.log(id, index)
      onDelete(property, id, index);
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const columns = [{
      title: '名称',
      dataIndex: 'name',
      width: '20%',
      render: (text, record, index) => (
        <EditableCell
          name='name'
          value={text}
          onChange={onCellChange(record.id, index, 'name')}
        />
      ),
    }, {
      title: '简介',
      dataIndex: 'intro',
      width: '40%',
      render: (text, record, index) => (
        <EditableCell
          name='intro'
          value={text}
          onChange={onCellChange(record.id, index, 'intro')}
        />
      ),
    }, {
      title: '所含零件种类',
      dataIndex: 'parts_count',
    }, {
      title: '更新时间',
      dataIndex: 'updated_at',
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
    return (
      <div>
        <div className="actionBtns">
          <Button type="primary"
            className={styles.editableAddBtn}
            disabled={hasSelected}
            onClick={handleAdd}
          ><Icon type="plus" />新增</Button>
          <Button type="danger"
            disabled={!hasSelected} 
            loading={loading}
          ><Icon type="delete" />删除</Button>
          <span style={{ marginLeft: 8 }}>{hasSelected ? `已选择 ${selectedRowKeys.length} 项` : ''}</span>
        </div>
        <Table rowSelection={rowSelection} 
          columns={columns} 
          dataSource={data} 
          rowKey="id"
          size="small"
          bordered
          />
      </div>
    );
  }
}

function PartPropertier({ materials, models, cabinets, onSave, onPatch, onDelete }){
  const materialProps = {
    property: 'materials',
    data: materials,
    onSave,
    onPatch,
    onDelete,
  };
  const modelProps = {
    property: 'models',
    data: models,
    onSave,
    onPatch,
    onDelete,
  };
  const cabinetProps = {
    property: 'cabinets',
    data: cabinets,
    onSave,
    onPatch,
    onDelete,
  };
  return (
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane tab="材质" key="1">
        <Tabler {...materialProps} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="车型" key="2">
        <Tabler {...modelProps} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="柜体" key="3">
        <Tabler {...cabinetProps} />
      </Tabs.TabPane>
    </Tabs>
  );
}

PartPropertier.propTypes = {
  materials: PropTypes.array.isRequired,
  models: PropTypes.array.isRequired,
  cabinets: PropTypes.array.isRequired,
  onSave: PropTypes.func.isRequired,
  onPatch: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default PartPropertier