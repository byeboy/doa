import React, { Component } from 'react'
import { Modal, Button, Icon, Tooltip } from 'antd'
import styles from './common.less'

class Docer extends Component{
  constructor(props){
    super(props);
    this.state = {
      visible: true,
    }
  }
  onShow= () =>{
    this.setState({
      visible: true,
    })
  }
  handleCancel = (e) =>{
    this.setState({
      visible: false,
    })
  }
  render(){
    return (
      <div>
        <Tooltip title="点此查看项目说明文档">
          <Icon type="rocket" className="actionIcon success" onClick={this.onShow}/>
        </Tooltip>
        <Modal title={<h1>风林麦谷协同办公系统</h1>} style={{ top: 20 }} width={'70%'} maskClosable={false}
               visible={this.state.visible}
               onCancel={this.handleCancel}
               footer={[
                  <Button key="back" type="dashed" size="large" onClick={this.handleCancel}>我知道了</Button>,
                ]}
        >
          <div className={styles.modal2Doc}>
            <session>
              <h2>项目简介(project description)</h2>
              <p>该项目为个人毕业设计选题项目，主要用于工建企业的协同办公。</p>
            </session>
            <session>
              <h2>系统说明(system instructions)</h2>
              <p>该系统为纯后台系统，在后台中采用权限处理办法以实现功能区别（拥有管理级权限的职员可以对相关管理项进行管理，否则只有查看功能）。主要模块有：</p>
              <ul>
                <li><b>公告模块：</b>主要用于企业公告</li>
                <li><b>任务模块：</b>主要用于企业内部任务安排</li>
                <li><b>部门模块：</b>主要用于设置企业部门及相关权限</li>
                <li><b>职员模块：</b>主要用于企业内部职员的管理</li>
                <li><b>仓储模块：</b>主要用于工建企业的仓储体系，实现无纸化仓储统计</li>
              </ul>
            </session>
            <session>
              <h2>系统设计(system design)</h2>
              <h3>总体设计</h3>
              <p>该系统采用V层分离设计模式，前端采用<a href="https://github.com/dvajs/dva" target="_blank">Dva</a>框架（基于ReactJS）设计，以便后期更换后台API接口时复用方便；后台API采用<a href="https://lumen.laravel.com/" target="_blank">Lumen</a>框架（基于PHP），选择原因为Lumen专注与实现后台API开发，响应速度快，功能复用率高，使用便利。</p>
              <p>前端与后台结合尽量靠拢REST（英文：Representational State Transfer，又称具象状态传输）风格。能力有限，无法完全符合此风格。</p>
              <p>数据库设计符合第四范式，同时取消视图设计，通过后台Lumen框架实现模型关联，以降低开发过程中数据库修改频率。</p>
              <p>拓展项：拟使用WebSocket协议实现即时通信，目前该功能待开发。</p>
              <h3>详细设计</h3>
              <p>见开发文档（即个人毕业设计论文）</p>
            </session>
            <session>
              <h2>开发相关(development related)</h2>
              <h3>环境部署</h3>
              <p>前端：NodeJS</p>
              <p>后台：Nginx+PHP+MYSQL</p>
              <h3>工具清单</h3>
              <ul>
                <li><b>前端开发：</b><a href="http://brackets.io/" target="_blank">Brackets</a></li>
                <li><b>前端调试：</b><a href="https://www.google.com/chrome/" target="_blank">Chrome</a>（拓展React与Redux相关的开发者工具）</li>
                <li><b>后台开发：</b><a href="https://www.jetbrains.com/phpstorm/" target="_blank">PhpStorm</a></li>
                <li><b>后台测试：</b><a href="https://www.getpostman.com/" target="_blank">Postman</a></li>
                <li><b>项目管理：</b><a href="https://github.com/byeboy" target="_blank">
                  <Tooltip title="我的GitHub（@byeboy）">
                    <Icon type="github" />
                  </Tooltip>
                </a>
                </li>
              </ul>
            </session>
            <session>
              <h2>其他说明(other instructions)</h2>
              <h3>项目导师：钟茂生 教授</h3>
            </session>
            <session>
              <h2>版权说明(copyright)</h2>
              <h3>视觉设计：河南省安阳市 安阳师范学院 美术学院 视觉传达设计专业 2013-3班 王定超 130610067</h3>
              <h3>全栈开发：江西省南昌市 华东交通大学 信息工程学院 计算机科学与技术专业 2013-2班 耿轶伟(Gilbert) 20130610040209</h3>
            </session>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Docer