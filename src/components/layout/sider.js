import React from 'react'
import { Icon, Switch } from 'antd'
import styles from './main.less'
import { config } from '../../utils'
import Menus from './menu'

function Sider ({ authority, siderFold, darkTheme, location, changeTheme }) {
  const menusProps = {
    authority,
    siderFold,
    darkTheme,
    location
  }
  return (
    <div>
      <div className={styles.logo}>
        <img src="/cuber.svg" />
        {siderFold ? '' : <span>{config.logoText}</span>}
      </div>
      <Menus {...menusProps} />
      {!siderFold ? <div className={styles.switchtheme}>
        <span><Icon type='bulb' />切换主题</span>
        <Switch onChange={changeTheme} defaultChecked={darkTheme} checkedChildren='黑' unCheckedChildren='白' />
      </div> : ''}
    </div>
  )
}

export default Sider
