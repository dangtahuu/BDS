import React from 'react';
import Col from './Col';
import Category from '../components/common/category';

import './styles.scss';

const Container = (props) => {
  return (
    <div className="containerUser">
      <Container.Col colSpan={2}>

      <Category />
      </Container.Col>

      <Container.Col colSpan={10}>
      <div className='content'>

        {props.children}
      </div>
      </Container.Col>
    </div>
  );
};
Container.Col = Col;

export default Container;
