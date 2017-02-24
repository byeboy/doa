import React, { Component, PropTypes } from 'react'
import { Input, Select} from 'antd';

class Searcher extends Component{
  constructor(props){
    super(props);
    this.state = {
      selected: this.props.defaultSelected || 'DemoParam',
    };
  }
  handleSelected(value) {
    console.log(`selected ${value}`)
    this.setState({
      selected: value,
    })
  }
  handleSearch(value) {
    console.log(`selected ${this.state.selected},search ${value}`)
    this.props.onSearch(this.state.selected,value);
  }
  getItem(optionArray) {
    return optionArray.map(item =>(
        <Select.Option key={item.name} value={item.value}>{item.name}</Select.Option>
      )
    )
  }
  render(){
    const optionDemo = [
      {
        name: '属性示例',
        value: 'DemoParam',
      },{
        name: '姓名',
        value: 'name',
      },{
        name: '标题',
        value: 'title',
      }
    ];
    const demo = this.getItem(this.props.selectOpts || optionDemo);
    const selectBefore = (
      <Select
        showSearch
        style={{ minWidth: 90 }}
        defaultValue={this.props.defaultSelected}
        optionFilterProp="children"
        onChange={this.handleSelected.bind(this)}
        filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {demo}
      </Select>
    );
    return (
      <Input.Search
        addonBefore={selectBefore}
        placeholder="点此搜索..."
        onSearch={this.handleSearch.bind(this)}
      />
    );
  }
}

Searcher.propTypes = {
  selectOpts: PropTypes.array.isRequired,
  defaultSelected: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
}

export default Searcher