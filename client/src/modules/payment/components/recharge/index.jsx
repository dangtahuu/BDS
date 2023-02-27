import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import moment from 'moment';
import { Button, Table, Empty, Pagination } from 'antd';

import { FormatMoney } from '../../../../helpers/formatCurrency';

import { PaymentActions } from '../../redux/actions';
import { UserActions } from '../../../user/redux/actions';

import Container from '../../../../modules/user/container';
import Card from '../../../../components/card';
import Loading from '../../../../components/loading';

import AddForm from './addForm';

import './styles.scss';

const ReCharge = (props) => {
    const { payment, auth, user } = props;
    const { listPayments = [] } = payment;
    const { userDetail = {} } = user;

    const [queryData, setQueryData] = useState({
        page: 1,
        limit: 10,
        type: 1
    })

    const [loaded, setLoaded] = useState(false);

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            props.getAllPayments(queryData);
        }
    }, [])

    useEffect(() => {
        props.getAllPayments(queryData);
    }, [queryData])

    useEffect(() => {
        props.getDetailUser(auth?.user?._id)
    }, [listPayments])

    const columns = [
        {
            key: 'transaction',
            dataIndex: 'transaction',
            title: 'Tiền giao dịch',
            width: '20%',
            render: (data) => {
                return (<span>{FormatMoney(data)}</span>)
            }
        },
        {
            key: 'bankName',
            dataIndex: 'bankName',
            title: 'Tên ngân hàng',
            width: '20%'
        },
        {
            key: 'bankAccount',
            dataIndex: 'bankAccount',
            title: 'Số tài khoản',
            width: '20%'
        },
        {
            key: 'bankOwer',
            dataIndex: 'bankOwer',
            title: 'Chủ tài khoản',
            width: '20%'
        },
        {
            key: 'createdAt',
            dataIndex: 'createdAt',
            title: 'Ngày nạp tiền',
            width: '20%',
            sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
            render: (data, record) => {
                return (
                    <span>{moment(new Date(data)).format("hh:mm - DD/MM/YYYY")}</span>
                )
            }
        },
    ];

    const submitAddForm = async (values) => {
        values.type = 1;
        values.note = 'Khách hàng nạp tiền vào tài khoản'
        values.balance = userDetail?.balance + values.transaction
        await props.createPayment(values);
        await setVisible(false);
    }

    return <Container>
        {payment.isLoading && <Loading />}
        <Card >
            <Card.Header>
                Lịch sử nạp tiền
                <Button
                    type="primary" style={{ float: "right" }}
                    onClick={() => setVisible(true)}
                >
                    Nạp tiền
                </Button>
            </Card.Header>
            <Card.Body>
                <div style={{ marginBottom: "10px" }}>
                    <b>Số dư tài khoản: &ensp;
                        <span style={{ color: "red" }}>{FormatMoney(userDetail.balance || 0)}</span>
                    </b>
                </div>

                {listPayments?.length !== 0 ?
                    <Table
                        columns={columns}
                        dataSource={listPayments}
                        pagination={false}
                    /> :
                    <Empty description="Không có dữ liệu" />
                }

                < AddForm
                    visible={visible}
                    setVisible={setVisible}
                    submitAddForm={submitAddForm}
                />
            </Card.Body>

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
        </ Card>

    </Container>
};

const mapStateToProps = state => {
    const { payment, auth, user } = state;
    return { payment, auth, user }
}

const mapDispatchToProps = {
    getAllPayments: PaymentActions.getAllPayments,
    createPayment: PaymentActions.createPayment,
    getDetailUser: UserActions.getDetailUser
}

export default connect(mapStateToProps, mapDispatchToProps)(ReCharge);