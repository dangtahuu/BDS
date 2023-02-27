import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Avatar, Breadcrumb, message, Modal, Form, Input, Button } from "antd";

import { UserOutlined, PhoneOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import 'moment/locale/vi';
import moment from 'moment';
import Container from '../../../../components/container';
import Card from '../../../../components/card';
import Loading from '../../../../components/loading';

import ImagesList from './ImagesList';
import Info from './info';
import Map from './map';
import Interaction from './interaction';

import { PostActions } from '../../redux/actions';

// import '../../../../common-css/scroll.scss';
import './styles.scss';
const type = [{}, { title: "Cần bán", color: '#198754' }, { title: "Cho thuê", color: '#0d6efd' }]
const { TextArea } = Input;
const DetailPost = (props) => {
    const { post, postId = "", auth } = props;
    const { isAuth, user } = auth;
    const { postDetail = {} } = post;
    const param = useParams();
    const [loaded, setLoaded] = useState(false);
    const [contact, setContact] = useState(false);
    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            props.getPostDetail(param.id || postId);
        }
    }, [])

    useEffect(() => {
        if (postId) {
            props.getPostDetail(postId);
        }
    }, [postId])
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm()
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
        props.contact(postDetail._id, dataFormat);
        setTimeout(() => {
            window.location.reload(true);
        }, 1000);
    }
    const submitAddForm = async (values) => {
        const newFeedback = {
            fullName: values.fullName,
            phone: values.phone,
            feedback: values.feedback,
            user: { _id: user._id },
            status: false,
            date: new Date()
        };
        let data = {
            contacts: [...[newFeedback], ...postDetail.contacts]
        }
        _contact(data);

    }
    return <Container>
        {contextHolder}
        {post.isLoading && <Loading />}
        <Breadcrumb>
            <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
            <Breadcrumb.Item>
                {postDetail?.type ? type[postDetail?.type].title : ''} {Array.isArray(postDetail.categories) && postDetail.categories.map(c => <span>{c.name} </span>)}
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <span>{postDetail.province ? postDetail.province.name : ''}</span>

            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <span>{postDetail.district ? postDetail.district.name : ''}</span>


            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <span>{postDetail.ward ? postDetail.ward.name : ''}</span>



            </Breadcrumb.Item>
            {postDetail.address ? <Breadcrumb.Item>
                <span>{postDetail.address}</span>



            </Breadcrumb.Item> : ''}

        </Breadcrumb>
        <div className="detail">
            <div className="detail-info">
                {postDetail.images && postDetail.images.length && postDetail.images.length !== 0 ?
                    <React.Fragment>
                        <hr />


                        <ImagesList images={postDetail.images} />

                    </React.Fragment> : ''
                }
                <span className="detail-title">

                    {postDetail.title}
                </span>

                <div className="detail-type">
                    <span className="type radius">
                        {postDetail?.type ? <span className="cn radius" style={{ background: type[postDetail?.type].color }}>{type[postDetail?.type].title}</span> : ''}
                        <span>
                            {Array.isArray(postDetail.categories) && postDetail.categories.map(c =>
                                <Link className="cn" to={`/post-cat/${c._id || ""}`} style={{ color: '#212529' }}>{c.name}</Link>

                            )}
                        </span>
                    </span>
                    <span className="time">
                        <i className='bx bx-history' style={{ marginRight: '3px', fontSize: '15px' }}></i> {moment(postDetail.createdAt).fromNow()}
                    </span>
                </div>

                <Info postDetail={postDetail} />
                {postDetail?.location?.lat &&
                    <React.Fragment>
                        <hr />
                        <Map location={postDetail.location} />
                    </React.Fragment>}
                {postDetail.status === 2 ? <Interaction
                    postDetail={{ ...postDetail }}
                /> : ''}

            </div>

            <div className="account-relative">
                <div className="account-sticky">
                    <div className="account">
                        <Avatar
                            style={{
                                backgroundColor: '#87d068', width: '80px', height: '80px'
                            }}
                            icon={<UserOutlined />}
                            src={postDetail.userAvatar ? postDetail.userAvatar : ""}
                        />
                        <span style={{ marginLeft: '10px', fontSize: '18px', fontWeight: 'bold', paddingTop: '10px' }} className="detail">
                            <span>

                                {postDetail.userName}
                            </span>
                            <span>
                                <ul className="wrapper">
                                    <li className="icon email" style={{ marginLeft: '0' }}>
                                        <span className="tooltip">{postDetail.userEmail}</span>
                                        <span><i className="fa-solid fa-envelope"></i></span>
                                    </li>
                                    <li className="icon phone" style={{ marginRight: '0' }}>
                                        <span className="tooltip">{postDetail.userPhone}</span>
                                        <span><i className="fa-solid fa-phone"></i></span>
                                    </li>
                                </ul>
                            </span>
                        </span>
                    </div>
                    <div className="action">
                        <button onClick={() => {
                            navigator.clipboard.writeText(postDetail.userPhone); messageApi.open({
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

                                        {postDetail.userPhone}
                                    </span>
                                </div>

                            </div>
                        </button>
                        <button className="email" onClick={() => {
                            navigator.clipboard.writeText(postDetail.userEmail); messageApi.open({
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

                                        {postDetail.userEmail}
                                    </span>
                                </div>

                            </div>
                        </button>
                        {isAuth && postDetail.status === 2 ? <button onClick={() => setContact(true)}>
                            <div class="text">
                                Yêu cầu liên hệ lại
                            </div>
                            <div class="icons">
                                <div class="icons__icon" style={{ paddingLeft: '0' }}>
                                    <i class="fa-solid fa-paper-plane"></i>
                                </div>
                                <div class="icons__content">

                                    <span>
                                        Gửi tin nhắn
                                    </span>
                                </div>

                            </div>
                        </button> : ''}

                        <Modal
                            title='Yêu cầu liên hệ'
                            centered
                            open={contact}
                            footer={null}
                            onCancel={() => setContact(false)}

                        >
                            {/* {console.log(data)} */}
                            <Form
                                form={form}
                                name="basic"
                                onFinish={submitAddForm}
                                initialValues={{ phone: user.phone, feedback: 'Tôi quan tâm đến bất động sản này.' }}
                            >

                                <p>
                                    Yêu cầu người đăng tin liên hệ theo thông tin dưới đây
                                </p>
                                <Form.Item
                                    name="fullName"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input placeholder="Họ và tên" />
                                </Form.Item>

                                <Form.Item
                                    name="phone"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input placeholder="Số điện thoại" />
                                </Form.Item>

                                <p>
                                    Lời nhắn
                                </p>
                                <Form.Item
                                    name="feedback"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <TextArea placeholder="Số điện thoại" />
                                </Form.Item>
                                <Form.Item >
                                    <Button type="primary" htmlType="submit" loading={post.isLoading}>
                                        Gửi yêu cầu
                                    </Button>
                                </Form.Item>
                            </Form>

                        </Modal>
                    </div>

                </div>

            </div>
        </div>



    </Container>
};

const mapStateToProps = state => {
    const { post, auth } = state;
    return { post, auth };
}

const mapDispatchToProps = {
    getPostDetail: PostActions.getPostDetail,
    contact: PostActions.contact
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPost);