import React, { useState } from "react";
import { connect } from "react-redux";
import { Form, Select, Radio, DatePicker } from 'antd';
import dayjs from 'dayjs';
import 'moment/locale/vi';
import moment from 'moment';
import { FormatMoney } from '../../../../../helpers/formatCurrency';
import { FeeActions } from '../../../../fee/redux/actions';

import './styles.scss';

const { Option } = Select;

const VIP = (props) => {
    const { listFees = [] } = props.fee;
    const [day, setDay] = useState(0)
    const [fee, setFee] = useState(0)
    const [vipPoint, setVipPoint] = useState(null)

    const [queryData] = useState({
        limit: 1000,
        page: 1
    })

    return <React.Fragment>
        <div className="form-item">
            <div className="post-add-item-header-map post-add-item-header">
                <span>Tin đăng nổi bật</span>
            </div>
            <p style={{ color: "#d33320", margin: "1.5rem 0" }}>Mua gói VIP sẽ giúp bài đăng của bạn xuất hiện trên trang đầu,
                gói VIP càng cao bài đăng càng được ưu tiên</p>

            <Form.Item
                name="vipType"
            >
                {/* <Select onChange={(value) => props.getAllFees({ ...queryData, type: value })}>
                <Option value={0}>Tin thường</Option>
                <Option value={1}>Tin VIP</Option>
            </Select> */}
                <Radio.Group optionType="button"
                    buttonStyle="solid">
                    <Radio value={0} onChange={(value) => { props.getAllFees({ ...queryData, type: value.target.value }) }}>
                        Tin thường
                    </Radio>
                    <Radio value={1} onChange={(value) => props.getAllFees({ ...queryData, type: value.target.value })}>
                        Tin VIP
                    </Radio>
                </Radio.Group>
            </Form.Item>
            {listFees.length !== 0 ?
                <div className="selectFee">
                    <div style={{ display: 'flex', width: '50%' }}>
                        <div style={{ width: '50%' }}>
                            <Form.Item
                                name="feeId"
                                label="Loại tin đăng"
                                style={{ marginRight: '1.5rem' }}
                                rules={[
                                    {
                                        required: true,
                                        message: '',
                                    },
                                ]}
                            >
                                <Select >
                                    {listFees.map(f => (
                                        <Option value={f._id} key={f._id}>
                                            <div onClick={() => { setFee(f); setVipPoint(f.point) }}>
                                                <span>{f.name} - {f.fee.toLocaleString('vi', { style: 'currency', currency: 'VND' })}/ngày</span>
                                            </div>

                                        </Option>
                                    ))}
                                </Select>


                            </Form.Item>
                            {vipPoint ? <p >
                                Khả năng tiếp cận gấp <span style={{ color: "#d33320", margin: "1.5rem 0" }}>{vipPoint}</span> lần tin thường</p> : ''}

                        </div>


                        <Form.Item
                            name="day"
                            label="Thời hạn VIP"
                            style={{ marginRight: '1.5rem', width: '50%' }}
                            rules={[
                                {
                                    required: true,
                                    message: '',
                                },
                            ]}
                        >
                            <DatePicker
                                format="DD/MM/YYYY"
                                disabledDate={(current) =>
                                    current && current < dayjs().add(6, 'day')
                                }
                                onChange={(value) => setDay(moment(value).diff(moment(), 'days') + 1)}
                                style={{ width: '100%' }}

                            />

                        </Form.Item>

                    </div>
                    {fee ?
                        <div className="payment">

                            <h2>Thanh toán</h2>
                            <ul>
                                <li>
                                    <span>Loại tin</span>
                                    <span>{fee.name ? fee.name : ''}</span>
                                </li>
                                <li>
                                    <span>Đơn giá / ngày</span>
                                    <span>{fee.fee ? fee.fee.toLocaleString('vi', { style: 'currency', currency: 'VND' }) : ''}</span>

                                </li>
                                {day ?
                                    <li>
                                        <span>Thời gian đăng tin</span>
                                        <span style={{ display: 'grid' }}>
                                            <span style={{ display: 'flex', justifyContent: 'flex-end' }}>

                                                {day} ngày
                                            </span>

                                            <span style={{ fontSize: '1.2rem', color: 'rgb(153, 153, 153)', fontWeight: '100' }}>
                                                {moment().format('L') + ' -> ' + moment().add(day, 'days').format('L')}
                                            </span>
                                        </span>

                                    </li> : ''}
                                <li className="payment-total">
                                    <span>Tổng tiền</span>
                                    <span style={{ fontSize: '2rem' }}>{fee.fee ? ((day ? day : 0) * fee.fee).toLocaleString('vi', { style: 'currency', currency: 'VND' }) : ''}</span>
                                </li>
                            </ul>

                        </div> : ''}
                </div>
                : ''}

        </div>


    </React.Fragment>
}

const mapStateToProps = state => {
    const { fee } = state;
    return { fee };
}

const mapDispatchToProps = {
    getAllFees: FeeActions.getAllFees
}

export default connect(mapStateToProps, mapDispatchToProps)(VIP);