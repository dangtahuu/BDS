import React from 'react';
import Item from './item';
import './styles.scss';
import { Link } from 'react-router-dom';

import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import Itemm from './item';
const Dropdown = (props) => {
    const { columns = 3, title, items, isManage } = props;
    return (
        <div className="dropdown">
            {/* <div>
                <div className="header-center-item">{title}</div>
            </div>

            <div className='dropdown-content'>
        </div> */}
            <Menu mode="horizontal">

                <Menu.SubMenu key="SubMenu" title={title}>
                    {Array.isArray(items) && items.map((item, index) =>
                        <Itemm itemData={item} key={index} isManage={isManage} />
                        // <Menu.Item key={index}>

                        //     <Link to={!isManage ? `/post-cat/${item._id || ""}` : `/${item.path}`}>
                        //         {item.name}
                        //     </Link>
                        //     <Link onClick={navigate(`/${formatPathName(valuePath)}`, { state: values })}></Link>
                        // </Menu.Item>
                    )}


                </Menu.SubMenu>
            </Menu>
        </div>




    );

};

export default Dropdown;