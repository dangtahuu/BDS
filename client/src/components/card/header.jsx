import React from 'react';

const Header = (props) => {
    const { style } = props;

    return (
        <div className="card-item card-header" style={style}>
            {props.children}
        </div>
    );
};

export default Header;
