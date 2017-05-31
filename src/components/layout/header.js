import React from 'react'
import { Menu, Dropdown, Icon, Popover } from 'antd'
import styles from './main.less'
import Menus from './menu'

const SubMenu = Menu.SubMenu;



function Header ({user, logout, showRewrite, switchSider, siderFold, isNavbar, menuPopoverVisible, location, switchMenuPopover}) {
  const handleClickMenu = e => {
    switch(e.key) {
      case 'logout': logout(); break;
      case 'rewrite': showRewrite(); break;
    }
  }
  const menusProps = {
    siderFold: false,
    darkTheme: false,
    isNavbar,
    handleClickNavMenu: switchMenuPopover,
    location
  }
  const menu = (
    <Menu onClick={handleClickMenu}>
      <Menu.Item key="name">
        姓名：{user.name}
      </Menu.Item>
      { user.branch && 
        <Menu.Item key="branch">
          部门：{user.branch.name}
        </Menu.Item>
      }
      <Menu.Item key="rewrite">
        修改密码
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <Icon type="logout" />&nbsp;注销
      </Menu.Item>
    </Menu>
  )
  return (
    <div className={styles.header}>
      {isNavbar
        ? <Popover placement='bottomLeft' onVisibleChange={switchMenuPopover} visible={menuPopoverVisible} overlayClassName={styles.popovermenu} trigger='click' content={<Menus {...menusProps} />}>
          <div className={styles.siderbutton}>
            <Icon type='bars' />
          </div>
        </Popover>
        : <div className={styles.siderbutton} onClick={switchSider}>
          <Icon type={siderFold ? 'menu-unfold' : 'menu-fold'} />
        </div>}
      <div className={styles.user}>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" href="#">
            {user.name.substring(0, 1)}
          </a>
        </Dropdown>
      </div>
    </div>
  )
}

export default Header
