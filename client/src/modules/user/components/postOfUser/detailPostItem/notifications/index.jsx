import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { Empty, Avatar } from 'antd';
import { UserOutlined, StarOutlined } from '@ant-design/icons'
import 'moment/locale/vi';
import moment from 'moment';
import { FormatMoney } from '../../../../../../helpers/formatCurrency';
import { getFullAddress } from '../../../../../../helpers/formatAddress';
import { slug } from '../../../../../../helpers/slug'

import './notification.scss'

const Notification = (props) => {
    const [selected, setSelected] = useState(1)

    const { postItem } = props;
    const notifications = []
    postItem.rates.map(rate => {
        notifications.push(rate)
    })
    postItem.comments.map(comment => {
        notifications.push(comment)
    })
    notifications.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))

    return <React.Fragment>
        <div className="detail-post-item">
            <div className="class" style={{ justifyContent: 'space-around' }}>
                <button>Thông báo</button>
                <button>Người theo dõi</button>

            </div>
            <div style={{ display: 'flex', height: '94%', justifyContent:'space-around' }}>
                {Array.isArray(notifications) && notifications.length ?
                    <div className="notifications">
                        <div className="content">
                            <div className="in-content">
                                {notifications.map((item, index) => {
                                    return <div className="noti-item" >
                                        <div className="ava-if">
                                            <Avatar
                                                style={{
                                                    backgroundColor: '#87d068', width: '55px', height: '55px'
                                                }}
                                                icon={<UserOutlined />}
                                                src={item.user.avatar ? item.user.avatar : ""}
                                            />
                                            <div className="info">

                                                <span className="name">

                                                    {item.rate ? <><span style={{ fontWeight: 'bold' }}>{item.user.name}</span> đã đánh giá <span style={{ fontWeight: 'bold' }}>{item.rate}</span><i className="fa-solid fa-star" style={{ color: 'yellow' }}></i> cho bài đăng</> : <><span style={{ fontWeight: 'bold' }}>{item.user.name}</span> đã bình luận về bài đăng</>}
                                                </span>
                                                <span className="feedback" >

                                                    <div className="time">

                                                        {moment(item.date).fromNow()}
                                                    </div>
                                                </span>
                                            </div>
                                        </div>

                                    </div>

                                })}
                            </div>

                        </div>

                    </div> : <Empty description="Không có dữ liệu" style={{ marginTop: "10px" }} />}
                {Array.isArray(postItem.follows) && postItem.follows.length ?
                    <div className="followers">
                        <div className="content">
                            <div className="in-content">
                                {postItem.follows.map((item, index) => {
                                    return <div className="noti-item" >
                                        <div className="ava-if">
                                            <Avatar
                                                style={{
                                                    backgroundColor: '#87d068', width: '55px', height: '55px'
                                                }}
                                                icon={<UserOutlined />}
                                                src={item.avatar ? item.avatar : ""}
                                            />
                                            <div className="info">

                                                <span className="name" style={{ fontWeight: 'bold' }}>
                                                    {item.name}
                                                    
                                                </span>
                                                <span>
                                                    <ul className="wrapper">
                                                        <li className="icon email">
                                                            <span className="tooltip">{item.email}</span>
                                                            <span><i className="fa-solid fa-envelope"></i></span>
                                                        </li>
                                                        <li className="icon phone" style={{ marginRight: '0' }}>
                                                            <span className="tooltip">{item.phone}</span>
                                                            <span><i className="fa-solid fa-phone"></i></span>
                                                        </li>
                                                    </ul>
                                                </span>
                                            </div>
                                        </div>

                                    </div>

                                })}
                            </div>

                        </div>

                    </div> : <Empty description="Không có dữ liệu" style={{ marginTop: "10px" }} />}
            </div>


        </div>
    </React.Fragment>
};

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
