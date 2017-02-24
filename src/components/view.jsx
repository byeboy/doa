import React, { PropTypes } from 'react'
import { Modal } from 'antd'

function Viewer({ title, content, viewVisible, onClose }){
  return (
    <Modal title={title || "Basic Modal"} visible={visible}
           onCancel={onClose}
    >
      <p>{content || "Demo"}</p>
    </Modal>
  );
}

Viewer.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.any.isRequired,
  viewVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Viewer