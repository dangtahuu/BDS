import React from "react";
import { connect, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { AuthActions } from '../../../auth/redux/actions';
import { UserActions } from "../../redux/actions";
import Container from '../../../../components/container';
import Card from '../../../../components/card';

import './styles.scss';
import { useState, useEffect } from "react";

const menuItemAccount = [
    {
        link: '/profile',
        title: "Thông tin cá nhân",
        icon: <i className='bx bxs-user-account'></i>
    },
    {
        link: '/password',
        title: "Đổi mật khẩu",
        icon: <i className='bx bx-user-pin'></i>
    },
    {
        link: '/recharge',
        title: "Lịch sử nạp tiền",
        icon: <i className='bx bx-wallet'></i>
    },
    {
        link: '/payment',
        title: "Lịch sử giao dịch",
        icon: <i className='bx bx-history' ></i>
    },
]
const menuItemPost = [
    {
        link: '/user-post',
        title: "Quản lý bài đăng",
        icon: <i className='bx bx-customize'></i>
    },
    {
        link: '/post-sale-add',
        title: "Đăng tin ngay",
        icon: <i className='bx bxs-edit' ></i>
    },

    {
        link: '/post-followed',
        title: "Bài đăng đang theo dõi",
        icon: <i className='bx bx-receipt'></i>
    },
]
const Category = (props) => {
    const path = window.location.pathname
    const { user } = useSelector(state => state.auth);
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        if (!loaded) {
            setLoaded(true)
            props.getDetailUser(user?._id)
        }
    }, [])
    const { userDetail } = props.user
    const navigate = useNavigate()
    return <React.Fragment >
        <section id="sidebar">
            <a href="#" className="brand">
                <i className='bx bxs-smile'></i>
                <span className="text">AdminHub</span>
            </a>
            <div className="acc">
                <div className="account">
                    <Avatar
                        style={{
                            backgroundColor: '#87d068', width: '55px', height: '55px'
                        }}
                        icon={<UserOutlined />}
                        src={userDetail.avatar ? userDetail.avatar : ""}
                    />
                    <span style={{ marginLeft: '10px', fontSize: '18px', fontWeight: 'bold' }}>

                        {userDetail.name}
                    </span>
                </div>
                <div className="account-info">
                    <div>
                        <ul>
                            <li>
                                <span>Số dư ví: </span>
                                <span>
                                    <button style={{ fontSize: '12px', color: '#5086BD', marginRight: '4px', cursor: 'pointer' }} onClick={() => window.location.reload(true)}>
                                        <i className="fa-solid fa-rotate-right" ></i>
                                    </button>

                                    {userDetail.balance ? userDetail.balance.toLocaleString('vi', { style: 'currency', currency: 'VND' }): ''} </span>
                            </li>
                            <li>
                                <span>Tổng số tin: </span>
                                <span>{userDetail.posts ? userDetail.posts.length : ''}</span>
                            </li>
                            <li>
                                <span>Xác thực: </span>
                                <span>
                                    <ul className="wrapper">
                                        <li className="icon email">
                                            <span className="tooltip">{user.email}</span>
                                            <span><i className="fa-solid fa-envelope"></i></span>
                                        </li>
                                        <li className="icon phone" style={{ marginRight: '0' }}>
                                            <span className="tooltip">{user.phone}</span>
                                            <span><i className="fa-solid fa-phone"></i></span>
                                        </li>
                                    </ul>
                                </span>
                            </li>
                        </ul>
                        <div className="recharge">
                            <button className="button" onClick={() => navigate('/recharge')}>
                                <span className="button__text">
                                    Nạp tiền
                                </span>
                                <svg className="button__svg" role="presentational" viewBox="0 0 600 600">
                                    <defs>
                                        <clipPath id="myClip">
                                            <rect x="0" y="0" width="100%" height="50%" />
                                        </clipPath>
                                    </defs>
                                    <g clip-path="url(#myClip)">
                                        <g id="money">
                                            <path d="M441.9,116.54h-162c-4.66,0-8.49,4.34-8.62,9.83l.85,278.17,178.37,2V126.37C450.38,120.89,446.56,116.52,441.9,116.54Z" fill="#699e64" stroke="#323c44" stroke-miterlimit="10" stroke-width="14" />
                                            <path d="M424.73,165.49c-10-2.53-17.38-12-17.68-24H316.44c-.09,11.58-7,21.53-16.62,23.94-3.24.92-5.54,4.29-5.62,8.21V376.54H430.1V173.71C430.15,169.83,427.93,166.43,424.73,165.49Z" fill="#699e64" stroke="#323c44" stroke-miterlimit="10" stroke-width="14" />
                                        </g>
                                        <g id="creditcard">
                                            <path d="M372.12,181.59H210.9c-4.64,0-8.45,4.34-8.58,9.83l.85,278.17,177.49,2V191.42C380.55,185.94,376.75,181.57,372.12,181.59Z" fill="#a76fe2" stroke="#323c44" stroke-miterlimit="10" stroke-width="14" />
                                            <path d="M347.55,261.85H332.22c-3.73,0-6.76-3.58-6.76-8v-35.2c0-4.42,3-8,6.76-8h15.33c3.73,0,6.76,3.58,6.76,8v35.2C354.31,258.27,351.28,261.85,347.55,261.85Z" fill="#ffdc67" />
                                            <path d="M249.73,183.76h28.85v274.8H249.73Z" fill="#323c44" />
                                        </g>
                                    </g>
                                    <g id="wallet">
                                        <path d="M478,288.23h-337A28.93,28.93,0,0,0,112,317.14V546.2a29,29,0,0,0,28.94,28.95H478a29,29,0,0,0,28.95-28.94h0v-229A29,29,0,0,0,478,288.23Z" fill="#a4bdc1" stroke="#323c44" stroke-miterlimit="10" stroke-width="14" />
                                        <path d="M512.83,382.71H416.71a28.93,28.93,0,0,0-28.95,28.94h0V467.8a29,29,0,0,0,28.95,28.95h96.12a19.31,19.31,0,0,0,19.3-19.3V402a19.3,19.3,0,0,0-19.3-19.3Z" fill="#a4bdc1" stroke="#323c44" stroke-miterlimit="10" stroke-width="14" />
                                        <path d="M451.46,435.79v7.88a14.48,14.48,0,1,1-29,0v-7.9a14.48,14.48,0,0,1,29,0Z" fill="#a4bdc1" stroke="#323c44" stroke-miterlimit="10" stroke-width="14" />
                                        <path d="M147.87,541.93V320.84c-.05-13.2,8.25-21.51,21.62-24.27a42.71,42.71,0,0,1,7.14-1.32l-29.36-.63a67.77,67.77,0,0,0-9.13.45c-13.37,2.75-20.32,12.57-20.27,25.77l.38,221.24c-1.57,15.44,8.15,27.08,25.34,26.1l33-.19c-15.9,0-28.78-10.58-28.76-25.93Z" fill="#7b8f91" />
                                        <path d="M148.16,343.22a6,6,0,0,0-6,6v92a6,6,0,0,0,12,0v-92A6,6,0,0,0,148.16,343.22Z" fill="#323c44" />
                                    </g>

                                </svg>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
            <ul className="side-menu top">
                <div className="profile-item-header">
                    <span>Quản lý tài khoản</span>
                </div>
                {menuItemAccount.map((item, index) => {
                    return (
                        <li className={path === item.link ? 'active' : ''} key={index}>
                            <Link to={item.link}>
                                {item.icon}
                                <span className="text">{item.title}</span>
                            </Link>
                        </li>
                    )

                })}
                <div className="profile-item-header top-header">
                    <span>Quản lý bài đăng</span>
                </div>
                {menuItemPost.map((item, index) => {
                    return (
                        <li className={path === item.link ? 'active' : ''} key={index}>
                            <Link to={item.link}>
                                {item.icon}
                                <span className="text">{item.title}</span>
                            </Link>
                        </li>
                    )

                })}
            </ul>
            <ul className="side-menu" onClick={() => AuthActions.logOut()}>
                <li>
                    <a href="#" className="logout">
                        <i className='bx bxs-log-out-circle' ></i>
                        <span className="text">Logout</span>
                    </a>
                </li>
            </ul>
        </section>
    </React.Fragment >
};

const mapStateToProps = state => {
    const { user } = state
    return { user };
}

const mapDispatchToProps = {
    getDetailUser: UserActions.getDetailUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);