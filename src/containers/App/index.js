import React from 'react';
import 'semantic-ui-css/semantic.min.css';

import styles from './styles.scss';

const App = (props) => {
  const { children } = props;
  return (
    <div className={styles['app']}>
      { children }
    </div>
  );
};

App.propTypes = {
  children: React.PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default App;

