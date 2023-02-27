import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Modal, Form, Input, Select, InputNumber, Breadcrumb, Avatar } from 'antd';
import { EditOutlined, DeleteOutlined, ReadOutlined, ExclamationCircleOutlined, FullscreenOutlined, UserOutlined, EyeOutlined } from '@ant-design/icons'
import 'moment/locale/vi';
import moment from 'moment';
import { FormatMoney } from '../../../../../../helpers/formatCurrency';
import { getFullAddress } from '../../../../../../helpers/formatAddress';
import { slug } from '../../../../../../helpers/slug'
import { PostActions } from "../../../../../post/redux/actions";

const ContactItem = (props) => {
    const { item, postItem, changeStatus, setContact } = props;
    const [status, setStatus] = useState(item.status)
    return <React.Fragment>
        {/* <div className="post-list-comment">
            
        </div> */}
        <div className="contact-item" onClick={() => { if (!status) { changeStatus(item._id); setStatus(true); setContact(item) } else { setContact(item) } }}>
            <div className="ava-if">
                <Avatar
                    style={{
                        backgroundColor: '#87d068', width: '55px', height: '55px'
                    }}
                    icon={<UserOutlined />}
                    src={item.user.avatar ? item.user.avatar : ""}
                />
                <div className="info">
                    <span className="name" style={status ? {} : { fontWeight: 'bold' }}>

                        {item.user.name}
                    </span>
                    <span className="feedback" style={status ? { color: '#8d8b8b' } : { fontWeight: 'bold' }}>
                        <div className="res">
                            {item.feedback}

                        </div>
                        <div className="time">

                            • {moment(item.date).format("DD/MM/YYYY . HH:mm")}
                        </div>
                    </span>
                </div>
            </div>


            <div className="status">
                {!status ? '•' : ''}
            </div>

        </div>
    </React.Fragment>
};

const mapStateToProps = state => {

}

const mapDispatchToProps = {
    contact: PostActions.contact

}

export default connect(mapStateToProps, mapDispatchToProps)(ContactItem);
