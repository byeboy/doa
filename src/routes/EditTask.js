import React from 'react';
import { connect } from 'dva';
import styles from './common.less';

function EditTask() {
  return (
    <div className={styles.normal}>
      Route Component: EditTask
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(EditTask);
