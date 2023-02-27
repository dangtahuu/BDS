import React from "react";
import { Form, Input, Row, Col, Select, InputNumber, Switch } from 'antd';
import { connect } from "react-redux";

import './styles.scss';

const { Option } = Select;

const OtherInfo = (props) => {

    return <React.Fragment>
        <div className="form-item">
            <div className="post-add-item-header">
                <span>Thông tin chi tiết</span>
            </div>

            <Row >
                <Col
                    span={24}
                    style={{
                        textAlign: 'right',
                    }}
                    className="post-select-add-address"
                >
                    <Col span={8}>
                        <Form.Item
                            name="direction"
                            label="Hướng"
                        >
                            <Select placeholder="Chọn hướng">
                                <Option value={1}>Đông</Option>
                                <Option value={2}>Tây</Option>
                                <Option value={3}>Nam</Option>
                                <Option value={4}>Bắc</Option>
                                <Option value={5}>Đông Nam</Option>
                                <Option value={6}>Đông Bắc</Option>
                                <Option value={7}>Tây Nam</Option>
                                <Option value={8}>Tây Bắc</Option>
                            </Select>
                        </Form.Item>

                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="roadAhead"
                            label="Đường trước nhà (m)"
                        >
                            <Input type="number" placeholder="Nhập độ rộng đường trước nhà..." />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="floorNumber"
                            label="Số lầu"
                        >
                            <InputNumber
                                style={{ width: "100%" }}
                            />
                        </Form.Item>
                    </Col>
                </Col>
            </Row>

            <Row >
                <Col
                    span={24}
                    style={{
                        textAlign: 'right',
                    }}
                    className="post-select-add-address"
                >




                    <Col span={8}>
                        <Form.Item
                            name="bedroomNumber"
                            label="Số phòng ngủ"
                        >
                            <InputNumber
                                style={{ width: "100%" }}
                            />
                        </Form.Item>

                    </Col>

                    <Col span={8}>
                        <Form.Item
                            name="legal"
                            label="Pháp lý"
                        >
                            <Select placeholder="Chọn">
                                <Option value={1}>Sổ đỏ / sổ hồng</Option>
                                <Option value={2}>Giấy tờ hợp lệ</Option>
                                <Option value={3}>Giấy phép xây dựng</Option>
                                <Option value={4}>Giấy phép kinh doanh</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col
                        span={8}
                    >

                        <Form.Item
                            name="interaction"
                            label="Tính năng tương tác"
                            initialValue={true}
                        >
                            <Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked onChange={(value) => console.log(value)} />
                        </Form.Item>
                    </Col>

                </Col>


            </Row>

        </div>

    </React.Fragment>
}

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = {
}


export default connect(mapStateToProps, mapDispatchToProps)(OtherInfo);