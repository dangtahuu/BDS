import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Pagination, Empty, Button, Table, Modal, Select, Form, Input } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

import Container from '../../../../components/container';
import Card from '../../../../components/card';
import Loading from '../../../../components/loading';

import { UserActions } from '../../redux/actions';

import './styles.scss';

const { Option } = Select;
const { confirm } = Modal;

const UserListManage = (props) => {
    const { user } = props;
    const { listUsers = [] } = user;

    const [form] = Form.useForm();

    const [queryData, setQueryData] = useState({
        limit: 10,
        page: 1
    })

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);

            props.getAllUsers(queryData);
        }
    }, [])

    useEffect(() => {
        props.getAllUsers(queryData);
    }, [queryData])

    const columns = [
        {
            key: 'avatar',
            dataIndex: 'avatar',
            title: 'Ảnh',
            width: '5%',
            render: (data, record) => {
                return (
                    <div className="user-list-item-magage-avatar">
                        <img src={record.avatar} alt="" />
                    </div>
                );
            },
        },
        {
            key: 'name',
            dataIndex: 'name',
            title: 'Tên',
            width: '20%',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            key: 'email',
            dataIndex: 'email',
            title: 'Email',
            width: '20%',
        },
        {
            key: 'phone',
            dataIndex: 'phone',
            title: 'Số điện thoại',
            width: '15%',
        },
        {
            key: 'role',
            dataIndex: 'role',
            title: 'Quyền',
            width: '15%',
            render: (data, record) => {
                if (record.role === 1 || record.role === 2) {

                    return (
                        <Select defaultValue={data} className="select-user-role" onChange={(value) => { props.updateUser(record._id, { ...record, role: value }) }}>
                            <Option value={1}>
                                <badge className="badge-user-list badge-active">Chưa kích hoạt</badge>
                            </Option>
                            <Option value={2}>
                                <badge className="badge-user-list badge-user">Người dùng</badge>
                            </Option>
                        </Select>
                    )
                }
                
                if (record.role === 3) {
                    return (
                        <badge className="badge-user-list badge-admin">Admin</badge>

                    )
                }
            }
        },
        {
            key: 'createdAt',
            dataIndex: 'createdAt',
            title: 'Ngày đăng ký',
            width: '15%',
            sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
            render: (data, record) => {
                return (
                    <span>{moment(new Date(data)).format("hh:mm - DD/MM/YYYY")}</span>
                )
            }
        },
        {
            key: 'actions',
            title: 'Hành động',
            width: 'auto',
            align: 'center',
            render: (data, record) => {
                if (record.role !== 3) {

                    return (
                        <div >
                            <Button
                                icon={<DeleteOutlined />}
                                danger
                                size='small'
                                onClick={() => { showConfirmDelete(record) }}
                            >
                            </Button>
                        </div>
                    );
                }
            },
        },
    ];

    const showConfirmDelete = (u) => {
        confirm({
            title: `Bạn có chắc chắn muốn xóa tài khoản "${u.name}" hay không?`,
            icon: <ExclamationCircleOutlined />,
            content: 'Vui lòng xác nhận',
            okText: "Xóa",
            cancelText: "Hủy",

            onOk() {
                props.deleteUser(u._id)
            },
            onCancel() { },
        });
    }

    const submitFilter = (values) => {
        setQueryData({ ...queryData, ...values })
    }

    return <Container>
        {user.isLoading && <Loading />}
        <Card >
            <Card.Header>
                <h2 style={{fontWeight: 'bold'}}>Quản lý người dùng</h2>
            </Card.Header>
            <Card.Body>

                {/* Filter */}
                <Form
                    layout="vertical"
                    name="user-filter"
                    form={form}
                    onFinish={submitFilter}
                    initialValues={{ role: undefined }}
                    className="filter-table"
                >
                    <Form.Item
                        name="name"
                    >
                        <Input placeholder="Tên người dùng" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                    >
                        <Input placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                    >
                        <Input placeholder="Số điện thoại" />
                    </Form.Item>

                    <Form.Item
                        name="role"
                    >
                        <Select placeholder="Quyền">
                            <Option value={undefined}>Tất cả</Option>
                            <Option value={1}>Chưa kích hoạt</Option>
                            <Option value={2}>Người dùng</Option>
                            <Option value={3}>Admin</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Tìm kiếm
                        </Button>
                    </Form.Item>
                </Form>

                {listUsers?.length !== 0 && !user.isLoading ?
                    <Table
                        columns={columns}
                        dataSource={listUsers}
                        pagination={false}
                    /> :
                    <Empty description="Không có dữ liệu" />
                }

            </Card.Body>
            <Card.Footer styles={{ textAlign: "right" }}>
                <Pagination
                    total={user.totalDocs}
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
    const { user } = state;
    return { user };
}

const mapDispatchToProps = {
    getAllUsers: UserActions.getAllUsers,
    updateUser: UserActions.updateUser,
    deleteUser: UserActions.deleteUser
}

export default connect(mapStateToProps, mapDispatchToProps)(UserListManage);