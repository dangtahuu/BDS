import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Avatar, message, Empty } from 'antd';
import { UserOutlined } from '@ant-design/icons'
import 'moment/locale/vi';
import moment from 'moment';
import { PostActions } from "../../../../../post/redux/actions";
import ContactItem from './contactItem'
import './contact.scss'

const Contact = (props) => {
    const { postItem } = props;
    const [contact, setContact] = useState(0)
    const [messageApi, contextHolder] = message.useMessage();
    const _contact = async (data) => {
        let dataFormat = {
            contacts: data.contacts.map(c => {
                return {
                    fullName: c.fullName,
                    phone: c.phone,
                    feedback: c.feedback,
                    user: c.user._id,
                    status: c.status,
                    date: c.date
                }
            })
        }
        props.updatePost(postItem._id, dataFormat)
        // props.contact(postItem._id, dataFormat);
    }
    const changeStatus = (_id) => {
        let data = {
            contacts: postItem.contacts.map(c => {
                if (c._id !== _id) {

                    return c;
                } else {
                    return {
                        ...c,
                        status: true
                    }
                }
            })

        }

        _contact(data)

    }
    return <React.Fragment>
        {/* <div className="post-list-comment">
            
        </div> */}
        {contextHolder}
        {Array.isArray(postItem.contacts) && postItem.contacts.length ? <div className="contact">
            <div className="content">
                <div className="in-content">
                    {postItem.contacts.map((contact, index) => {
                        return <ContactItem item={contact} changeStatus={changeStatus} setContact={setContact} index={index} />

                    })}
                </div>

            </div>
            {contact ? <div className="contact-detail">
                <div className="contact-item">
                    <div className="ava-if">
                        <Avatar
                            style={{
                                backgroundColor: '#87d068', width: '55px', height: '55px'
                            }}
                            icon={<UserOutlined />}
                            src={contact.user.avatar ? contact.user.avatar : ""}
                        />

                        <span className="name" >

                            {contact.user.name}
                        </span>
                        <span className="feedback">
                            <div className="time">

                                {moment(contact.date).format("DD/MM/YYYY, HH:mm")}
                            </div>
                            <div className="res">
                                {contact.feedback}

                            </div>
                        </span>

                    </div>

                </div>
                <div className="action">
                    <button onClick={() => {
                        navigator.clipboard.writeText(contact.phone); messageApi.open({
                            type: 'success',
                            content: 'Đã sao chép',
                        });
                    }}>
                        <div class="text">
                            Số điện thoại
                        </div>
                        <div class="icons">
                            <div class="icons__icon">
                                <i class='bx bxs-phone-call'></i>
                            </div>
                            <div class="icons__content">

                                <span>

                                    {contact.phone}
                                </span>
                            </div>

                        </div>
                    </button>
                    <button className="email" onClick={() => {
                        navigator.clipboard.writeText(contact.user.email); messageApi.open({
                            type: 'success',
                            content: 'Đã sao chép',
                        });
                    }}>
                        <div class="text">
                            Gửi email
                        </div>
                        <div class="icons" >
                            <div class="icons__icon" >
                                <i className="fa-solid fa-envelope" style={{ color: '#E4405F' }}></i>
                            </div>
                            <div class="icons__content">

                                <span>

                                    {contact.user.email}
                                </span>
                            </div>

                        </div>
                    </button>



                </div>
            </div> : ''}

        </div> : <Empty description="Không có dữ liệu" style={{ marginTop: "10px" }} />}

    </React.Fragment>
};

const mapStateToProps = state => {

}

const mapDispatchToProps = {
    updatePost: PostActions.updatePost

}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
