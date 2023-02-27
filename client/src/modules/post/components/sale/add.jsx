import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { redirect, useNavigate } from 'react-router-dom';
import Container from '../../../../modules/user/container';
import Card from '../../../../components/card';
import { Form, Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment, { now } from 'moment';
//helpers
import { FormatMoney } from '../../../../helpers/formatCurrency';

//Actions
import { PostActions } from '../../redux/actions';
import { UserActions } from '../../../user/redux/actions';

//Components
import Detail from '../common/add/detail';
import Info from '../common/add/info';
import OtherInfo from '../common/add/otherInfo';
import Map from '../common/add/map';
import AvatarUpload from '../common/add/avatarUpload';
import ImageUpload from '../common/add/imagesUpload';
import VIP from '../common/add/vip';

import './add.scss'
const { confirm } = Modal;

const PostSaleAdd = (props) => {
    const { post, auth, user, fee } = props;
    const navigate = useNavigate()
    const { listFees = [] } = fee;
    const { userDetail = { balance: 0 } } = user;
    const { postCreated = {} } = post;
    const [form] = Form.useForm()
    const [loaded, setLoaded] = useState(false);

    const [location, setLocation] = useState(null);

    const [avatar, setAvatar] = useState([]);

    const [images, setImages] = useState([]);

    const [type, setType] = useState(0);

    useEffect(() => {
        if (!loaded) {
            setLoaded(true)
            props.getDetailUser(auth?.user?._id)
        }
    }, [])

    const onSubmit = async (values) => {
        let imagesUploaded = await uploadImage();
        if (imagesUploaded?.avatar?.length) {
            values.avatar = imagesUploaded.avatar[0];
        }

        if (imagesUploaded?.images?.length) {
            values.images = imagesUploaded.images;
        }

        values.location = location;

        console.log("v", values)
        await props.createPost(values);
        setTimeout(() => {
            navigate('/user-post')
        }, 1000);
    };
    const uploadImage = async (values) => {
        let avatarUpload = new FormData();
        let imagesUpload = new FormData();
        let hasUpload = false;

        if (images?.length) {
            images.forEach((e) => {
                if (e.originFileObj) {
                    imagesUpload.append("file", e.originFileObj);
                    imagesUpload.folder = "images";

                    if (!hasUpload) hasUpload = true;
                }
            })
        }

        if (avatar?.length) {
            if (avatar[0].originFileObj) {
                avatarUpload.append("file", avatar[0].originFileObj);
                avatarUpload.folder = "avatar";

                if (!hasUpload) hasUpload = true;
            }
        }

        if (hasUpload) {
            await props.requestUploading()
            const data = await PostActions.uploadAvatarAndImage(avatarUpload, imagesUpload);
            return data;
        }

        return undefined;
    }

    const checkPayment = (values) => {
        if (!values.feeId) {
            onSubmit(values)
        } else {
            const vipInfo = listFees.find(f => values.feeId === f._id)
            values.day = moment(values.day).diff(moment(), 'days') + 1
            if (vipInfo) {
                values.vipFee = vipInfo.fee;
                values.vipPoint = vipInfo.point;
                if (vipInfo.fee * values.day <= userDetail.balance) {
                    confirmPayment(values)
                } else {
                    confirmRecharge(values)
                }
            }
        }
    }

    const confirmPayment = (values) => {
        const vipInfo = listFees.find(f => values.feeId === f._id)
        confirm({
            title: `Xác nhận thanh toán ${FormatMoney(vipInfo.fee * values.day)} (vnđ) cho bài đăng`,
            icon: <ExclamationCircleOutlined />,
            content: 'Vui lòng xác nhận',
            okText: "Thanh toán",
            cancelText: "Hủy",

            onOk() {
                onSubmit(values)
            },
            onCancel() { },
        });
    }

    const confirmRecharge = (values) => {
        confirm({
            title: `Số dư tài khoản của bạn không đủ, vui lòng nạp thêm tiền vào tài khoản!`,
            icon: <ExclamationCircleOutlined />,
            content: 'Vui lòng xác nhận',
            okText: "Nạp tiền",
            cancelText: "Hủy",

            onOk() {
                navigate("/recharge")
            },
            onCancel() { },
        });
    }

    if (postCreated?._id) redirect(`/post-edit/${postCreated._id}`);

    return <Container>
        <span style={{ fontSize: '1.8rem' }}>

            Đăng tin nhà đất
        </span>

        <Form
            layout="vertical"
            name="post"
            form={form}
            onFinish={checkPayment}
        >
            <Info
                form={form}
                type={type}
                setType={setType}
                categories={[]}
            />
            <Detail
                type={type}
                setType={setType}
                form={form}
            />


            <OtherInfo />
            <div className="form-item">
                <div className="post-add-item-header">
                    <span>Hình ảnh nhà đất</span>
                </div>
                <Card.Body>

                    <AvatarUpload
                        avatar={avatar}
                        setAvatar={setAvatar}
                    />

                    <ImageUpload
                        images={images}
                        setImages={setImages}
                    />

                </Card.Body>
            </div>

            <Map
                onChangeLocation={setLocation}
                location={location}
            />

            <VIP />

            <Card.Footer styles={{ textAlign: "right" }}>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={post.isLoading} className="but-post">
                        Đăng bài
                    </Button>
                </Form.Item>
            </Card.Footer>
        </Form>


    </Container>
};

const mapStateToProps = state => {
    const { post, auth, user, fee } = state
    return { post, auth, user, fee };
}

const mapDispatchToProps = {
    createPost: PostActions.createPost,
    requestUploading: PostActions.requestUploading,
    getDetailUser: UserActions.getDetailUser
}

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostSaleAdd));
export default (connect(mapStateToProps, mapDispatchToProps)(PostSaleAdd));
