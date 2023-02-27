import React from 'react';
import { AtomSpinner } from 'react-epic-spinners';

import './styles.scss';

const Loading = () => {
  return (
    <div className="loading-effect">
      <AtomSpinner color="#1890FF" />
    </div>
  );
};

export default Loading;
