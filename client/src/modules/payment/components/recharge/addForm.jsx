import React, {useState} from "react";
import { connect } from "react-redux";
import { Button,  Modal, Form, Input, Select, InputNumber } from 'antd';

const { Option } = Select;

const dataTypes = ["", "Nhà đất bán", "Nhà đất cho thuê", "Cần thuê nhà đất", "Cần mua nhà đất", "Dự án"];

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};


const AddForm = (props) => {
    const { payment, visible, setVisible, submitAddForm } = props;

    return <Modal
        title="Nạp tiền"
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
    >
        <Form
            {...layout}
            name="basic"
            onFinish={ submitAddForm}
        >
             <Form.Item
                name="transaction"
                label="Số tiền giao dịch (vnđ)"
                rules={[
                {
                    required: true,
                    message: 'Vui lòng nhập số tiền giao dịch',
                },
                ]}
            >
                <InputNumber
                    placeholder="Ví dụ: 1.000"
                    style={{ width: "100%" }}
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                />
            </Form.Item>

            <Form.Item
                name="bankName"
                label="Tên ngân hàng"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập tên ngân hàng',
                    },
                    ]}
            >
                <Input placeholder="Ví dụ: SHB" />
            </Form.Item>

            <Form.Item
                name="bankAccount"
                label="Số tài khoản"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập số tài khoản',
                    },
                ]}
            >
                <Input placeholder="Ví dụ: 1038012830193" />
            </Form.Item>

            <Form.Item
                name="bankOwer"
                label="Chủ tài khoản"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập tên chủ tài khoản',
                    },
                ]}
            >
                <Input placeholder="Ví dụ: Nguyen Van A" />
            </Form.Item>
            
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" loading={payment.isLoading}>
                    Nạp tiền
                </Button>
            </Form.Item>
        </Form>
    </Modal>
};

const mapStateToProps = state => {
    const { payment } = state;
    return { payment };
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);
