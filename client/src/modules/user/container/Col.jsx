import React from 'react';

const Col = (props) => {
    const { colSpan = 0 } = props;

    return (
        <div className={`col-md-${colSpan}` } style={{backgroundColor: '#EEF2FA', minHeight: '750px'}}>
            {props.children}
        </div>
    );
};

export default Col;
