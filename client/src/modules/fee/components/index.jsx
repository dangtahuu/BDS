import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { Pagination, Empty, Button, Table, Modal } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import { FormatMoney } from '../../../helpers/formatCurrency';

import Container from '../../../components/container';
import Card from '../../../components/card';
import Loading from '../../../components/loading';

import AddForm from './addForm';

import { FeeActions } from '../redux/actions';

const { confirm } = Modal;
const dataTypes = ["", "Tin VIP"];

const Fee = (props) => {
    const { fee } = props;
    const [queryData, setQueryData] = useState({
        limit: 10,
        page: 1
    })

    const [loaded, setLoaded] = useState(false);

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            
            props.getAllFees(queryData);
        }
    },[])

    useEffect(() => {
        props.getAllFees(queryData);
    }, [queryData])

    const columns = [
        {
            key: 'name',
            dataIndex: 'name',
            title: 'Tên gói',
            width: '30%',
            sorter: (a, b) => a.name.localeCompare(b.name),
            render: (data, record) => {
                return (<span style={{color: record.colorText}}>{data}</span>)
            }
        },
        {
            key: 'type',
            dataIndex: 'type',
            title: 'Loại',
            width: '20%',
            render: (data) => {
                return (<span>{dataTypes[data]}</span>)
            }
        },
        {
            key: 'point',
            dataIndex: 'point',
            title: 'Trọng số',
            width: '20%',
            align: 'center'
        },
        {
            key: 'fee',
            dataIndex: 'fee',
            title: 'Mức phí / ngày',
            width: '20%',
            align: 'center',
            render: (data) => {
                return (<span>{FormatMoney(data)}</span>)
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
        await props.createFee(values);
        setVisible(false)
    }

    const showConfirmDelete = (f) => {
        confirm({
            title: `Bạn có chắc chắn muốn xóa gói "${f.name}" hay không?`,
            icon: <ExclamationCircleOutlined />,
            content: 'Vui lòng xác nhận',
            okText: "Xóa",
            cancelText: "Hủy",
            
            onOk() {
                props.deleteFee(f._id)
            },
            onCancel() {},
        });
    }

    return <Container>
        {fee.isLoading && <Loading />}
            <Card >
                <Card.Header>
                    <h2 style={{fontWeight: 'bold'}}><span>Mức phí bài đăng VIP</span><Button
                        type="primary" style={{ float: "right" }}
                        onClick={() => setVisible(true)}
                    >
                        Thêm gói
                    </Button> </h2>
                    
                    
                </Card.Header>
                <Card.Body>

                    {fee.listFees?.length !== 0 ?
                        <Table
                            columns={columns}
                            dataSource={fee.listFees}
                            pagination={false}
                        /> :
                        <Empty description="Không có dữ liệu"/>
                    }

                    < AddForm
                        visible={visible}
                        setVisible={setVisible}
                        submitAddForm={submitAddForm}
                    />

                </Card.Body>
                <Card.Footer styles={{textAlign: "right"}}>
                    <Pagination
                        total={fee.totalDocs}
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
    const { fee } = state;
    return { fee };
}

const mapDispatchToProps = {
    getAllFees: FeeActions.getAllFees,
    createFee: FeeActions.createFee,
    deleteFee: FeeActions.deleteFee
}

export default connect(mapStateToProps, mapDispatchToProps)(Fee);
