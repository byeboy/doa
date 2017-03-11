import React, { PropTypes } from 'react'
import { Link } from 'dva/router'
import { Timeline, Icon, Tooltip } from 'antd'

const getDoer = function(userArray) {
  if(userArray.length != 0){
      return userArray.map(item => (
        <span key={item.id} className="doer">{item.name}</span>
      )
    )
  }
};

const getItem = function(stepArray, onStepChose, onStepDone, onStepRedo, loginUser) {
  if(stepArray.length != 0){
    return stepArray.map(item => (
        <Timeline.Item key={item.id} dot={item.status === 9? <Icon type="check-circle-o"  style={{ fontSize: 16 }}/>:'' } color={item.status >= 5? 'green':'blue'}>
          <p>
            <b>{item.name}</b>
            <span className="fr">
              {(item.user_id === null || item.user_id === '') ?
                <Tooltip title="点击执行该流程">
                  <Icon type="star-o" className="actionIcon success" onClick={(e)=>onStepChose(item.id)} />
                </Tooltip> :
                (item.user_id === loginUser.id && item.status !== 9) ? 
                <Tooltip title="点击标记为完成">
                  <Icon type="check" className="actionIcon success" onClick={(e)=>onStepDone(item.id)} />
                </Tooltip> :
                <Tooltip title="点击标记为完成">
                  <Icon type="rollback" className="actionIcon warning" onClick={(e)=>onStepRedo(item.id)} />
                </Tooltip>
              }
            </span>                         
          </p>
        </Timeline.Item>
      )
    )
  }
}

function Steper({steps, onStepChose, onStepDone, onStepRedo, loginUser}) {
  const demo = getItem(steps, onStepChose, onStepDone, onStepRedo, loginUser);
  return (
    <Timeline>
      {demo}
    </Timeline>
  );
}

Steper.propTypes = {
  steps: PropTypes.array,
  onStepDone: PropTypes.func.isRequired, 
  onStepRedo: PropTypes.func.isRequired, 
  onStepChose: PropTypes.func.isRequired,
}

export default Steper