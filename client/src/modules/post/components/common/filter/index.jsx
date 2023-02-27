import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Form, Button, Input, Select, Row } from 'antd';

import { CountryActions } from '../../../../country/redux/actions';

import Card from '../../../../../components/card';

import { acreageOptions, priceSellOptions, directionOptions } from '../../../../../components/filter/dataOptions';

const { Option } = Select;

const Filter = (props) => {
    const { queryData, setQueryData } = props;

    const [form] = Form.useForm();

    const [loaded, setLoaded] = useState(false);

    const { provincesData, districtsData, wardsData } = props.country;

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            props.getProvinces()
        }
    }, [])

    const _getDistricts = async (value) => {
        form.resetFields(["district", "ward"])

        let provinceInfo = await provincesData.find(p => p._id === value);
        if (provinceInfo) await props.getDistricts({ provinceId: provinceInfo.id });
    }

    const _getWards = (value) => {
        form.resetFields(["ward"])

        let districtInfo = districtsData.find(d => d._id === value);
        if (districtInfo) props.getWards({ districtId: districtInfo.id })
    }

    const submitFilter = (values) => {
        //Format price value to query
        if (values.price) {
            let pricesSplit = values.price.split("-");
            values.priceFrom = parseInt(pricesSplit[0]);
            values.priceTo = parseInt(pricesSplit[1]);
        }

        //Format acreage value to query
        if (values.acreage) {
            let acreagesSplit = values.acreage.split("-");
            values.acreageFrom = parseInt(acreagesSplit[0]);
            values.acreageTo = parseInt(acreagesSplit[1]);
        }

        setQueryData({ ...queryData, ...values })
    }

    return <Card >
        <Form
            layout="inline"
            name="post-filter"
            form={form}
            onFinish={submitFilter}
        >
            <Card.Header style={{ backgroundColor: "#0090b5", color: "white" }}>Tìm kiếm nhà đất</Card.Header>
            <Card.Body>
                <Form.Item
                    name="address"
                    label="Địa điểm"
                >
                    <Input placeholder="Ví dụ: Số 10, Trường Chinh" />
                </Form.Item>

                <Form.Item
                    name="province"
                    label="Tỉnh / thành phố"
                >
                    <Select
                        showSearch
                        placeholder="Chọn tỉnh / thành phố"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                        onChange={(value) => _getDistricts(value)}
                    >
                        {provincesData && provincesData.length &&
                            provincesData.map(p => <Option value={p._id}>
                                {p.name}
                            </Option>)}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="district"
                    label="Quận / huyện"
                >
                    <Select
                        showSearch
                        placeholder="Chọn quận / huyện"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                        onChange={(value) => _getWards(value)}
                    >
                        {districtsData && districtsData.length &&
                            districtsData.map(d => <Option value={d._id}>
                                {d.name}
                            </Option>)}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="ward"
                    label="Xã / phường"
                >
                    <Select
                        showSearch
                        placeholder="Chọn xã / phường"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                    >
                        {wardsData && wardsData.length &&
                            wardsData.map(w => <Option value={w._id}>
                                {w.name}
                            </Option>)}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="direction"
                    label="Hướng"
                >
                    <Select
                        showSearch
                        placeholder="Chọn hướng nhà"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }

                    >
                        {directionOptions.map(d => <Option value={d.value}>
                            {d.label}
                        </Option>)}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="acreage"
                    label="Diện tích"
                >
                    <Select
                        showSearch
                        placeholder="Chọn khoảng diện tích"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }

                        onChange={(value) => _getWards(value)}
                    >
                        {acreageOptions.map(a => <Option value={a.value}>
                            {a.label}
                        </Option>)}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="price"
                    label="Giá"
                >
                    <Select
                        showSearch
                        placeholder="Chọn khoảng giá"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }

                        onChange={(value) => _getWards(value)}
                    >
                        {priceSellOptions.map(p => <Option value={p.value}>
                            {p.label}
                        </Option>)}
                    </Select>
                </Form.Item>
            </Card.Body>
            <Card.Footer >
                <Row >
                    <Form.Item>
                        <Button type="secondary" onClick={async () => {
                            form.resetFields(); await props.getDistricts({ id: '' })
                            await props.getWards({ id: '' })
                        }} style={{ marginRight: "10px" }}>
                            Reset
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Tìm kiếm
                        </Button>
                    </Form.Item>
                </Row>
            </Card.Footer>
        </Form>
    </ Card>
}

const mapStateToProps = state => {
    const { country } = state
    return { country };
}

const mapDispatchToProps = {
    getProvinces: CountryActions.getProvinces,
    getDistricts: CountryActions.getDistricts,
    getWards: CountryActions.getWards
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
