import React, { useEffect, useState } from "react";
import { Form, Input, Select, Row, Col, InputNumber } from 'antd';
import { connect } from "react-redux";

import './styles.scss';

const { Option } = Select;
const { TextArea } = Input;

const Detail = (props) => {
    const { type, setType } = props;

    return <React.Fragment>
        <div className="form-item">
            <div className="post-add-item-header">
                <span>Giá và mô tả</span>
            </div>
            <Form.Item
                name="title"
                label="Tiêu đề"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập tiêu đề',
                    },
                ]}
                className="ant-advanced-search-form"
            >
                <Input placeholder="Nhập tiêu đề..." />
            </Form.Item>

            <Form.Item
                name="metaDescription"
                label="Mô tả ngắn về dự án"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập mô tả ngắn về dự án',
                    },
                ]}
            >
                <TextArea placeholder="Nhập mô tả..." rows={4} />
            </Form.Item>
            {/* Phần diện tích, giá */}

            <Row key={1223}>
                <Col
                    span={24}
                    style={{
                        textAlign: 'right',
                    }}
                    className="post-select-add-address"
                    key={5}
                >
                    <Col span={8} key={6}>
                        <Form.Item
                            name="projectName"
                            label="Tên dự án"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên dự án',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tên dự án..." />
                        </Form.Item>
                    </Col>

                    <Col span={8} key={7}>
                        <Form.Item
                            name="acreage"
                            label="Diện tích (m2)"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập diện tích',
                                },
                            ]}
                        >
                            <InputNumber
                                placeholder="Nhập diện tích..."
                                style={{ width: "100%" }}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={8} key={8}>
                        <Form.Item
                            name="price"
                            label={type === 2 ? 'Giá / tháng (vnđ)' : 'Giá (vnđ)'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập giá',
                                },
                            ]}
                        >
                            <InputNumber
                                placeholder="Ví dụ: 1.000k"
                                style={{ width: "100%" }}
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            />
                        </Form.Item>
                    </Col>
                </Col>
            </Row>
        </div>

    </React.Fragment>
}

const mapStateToProps = state => {
    return {};
}

const mapDispatchToProps = {
}


export default connect(mapStateToProps, mapDispatchToProps)(Detail);