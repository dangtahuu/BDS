import React, {useState} from "react";
import { connect } from "react-redux";
import { Button,  Modal, Form, Input, Select } from 'antd';

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
    const { category, state, setState, submitAddForm } = props;

    return <Modal
        title="Thêm danh mục"
        visible={state.visibleAdd}
        footer={null}
        onCancel={() => setState({...state, visibleAdd: false })}
    >
        <Form
            {...layout}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={ submitAddForm}
        >
            <Form.Item
                label="Tên danh mục"
                name="name"
                rules={[
                {
                    required: true,
                    message: 'Vui lòng nhập tên danh mục!',
                },
                ]}
            >
                <Input />
            </Form.Item>
            
            <Form.Item
                label="Loại danh mục"
                name="type"
                rules={[
                {
                    required: true,
                    message: 'Vui lòng chọn loại danh mục!',
                },
                ]}
            >
                <Select placeholder="Chọn loại danh mục">
                    <Option value={1}>{dataTypes[1]}</Option>
                    <Option value={2}>{dataTypes[2]}</Option>
                    <Option value={5}>{dataTypes[5]}</Option>
                </Select>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" loading={category.isLoading}>
                    Thêm mới
                </Button>
            </Form.Item>
        </Form>
    </Modal>
};

const mapStateToProps = state => {
    const { category } = state;
    return { category };
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);
