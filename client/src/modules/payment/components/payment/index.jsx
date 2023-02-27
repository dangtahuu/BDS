import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import moment from 'moment';
import { Table, Empty, Pagination, Modal, Form, Select, Button } from 'antd';
import { ReadOutlined, DollarOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';

import { FormatMoney } from '../../../../helpers/formatCurrency';
import { slug } from '../../../../helpers/slug';

import { PaymentActions } from '../../redux/actions';

import Container from '../../../../modules/user/container';
import Card from '../../../../components/card';
import Loading from '../../../../components/loading';

import './styles.scss';
const { Option } = Select;

const dataPayments = [
    {}, { title: 'Nạp tiền', change: '+', color: '#28A745' }, { title: 'Thanh toán', change: '-', color: '#DC3545' }, { title: ' Hoàn tiền', change: '+', color: '#7aeb7a' }, { title: 'Khách hàng thanh toán', change: '+', color: '#28A745' }, { title: 'Hoàn tiền cho khách', change: '-', color: '#DC3545' }
]
const Payment = (props) => {
    const { payment } = props;
    const { user } = useSelector(state => state.auth);
    const { listPayments = [] } = payment;

    const [queryData, setQueryData] = useState({
        page: 1,
        limit: 10,
    })

    const [loaded, setLoaded] = useState(false);
    const [detail, setDetail] = useState(false);
    const [data, setData] = useState({});
    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            props.getAllPayments(queryData);
        }
    }, [])

    useEffect(() => {
        props.getAllPayments(queryData);
    }, [queryData])

    const columns = [
        {
            key: 'createdAt',
            dataIndex: 'createdAt',
            title: 'Ngày',
            width: '15%',
            sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
            render: (data, record) => {
                return (
                    <span>{moment(new Date(data)).format("HH:mm - DD/MM/YYYY")}</span>
                )
            }
        },
        {
            key: 'type',
            dataIndex: 'type',
            title: 'Loại giao dịch',
            width: '17%',
            render: (data) => {
                return (<span style={{ color: dataPayments[data].color }}>{dataPayments[data].title}</span>)
            }
        },
        {
            key: 'transaction',
            dataIndex: 'transaction',
            title: 'Tiền giao dịch',
            width: '15%',
            render: (data, record) => {
                return (<span style={{ color: dataPayments[record.type].color }}>{dataPayments[record.type].change}{data.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>)
            }
        },

        {
            key: 'balance',
            dataIndex: 'balance',
            title: 'Số dư',
            width: '15%',
            render: (data) => {
                return (<span >{data ? data.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }) : ''}</span>)
            }
        },
        {
            key: 'note',
            dataIndex: 'note',
            title: 'Ghi chú',
            width: '30%',
            render: (data) => {
                return (<span >{data}</span>)
            }
        },
        {
            key: 'detail',
            dataIndex: 'detail',
            title: 'Chi tiết',
            width: '10%',
            render: (data, record) => {
                return (<span onClick={() => { setDetail(true); setData(record) }}>
                    <div style={{ paddingLeft: '20px' }}>
                        <ReadOutlined />
                    </div>
                </span>)
            }
        },
    ];
    const submitFilter = (values) => {
        setQueryData({ ...queryData, ...values })
    }
    return <Container>
        {payment.isLoading && <Loading />}
        {/* <Card > */}
        {/* <Card.Header>Lịch sử thanh toán</Card.Header> */}
        <h2 style={{ fontWeight: 'bold' }}>Thông tin giao dịch</h2>
        <Form
            layout="vertical"
            name="category-filter"
            onFinish={submitFilter}
            className="filter-table"
        >

            <Form.Item
                name="type"
            >
                <Select placeholder="Loại giao dịch" style={{ width: '200px' }}>
                    <Option value={undefined}>Tất cả</Option>
                    <Option value={1}>Nạp tiền</Option>
                    <Option value={2}>Thanh toán</Option>
                    <Option value={3}>Hoàn tiền</Option>
                    {user.role === 3 ? <>

                        <Option value={4}>Khách hàng thanh toán</Option>
                        <Option value={5}>Hoàn tiền cho khách</Option>
                    </> : ''}

                </Select>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Tìm kiếm
                </Button>
            </Form.Item>
        </Form>
        {/* <Card.Body> */}
        {listPayments?.length !== 0 ?
            <Table
                columns={columns}
                dataSource={listPayments}
                pagination={false}
            /> :
            <Empty description="Không có dữ liệu" />
        }
        {/* </Card.Body> */}
        <Modal
            // title={data!=={}?dataPayments[data.type].title:""}
            centered
            open={detail}
            footer={null}
            closable={false}
            onCancel={() => setDetail(false)}
        >
            {/* {console.log(data)} */}
            {data !== {} ? (
                <div className="modal-transaction">
                    <div className="type">
                        <div className="icon">

                            <DollarOutlined twoToneColor="#eb2f96" />
                        </div>
                        <div className="transaction" style={data.type ? { color: dataPayments[data.type].color } : ''}>
                            <span>
                                {data.type ? dataPayments[data.type].title : '  '}
                            </span>
                            <span >
                                {data.type ? dataPayments[data.type].change : ''}{data.transaction ? data.transaction.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }) : ''}
                            </span>
                        </div>
                    </div>
                    <div className="time">
                        <ul>
                            <li>
                                <span>Thời gian</span>
                                <span>{moment(new Date(data.createdAt)).format("HH:mm - DD/MM/YYYY")}</span>
                            </li>
                        </ul>
                    </div>
                    <div className="info-transaction">
                        <ul>
                            {data.type === 1 ?
                                <>
                                    <li>
                                        <span>Nguồn tiền</span>
                                        <span>{data.bankName} {data.bankAccount}</span>
                                    </li>
                                    <li>
                                        <span>Chủ tài khoản</span>
                                        <span>{data.bankOwer}</span>
                                    </li>
                                </> :
                                <>
                                    <li>
                                        <span>Bài đăng</span>
                                        <span className="title-post" title={data.post ? data.post.title : ''}>{data.post ? data.post.title : 'Đã xoá'}</span>
                                    </li>
                                    {data.post ? <li>
                                        <span>Thời hạn</span>
                                        <span>{moment(new Date(data.post.createdAt)).format("DD/MM/YYYY")} - {moment(new Date(data.post.vipExpirationDate)).format("DD/MM/YYYY")}</span>
                                    </li> : ''}

                                </>}
                        </ul>
                    </div>
                    <div className="balance">
                        <span>Số dư sau giao dịch</span>
                        <span>{data.balance ? data.balance.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }) : ''}</span>
                    </div>
                </div>
            ) : ''}

        </Modal>
        <Card.Footer styles={{ textAlign: "right" }}>
            <Pagination
                total={payment.totalDocs}
                current={queryData.page}
                pageSize={queryData.limit}
                onChange={(page, pageSize) => {
                    setQueryData({ ...queryData, page, limit: pageSize })
                }}
                showSizeChanger
                showQuickJumper
                pageSizeOptions={[5, 10, 15, 20, 50]}
                showTotal={total => `Tổng ${total} mục`}
            />
        </Card.Footer>
        {/* </ Card> */}

    </Container>
};

const mapStateToProps = state => {
    const { payment } = state;
    return { payment }
}

const mapDispatchToProps = {
    getAllPayments: PaymentActions.getAllPayments
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);