import React from 'react';

const Footer = (props) => {
    const { styles } = props;

    return (
        <div className="card-item card-footer" style={styles}>
            {props.children}
        </div>
    );
};

export default Footer;
