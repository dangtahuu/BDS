import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./styles.scss";
import { Layout, Button, Avatar, Dropdown, Menu } from "antd";
import { BankOutlined, UserOutlined } from "@ant-design/icons";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Login from '../../modules/auth/components/login';
import Register from '../../modules/user/components/register';
import { AuthActions } from '../../modules/auth/redux/actions';
import { CategoryActions } from '../../modules/category/redux/actions';

import DropDown from '../../components/dropdown';

const { Header } = Layout;

const dataManagerDropdown = [{
    name: "quản lý người dùng",
    path: "manage-user"
}, {
    name: "quản lý danh mục",
    path: "manage-category"
}, {
    name: "quản lý bài đăng",
    path: "manage-post"
}, {
    name: "quản lý phí VIP",
    path: "manage-fee"
}]

const Headers = (props) => {
    const { listCategoriesNoPagination = [] } = props.category;
    const { isAuth = false, user } = useSelector(state => state.auth);
    const { isnewRegister = false } = useSelector(state => state.user);
    const [state, setState] = useState({
        visibleLogin: false,
        visibleRegister: false,
    });

    const [loaded, setLoaded] = useState(false);
    useEffect(() => {

        if (!loaded) {
            setLoaded(true);
            props.getAllCategoriesNoPagination()
        }
    }, [])
    const menuSignIn = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <a target="_blank" rel="noopener noreferrer" onClick={() => setState({ ...state, visibleLogin: true })} >
                            Đăng nhập
                        </a>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <a target="_blank" rel="noopener noreferrer" onClick={() => setState({ ...state, visibleRegister: true })}>
                            Đăng ký
                        </a>
                    ),
                },
                {
                    key: '3',
                    label: (
                        <a target="_blank" rel="noopener noreferrer" >
                            Quản lý tài khoản
                        </a>
                    ),
                },
            ]}
        />
    );

    const menuUser = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <Link to="/user-post" rel="noopener noreferrer"  >
                            Quản lý tài khoản
                        </Link>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <a target="_blank" rel="noopener noreferrer" onClick={() => AuthActions.logOut()}>
                            Đăng xuất
                        </a>
                    ),
                },

            ]}
        />
    )
    useEffect(
        () => {
            if (isAuth && state.visibleLogin) {
                setState({ visibleLogin: false })
            }
        }, [isAuth, state])

    useEffect(
        () => {
            if (isnewRegister && state.visibleRegister) {
                setState({ visibleRegister: false })
            }
        }, [isnewRegister])

    return <React.Fragment>
        <header className="header">

            <a href="/" className="logo"><BankOutlined /> BDS </a>

            <nav className="navbar">
                <DropDown
                    title="Nhà đất bán"
                    items={listCategoriesNoPagination.filter(c => c.type === 1)}
                />

                <DropDown
                    title="Nhà đất cho thuê"
                    items={listCategoriesNoPagination.filter(c => c.type === 2)}
                />

                {/* <DropDown
                    title="Dự án"
                // items={listCategoriesNoPagination.filter(c => c.type === 5)}
                /> */}


                <Link to="/dashboard">
                    <div className="header-center-item">Thống kê</div>
                </Link>

                {user.role === 3 && <DropDown
                    title="Quản lý"
                    items={dataManagerDropdown}
                    isManage
                />}
            </nav>

            <div className="header-right" style={isAuth ? { width: '20%' } : {}}>

                {isAuth ? (

                    <ul style={{ width: '100%' }}>
                        <li className="post">
                            <Link to='/post-sale-add'>
                                <i className='bx bx-edit'></i>
                                Đăng tin
                            </Link>

                        </li>
                        <li >
                            {/* <React.Fragment> */}
                            {/* 
                                
                               
                             */}
                            {/* </React.Fragment> */}
                            
                            <Dropdown overlay={menuUser} placement="bottomRight" arrow={{
                                pointAtCenter: true,
                            }}>

                                <Avatar
                                    style={{
                                        backgroundColor: '#87d068',
                                    }}
                                    icon={<UserOutlined />}
                                    src={user.avatar ? user.avatar : ""}
                                />
                            </Dropdown>
                            {/* <Link to={`/profile`} style={{ color: "#1890ff", marginLeft: '0.25rem', fontWeight: "600", cursor: "pointer" }}></Link> */}

                        </li>
                    </ul>
                ) : (
                    <React.Fragment>
                        <ul>
                            <li className="post">
                                <Link to='' onClick={() => setState({ ...state, visibleLogin: true })}>
                                    <i className='bx bx-edit'></i>
                                    Đăng tin
                                </Link>

                            </li>
                            <li className="signIn">

                                <Dropdown overlay={menuSignIn}>
                                    <a onClick={(e) => e.preventDefault()}>

                                        <i className='bx bx-user-circle'></i>
                                        <span>

                                            Đăng nhập
                                        </span>

                                    </a>
                                </Dropdown>
                            </li>

                        </ul>
                    </React.Fragment>)}

                <Login visibleLogin={state.visibleLogin} setState={setState} />
                <Register visibleRegister={state.visibleRegister} setState={setState} />
            </div>

        </header>
    </React.Fragment>



};

const mapStateToProps = state => {
    const { category } = state;
    return { category };
}

const mapDispatchToProps = {
    getAllCategoriesNoPagination: CategoryActions.getAllCategoriesNoPagination
}

export default connect(mapStateToProps, mapDispatchToProps)(Headers);
