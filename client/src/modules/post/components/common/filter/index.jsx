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
            <Card.Header style={{ backgroundColor: "#0090b5", color: "white" }}>T??m ki???m nh?? ?????t</Card.Header>
            <Card.Body>
                <Form.Item
                    name="address"
                    label="?????a ??i???m"
                >
                    <Input placeholder="V?? d???: S??? 10, Tr?????ng Chinh" />
                </Form.Item>

                <Form.Item
                    name="province"
                    label="T???nh / th??nh ph???"
                >
                    <Select
                        showSearch
                        placeholder="Ch???n t???nh / th??nh ph???"
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
                    label="Qu???n / huy???n"
                >
                    <Select
                        showSearch
                        placeholder="Ch???n qu???n / huy???n"
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
                    label="X?? / ph?????ng"
                >
                    <Select
                        showSearch
                        placeholder="Ch???n x?? / ph?????ng"
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
                    label="H?????ng"
                >
                    <Select
                        showSearch
                        placeholder="Ch???n h?????ng nh??"
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
                    label="Di???n t??ch"
                >
                    <Select
                        showSearch
                        placeholder="Ch???n kho???ng di???n t??ch"
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
                    label="Gi??"
                >
                    <Select
                        showSearch
                        placeholder="Ch???n kho???ng gi??"
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
                            T??m ki???m
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
