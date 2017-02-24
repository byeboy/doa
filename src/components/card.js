import React from 'react'
import { Card, Badge } from 'antd'

function Carder({ content, title, extra }) {
  return (
    <Card 
      title={title}
      extra={extra}
    >
      { content }
    </Card>
  )
}

export default Carder