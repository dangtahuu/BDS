import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { Button, Modal, Form, Input, Select, InputNumber, Breadcrumb } from 'antd';
import { EditOutlined, DeleteOutlined, ReadOutlined, ExclamationCircleOutlined, FullscreenOutlined } from '@ant-design/icons'
import 'moment/locale/vi';
import moment from 'moment';
import { FormatMoney } from '../../../../../../helpers/formatCurrency';
import { getFullAddress } from '../../../../../../helpers/formatAddress';
import { slug } from '../../../../../../helpers/slug'

import Map from './map';

import './info.scss'
const { confirm } = Modal;

const type = [{}, { title: "Cần bán", color: '#198754' }, { title: "Cho thuê", color: '#0d6efd' }]

const dataDirection = ["", "Đông", "Tây", "Nam", "Bắc", "Đông Nam", "Đông Bắc", "Tây Nam", "Tây Bắc"];
const dataLegal = ["", "Sổ đỏ/sổ hồng", "Giấy tờ hợp lệ", "Giấy phép xây dựng", "Giấy phép kinh doanh"]

const Info = (props) => {
    const { postItem } = props;
    const showConfirmDelete = () => {
        confirm({
            title: 'Bạn có chắc chắn muốn xóa bài đăng hay không?',
            icon: <ExclamationCircleOutlined />,
            content: 'Vui lòng xác nhận',
            okText: "Xóa",
            cancelText: "Hủy",

            onOk() {
                props.deletePost(postItem._id)
                setTimeout(() => {
                    window.location.reload(true);
                }, 2000);

            },
            onCancel() { },
        });
    }
    return <div className="info-postdetail">
        <div className="content">
            <Breadcrumb>
                <Breadcrumb.Item>
                    {postItem?.type ? type[postItem?.type].title : ''}
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <span>{postItem.province ? postItem.province.name : ''}</span>

                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <span>{postItem.district ? postItem.district.name : ''}</span>


                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <span>{postItem.ward ? postItem.ward.name : ''}</span>



                </Breadcrumb.Item>
                {postItem.address ? <Breadcrumb.Item>
                    <span>{postItem.address}</span>



                </Breadcrumb.Item> : ''}

            </Breadcrumb>
            <div className="detail">
                <div className="detail-info">

                    <span className="detail-title">

                        {postItem.title}
                    </span>


                    <div className="post-detail-info">
                        <div className="address">
                            <span><i class="fa-solid fa-location-dot"></i> {getFullAddress(postItem?.address, postItem.ward, postItem.district, postItem.province)}</span>
                        </div>
                        <div className="detail-type">
                            <span className="type radius">
                                {postItem?.type ? <span className="cn radius" style={{ background: type[postItem?.type].color }}>{type[postItem?.type].title}</span> : ''}

                                <span>
                                    {Array.isArray(postItem.categories) && postItem.categories.map(c =>
                                        <span className="cn" style={{ color: '#212529' }}>{c.name}</span>

                                    )}
                                </span>
                            </span>
                        </div>
                        <div className="price-acreage">

                            <div className="col">
                                <p>Giá</p>
                                <p style={{ color: '#2a59c6', fontWeight: 'bold' }}>{postItem.type === 1 ? FormatMoney(postItem.price) : FormatMoney(postItem.price) + " / tháng"}</p>
                                {postItem.type === 1 ? <p>~ {FormatMoney(postItem.price / postItem.acreage)}/m<sup>2</sup></p> : ''}

                            </div>

                            <div className="col">
                                <p>Diện tích</p>
                                <p style={{ color: '#2a59c6', fontWeight: 'bold' }}>{postItem.acreage} m<sup>2</sup></p>
                            </div>
                        </div>

                    </div>
                    {/* Không có bài viết mới hiện thị mô tả ngắn */}
                    {!postItem.description && <div style={{ fontSize: '16px' }} className="description">
                        <textarea readOnly={true} value={postItem.metaDescription} style={{ resize: 'none' }} />
                    </div>}

                    <hr />
                    <div className="post-detail-other-info">
                        <div className="post-detail-other-info-title title">
                            <span>Các thông tin khác</span>
                        </div>

                        <div className="post-detail-other-info-table">
                            <table>
                                <tbody>
                                    <tr>
                                        <td><span>Mặt tiền</span><span>{postItem.roadAhead ? postItem.roadAhead + " m" : "--"}</span></td>
                                        <td><span>Hướng</span><span>{postItem.direction ? dataDirection[postItem.direction] : "--"}</span></td>
                                    </tr>

                                    <tr>
                                        <td><span>Số lầu</span><span>{postItem.floorNumber ? postItem.floorNumber : "--"}</span></td>
                                        <td><span>Số phòng ngủ</span><span>{postItem.bedroomNumber ? postItem.bedroomNumber : "--"}</span></td>

                                    </tr>

                                    <tr>
                                        <td><span>Pháp lý</span><span>{postItem.legal ? dataLegal[postItem.legal] : "--"}</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="post-detail-other-info">
                        <div className="post-detail-other-info-title title">
                            <span>Tin đăng</span>
                        </div>

                        <div className="post-detail-other-info-table">
                            <table>
                                <tbody>
                                    <tr>
                                        <td><span>Loại tin đăng</span><span>{postItem.feeId && postItem.vipPoint ? "Tin " + postItem.feeId.name : "Tin thường"}</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* <Info postItem={postItem} /> */}
                    {postItem?.location?.lat &&
                        <React.Fragment>
                            <hr />
                            <Map location={postItem.location} />
                        </React.Fragment>}


                </div>


            </div>

        </div>
        <div className="action">
            <button>
                <div>
                    <EditOutlined />
                    <p>
                        <Link to={`/post-edit/${postItem._id}`}>Sửa tin</Link>
                    </p>
                </div>
            </button>
            <button>
                <div onClick={showConfirmDelete}>
                    <DeleteOutlined />
                    <p>
                        Xoá tin
                    </p>
                </div>
            </button>
            {postItem.status !== 1 ? <button>
                <div>
                    <FullscreenOutlined />
                    <p>
                        <Link to={`/detail/${slug(postItem.title)}.${postItem._id}.html`}>Xem tin trên Web</Link>

                    </p>
                </div>
            </button> : ''}

        </div>
    </div>

};

const mapStateToProps = state => {

}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Info);
