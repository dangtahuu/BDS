import React from 'react';
import ListPostMillion from './listPostMillions';
import ListPostSell from './listPostSell';
import ListPostRent from './listPostRent';

import './styles.scss';

const Container = (props) => {
  return (
    <div className="container">
        {props.children}
    </div>
  );
};

Container.ListPostMillion = ListPostMillion;
Container.ListPostSell = ListPostSell;
Container.ListPostRent = ListPostRent;

export default Container;
