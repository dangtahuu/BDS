import React from 'react';
import { message } from 'antd';
import { EnvironmentOutlined, IdcardOutlined, FullscreenOutlined } from '@ant-design/icons';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import 'moment/locale/vi';
import moment from 'moment';

// import noImage from '../../assets/images/bds-no-image.png';
import { FormatMoney } from '../../helpers/formatCurrency';
import { getFullAddress } from '../../helpers/formatAddress';
import { slug } from '../../helpers/slug';
import { ratesAverage } from '../../helpers/ratesAverage';

import './styles.scss';

moment.locale('vi');

const SaleItem = (props) => {
    const { postItem } = props;
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();
    return (
        <React.Fragment>
            {contextHolder}
            <div className="sale-item">
                <div className="sale-item-avatar">
                    <img src={postItem.avatar ? postItem.avatar : ''} alt="" />
                </div>
                <div className="sale-item-info">


                    <div className="sale-item-title">
                        <div><IdcardOutlined />   Đã xác thực</div>
                        <div>
                            <span><i class='bx bx-history' ></i> {moment(postItem.createdAt).fromNow()}</span>
                        </div>
                    </div>
                    <div className="sale-item-content">

                        <div className='title'>
                            <Link to={`/detail/${slug(postItem.title)}.${postItem._id}.html`} >
                                <span style={{ color: postItem.vipPoint ? postItem.feeId.colorText : {} }}>{postItem.title}</span>
                            </Link>
                        </div>
                        <div>{postItem.metaDescription}</div>

                        <div className="sale-item-other-info">
                            <div>
                                <span >{postItem.acreage} m<sup>2</sup></span>

                                <span>{postItem.type === 1 ? FormatMoney(postItem.price) : FormatMoney(postItem.price) + " / tháng"}</span>
                                {postItem.type === 1 ? <span>~ {FormatMoney(postItem.price / postItem.acreage)}/m<sup>2</sup></span> : ''}

                            </div>

                            <div>
                                <EnvironmentOutlined style={{ color: "green" }} /> &ensp;
                                <span style={{ fontStyle: "italic" }}>{getFullAddress(postItem?.address, postItem.ward, postItem.district, postItem.province)}</span>
                            </div>
                        </div>
                    </div>

                    <div className='action'>
                        {postItem.vipPoint ? <button onClick={() => {
                            navigator.clipboard.writeText(postItem.userPhone); messageApi.open({
                                type: 'success',
                                content: 'Đã sao chép',
                            });
                        }}>
                            <div class="text">
                                <i class='bx bxs-phone-call'></i>

                                Số điện thoại
                            </div>
                            <div class="icons">
                                <div class="icons__icon">
                                    <i class='bx bxs-phone-call'></i>
                                </div>
                                <div class="icons__content">

                                    <span>

                                        {postItem.userPhone}
                                    </span>
                                </div>

                            </div>
                        </button> : ''}
                        <button onClick={() => {
                            navigate(`/detail/${slug(postItem.title)}.${postItem._id}.html`)
                        }}>
                            <div class="text">
                                <FullscreenOutlined />

                                Xem chi tiết
                            </div>
                            <div class="icons">
                                <div class="icons__icon">
                                    <FullscreenOutlined />

                                </div>
                                <div class="icons__content">

                                    <span>

                                        Chi tiết
                                    </span>
                                </div>

                            </div>
                        </button>

                    </div>

                </div>
            </div>
        </React.Fragment>

    );
};

export default SaleItem;
