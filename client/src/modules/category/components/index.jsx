import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Pagination, Empty, Button, Table, Modal, Form, Input, Select } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import Container from '../../../components/container';
import Card from '../../../components/card';
import Loading from '../../../components/loading';

import AddForm from './addForm';
import EditForm from './editForm';

import { CategoryActions } from '../redux/actions';

const { confirm } = Modal;

const { Option } = Select;

const dataTypes = ["", "Nhà đất bán", "Nhà đất cho thuê", "Tất cả"];

const Category = (props) => {
    const { category } = props;
    const [form] = Form.useForm();

    const [queryData, setQueryData] = useState({
        limit: 10,
        page: 1
    })

    const [loaded, setLoaded] = useState(false);

    const [state, setState] = useState({
        visibleAdd: false,
        visibleEdit: false,
    });

    const [categoryEdit, setCategoryEdit] = useState({});

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);

            props.getAllCategories(queryData);
        }
    }, [])

    useEffect(() => {
        props.getAllCategories(queryData);
    }, [queryData])

    const columns = [
        {
            key: 'name',
            dataIndex: 'name',
            title: 'Tên danh mục',
            width: '50%',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            key: 'type',
            dataIndex: 'type',
            title: 'Loại danh mục',
            width: '30%',
            render: (data) => {
                return (<span>{dataTypes[data]}</span>)
            }
        },
        {
            key: 'actions',
            title: 'Hành động',
            width: 'auto',
            align: 'center',
            render: (data, record) => {
                return (
                    <div >
                        <Button
                            icon={<EditOutlined />}
                            size='small'
                            onClick={() => { setCategoryEdit(record); setState({ ...state, visibleEdit: true }) }}
                            style={{ marginRight: "10px" }}
                        >
                        </Button>
                        <Button
                            icon={<DeleteOutlined />}
                            danger
                            size='small'
                            onClick={() => { showConfirmDelete(record) }}
                        >
                        </Button>
                    </div>
                );
            },
        },
    ];

    const submitAddForm = async (values) => {
        await props.createCategory(values);
        setState({ ...state, visibleAdd: false })
    }

    const submitEditForm = async (values) => {
        await props.updateCategory(categoryEdit._id, values);
        setState({ ...state, visibleEdit: false })
    }


    const showConfirmDelete = (cat) => {
        confirm({
            title: `Bạn có chắc chắn muốn xóa danh mục "${cat.name}" hay không?`,
            icon: <ExclamationCircleOutlined />,
            content: 'Vui lòng xác nhận',
            okText: "Xóa",
            cancelText: "Hủy",

            onOk() {
                props.deleteCategory(cat._id)
            },
            onCancel() { },
        });
    }

    const submitFilter = (values) => {
        setQueryData({ ...queryData, ...values })
    }

    return <Container>
        {category.isLoading && <Loading />}
        <Card >
            <Card.Header>
                <h2 style={{fontWeight: 'bold'}}>
                    <span>
                        Danh mục bài đăng
                    </span>
                    <Button
                        type="primary" style={{ float: "right" }}
                        onClick={() => setState({ ...state, visibleAdd: true })}
                    >
                        Thêm danh mục
                    </Button>
                </h2>
            </Card.Header>
            <Card.Body>
                {/* Filter */}
                <Form
                    layout="vertical"
                    name="category-filter"
                    form={form}
                    onFinish={submitFilter}
                    className="filter-table"
                >
                    <Form.Item
                        name="name"
                    >
                        <Input placeholder="Tên danh mục" />
                    </Form.Item>

                    <Form.Item
                        name="type"
                    >
                        <Select placeholder="Chọn loại danh mục">
                            <Option value={undefined}>{dataTypes[3]}</Option>
                            <Option value={1}>{dataTypes[1]}</Option>
                            <Option value={2}>{dataTypes[2]}</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Tìm kiếm
                        </Button>
                    </Form.Item>
                </Form>

                {category.listCategories?.length !== 0 ?
                    <Table
                        columns={columns}
                        dataSource={category.listCategories}
                        pagination={false}
                    /> :
                    <Empty description="Không có dữ liệu" />
                }

                < AddForm
                    state={state}
                    setState={setState}
                    submitAddForm={submitAddForm}
                />

                {state.visibleEdit && <EditForm
                    state={state}
                    setState={setState}
                    submitEditForm={submitEditForm}
                    categoryEdit={categoryEdit}
                />}

            </Card.Body>
            <Card.Footer styles={{ textAlign: "right" }}>
                <Pagination
                    total={category.totalDocs}
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
    const { category } = state;
    return { category };
}

const mapDispatchToProps = {
    getAllCategories: CategoryActions.getAllCategories,
    createCategory: CategoryActions.createCategory,
    deleteCategory: CategoryActions.deleteCategory,
    updateCategory: CategoryActions.updateCategory,
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
