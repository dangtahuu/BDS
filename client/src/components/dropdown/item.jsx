import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import { searchPath } from '../../helpers/search';
import { formatPathName } from '../../helpers/formatPathName';
import './styles.scss';

const Item = (props) => {
    const { itemData, isManage, key } = props;
    const navigate = useNavigate()
    const values = { ...itemData, categories: itemData._id + '$' + itemData.name }
    // console.log(itemData);

    const valuePath = searchPath({ ...itemData, categories: itemData._id + '$' + itemData.name });
    if (valuePath.type === 1) {
        valuePath.type = 'can-ban'
    }
    if (valuePath.type === 2) {
        valuePath.type = 'cho-thue'
    }
    return (

        <Menu.Item key={key}>

            {/* <Link to={!isManage ? `/post-cat/${item._id || ""}` : `/${item.path}`}>
                {item.name}
            </Link> */}
            <Link to={!isManage ? `/${formatPathName(valuePath) || ''}` : `/${itemData.path}`} state={values}> {itemData.name}</Link>
           
        </Menu.Item>

    );
    // {!isManage ? `/post-cat/${itemData._id || ""}` : `/${itemData.path}`}


};

export default Item;