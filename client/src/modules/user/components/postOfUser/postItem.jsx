import React, { useState } from "react";
import { connect } from "react-redux";
import { EditOutlined, DeleteOutlined, ReadOutlined, ExclamationCircleOutlined,EnvironmentOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import { Modal } from 'antd';

import { FormatMoney } from '../../../../helpers/formatCurrency';
import { getFullAddress } from '../../../../helpers/formatAddress';

import { PostActions } from '../../../post/redux/actions';
import DetailPost from './detailPostItem'
import 'moment/locale/vi';
import moment from 'moment';
const { confirm } = Modal;

const dataStatus = [{},
{ title: "Đang chờ", color: "#FFE4C4" },
{ title: "Đã duyệt", color: "#00FFFF" },
{ title: "Đã hủy", color: "#DC143C" }]
const type = [{}, { title: "Cần bán", color: '#198754' }, { title: "Cho thuê", color: '#0d6efd' }]
const PostItem = (props) => {
    const { postItem } = props;
    const [visible, setVisible] = useState(false);

    const showConfirmDelete = () => {
        confirm({
            title: 'Bạn có chắc chắn muốn xóa bài đăng hay không?',
            icon: <ExclamationCircleOutlined />,
            content: 'Vui lòng xác nhận',
            okText: "Xóa",
            cancelText: "Hủy",

            onOk() {
                props.deletePost(postItem._id)
                // setTimeout(() => {
                //     window.location.reload(true);
                // }, 2000);

            },
            onCancel() { },
        });
    }

    return (
        // <tr>
        //     <td>{index}</td>

        //     <td className="user-post-item-avatar">
        //         <img src={postItem.avatar} alt="Ảnh"/>
        //     </td>

        //     <td>
        //         <div className="user-post-item-title">
        //             <Link to={`/post-edit/${postItem._id}`}>{ postItem.title }</Link>
        //         </div>
        //         <div>
        //             <EnvironmentOutlined style={{color: "green"}}/> &ensp;
        //             <span style={{ fontStyle: "italic" }}>
        //                 {getFullAddress(postItem?.address, postItem.ward, postItem.district, postItem.province)}
        //             </span>
        //         </div>
        //     </td>

        //     <td>
        //         {FormatMoney(postItem.price)}
        //     </td>

        //     <td style={{ color: `${postItem.status ? dataStatus[postItem.status].color : "black"}` }}>
        //         {postItem.status ? dataStatus[postItem.status].title : "--"}
        //     </td>

        //     <td className="user-post-list-delete">
        //         <DeleteOutlined title="Xóa" onClick={showConfirmDelete} />
        //     </td>
        // </tr>
        <div className="user-item-post">
            <div className="user-post-item">
                <div>
                    <div className="user-post-item-info">
                        <div className="image" style={{ paddingRight: "14px" }}>
                            <img src={postItem.avatar ? postItem.avatar : 'no_image.png'} alt="Ảnh" />
                        </div>
                        <div className="content-info">
                            <div className="content-info-title">
                                <h3 className="content-info-description" type="primary">
                                    {postItem.title}
                                </h3>
                                <div className="content-info-type" type="secondary">
                                    <span className="type radius">
                                        <span className="cn radius" style={{ background: type[postItem.type].color }}>{type[postItem.type].title}</span>
                                        <span>
                                            {Array.isArray(postItem.categories) && postItem.categories.map(c =>
                                                <span className="cn" style={{ background: type[postItem.type].color }}>{c.name}</span>
                                            )}
                                        </span>
                                    </span>
                                </div>

                                <div className="content-info-type" type="secondary">
                                    <EnvironmentOutlined style={{ color: "green" }} /> &ensp;
                                    <span style={{ fontStyle: "italic" }}>{getFullAddress(postItem?.address, postItem.ward, postItem.district, postItem.province)}</span>
                                </div>
                            </div>
                            <div className="content-info-detail">
                                <div className="status next first">
                                    <div className="column">
                                        <span className="title"> Trạng thái </span>

                                        <span className="detail">
                                            <div className="status" style={{ background: `${postItem.status ? dataStatus[postItem.status].color : "black"}`, width: '50%' }}>
                                                {postItem.status ? dataStatus[postItem.status].title : "--"}
                                            </div>
                                        </span>
                                    </div>
                                </div>
                                <div className="price next">
                                    <div className="column">
                                        <span className="title"> Giá </span>
                                        <span className="detail"> {postItem.type === 1 ? FormatMoney(postItem.price) : FormatMoney(postItem.price) + "/tháng"} </span>
                                    </div>
                                </div>
                                <div className="acreage next">
                                    <div className="column">
                                        <span className="title"> Diện tích </span>
                                        <span className="detail"> {postItem.acreage} m<sup>2</sup> </span>
                                    </div>
                                </div>
                                <div className="createdAt next">
                                    <div className="column">
                                        <span className="title"> Ngày đăng </span>
                                        <span className="detail"> {moment(postItem.createdAt).format('DD/MM/YYYY')} </span>
                                    </div>
                                </div>
                                {postItem.feeId ? <div className="createdAt next">
                                    <div className="column">
                                        <span className="title"> Ngày hết hạn </span>
                                        <span className="detail"> {moment(postItem.vipExpirationDate).format('DD/MM/YYYY')} </span>
                                    </div>
                                </div> : ''}

                                <div className="next">
                                    {/* <div style="width: 25%"></div> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="action" style={{ marginTop: '12px' }}>
                        <div className="sc-fXoxut isRlq">
                            <div className="sc-Fyfyc fTMjUf">
                                <div type="primary" className="sc-crrsfI fAPcKa">#1</div>
                            </div>
                        </div>
                        <div className="action">
                            <button onClick={() => setVisible(true)}>
                                <div>
                                    <ReadOutlined />
                                    <p>
                                        Chi tiết
                                    </p>
                                </div>
                            </button>
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
                        </div>
                    </div>

                    < DetailPost
                        visible={visible}
                        setVisible={setVisible}
                        postItem={{ ...postItem }}
                    // submitAddForm={submitAddForm}
                    />
                </div>
            </div>
        </div>)
};

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = {
    deletePost: PostActions.deletePost
}

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);