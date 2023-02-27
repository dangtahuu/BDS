import React from "react";
import { connect } from "react-redux";
import { FormatMoney } from '../../../../helpers/formatCurrency';
import { getFullAddress } from '../../../../helpers/formatAddress';
import { Input } from 'antd';
const dataDirection = ["", "Đông", "Tây", "Nam", "Bắc", "Đông Nam", "Đông Bắc", "Tây Nam", "Tây Bắc"];
const dataLegal = ["", "Sổ đỏ/sổ hồng", "Giấy tờ hợp lệ", "Giấy phép xây dựng", "Giấy phép kinh doanh"]

const Info = (props) => {
    const { postDetail } = props;
    const { TextArea } = Input;
    return <React.Fragment>
        <div className="post-detail-info">
            <div className="address">
                <span><i class="fa-solid fa-location-dot"></i> {getFullAddress(postDetail?.address, postDetail.ward, postDetail.district, postDetail.province)}</span>
            </div>
            <div className="price-acreage">

                <div className="col">
                    <p>Giá</p>
                    <p style={{ color: '#2a59c6', fontWeight: 'bold' }}>{postDetail.type === 1 ? FormatMoney(postDetail.price) : FormatMoney(postDetail.price) + " / tháng"}</p>
                    <p>{postDetail.type === 1 ? '~' + FormatMoney(postDetail.price / postDetail.acreage) + '/m2' : ''}</p>

                </div>

                <div className="col">
                    <p>Diện tích</p>
                    <p style={{ color: '#2a59c6', fontWeight: 'bold' }}>{postDetail.acreage} m<sup>2</sup></p>
                </div>
            </div>

        </div>
        {/* Không có bài viết mới hiện thị mô tả ngắn */}
        {!postDetail.description && <div style={{ fontSize: '16px' }} className="description">
            <textarea readOnly={true} value={postDetail.metaDescription} style={{ resize: 'none' }} />
        </div>}

        <hr />
        <div className="post-detail-other-info">
            <div className="post-detail-other-info-title title">
                <span>Tin đăng</span>
            </div>

            <div className="post-detail-other-info-table">
                <table>
                    <tbody>
                        <tr>
                            <td><span>Loại tin đăng</span><span>{postDetail.feeId ? "Tin " + postDetail.feeId.name : "Tin thường"}</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="post-detail-other-info">
            <div className="post-detail-other-info-title title">
                <span>Các thông tin khác</span>
            </div>

            <div className="post-detail-other-info-table">
                <table>
                    <tbody>
                        <tr>
                            <td><span>Mặt tiền</span><span>{postDetail.roadAhead ? postDetail.roadAhead + " m" : "--"}</span></td>
                            <td><span>Hướng</span><span>{postDetail.direction ? dataDirection[postDetail.direction] : "--"}</span></td>
                        </tr>

                        <tr>
                            <td><span>Số lầu</span><span>{postDetail.floorNumber ? postDetail.floorNumber : "--"}</span></td>
                            <td><span>Số phòng ngủ</span><span>{postDetail.bedroomNumber ? postDetail.bedroomNumber : "--"}</span></td>

                        </tr>

                        <tr>
                            <td><span>Pháp lý</span><span>{postDetail.legal ? dataLegal[postDetail.legal] : "--"}</span></td>


                        </tr>
                    </tbody>
                </table>
            </div>
        </div>


    </React.Fragment>
};

const mapStateToProps = state => {
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Info);