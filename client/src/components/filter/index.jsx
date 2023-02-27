import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Form, Button, Input, Select, Row, Radio, Col } from 'antd';
import { DownOutlined, UpOutlined, RedoOutlined, SearchOutlined } from '@ant-design/icons';

import { CountryActions } from '../../modules/country/redux/actions';
import { CategoryActions } from "../../modules/category/redux/actions";
import Card from '../card';
import { searchPath } from "../../helpers/search";
import { formatPathName } from "../../helpers/formatPathName";
import { acreageOptions, priceSellOptions, priceRentOptions, directionOptions } from './dataOptions.js';
import './filter.scss'
const { Option } = Select;

const Filter = (props) => {
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const [loaded, setLoaded] = useState(false);
    const [type, setType] = useState(1)
    const { listCategoriesNoPagination, listCategories } = props.category
    const [queryData, setQueryData] = useState({
        limit: listCategoriesNoPagination.length,
        page: 1
    })
    const { provincesData, districtsData, wardsData } = props.country;
    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            props.getProvinces()
        }

    }, [])
    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            props.getAllCategories({ ...queryData, type: form.getFieldValue('type') })
        }
    }, [])
    const _getDistricts = async (value) => {
        form.resetFields(["district", "ward"])

        let provinceInfo = await provincesData.find(p => p._id === value);
        if (provinceInfo) await props.getDistricts({ provinceId: provinceInfo.id });
    }

    const _getWards = async (value) => {
        form.resetFields(["ward"])
        let districtInfo = districtsData.find(d => d._id === value);
        if (districtInfo) await props.getWards({ districtId: districtInfo.id })
    }
    const optionsWithDisabled = [
        {
            label: 'Cần bán',
            value: 1,
        },
        {
            label: 'Cho thuê',
            value: 2,
        },
    ]
    const submitFilter = async (values) => {
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

        const valuePath = searchPath(values)
        if (valuePath.type === 1) {
            valuePath.type = 'can-ban'
        }
        if (valuePath.type === 2) {
            valuePath.type = 'cho-thue'
        }
        navigate(`/${formatPathName(valuePath)}`, { state: values })

    }
    const [expand, setExpand] = useState(false);

    const getFields = () => {
        const children = []
        children.push(
            <Col span={6}>
                <Form.Item
                    name="categories"
                    label="Danh mục"
                >

                    <Select
                        showSearch
                        placeholder="Chọn danh mục"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }

                    >
                        {listCategories && listCategories.length &&
                            listCategories.map(p => <Option value={p._id + '$' + p.name}>
                                {p.name}
                            </Option>)}
                    </Select>
                </Form.Item>
            </Col>
        )
        children.push(
            <Col span={6}>
                <Form.Item
                    name="province"
                    label="Tỉnh / thành phố"

                >
                    <Select
                        showSearch
                        placeholder="Toàn quốc"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        // filterSort={(optionA, optionB) =>
                        //     optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        // }
                        onChange={(value) => { _getDistricts(value.split('$')[0]) }}
                    >

                        {provincesData && provincesData.length &&
                            provincesData.map(p => <Option value={p._id + '$' + p.name}>
                                {p.name}
                            </Option>)}
                    </Select>
                </Form.Item>
            </Col>
        )
        children.push(
            <Col span={6}>
                <Form.Item
                    name="price"
                    label="Giá"
                >
                    <Select
                        showSearch
                        placeholder="Tất cả mức giá"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value={undefined + '$' + ''}>
                            Tất cả mức giá
                        </Option>
                        {type === 1 ? priceSellOptions.map(p => <Option value={p.value + '$' + p.label}>
                            {p.label}
                        </Option>) : priceRentOptions.map(p => <Option value={p.value + '$' + p.label}>
                            {p.label}
                        </Option>)}
                    </Select>
                </Form.Item>
            </Col>
        )
        children.push(
            <Col span={6}>
                <Form.Item
                    name="acreage"
                    label="Diện tích"
                >
                    <Select
                        showSearch
                        placeholder="Tất cả diện tích"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }

                    >
                        <Option value={undefined + '$' + ''}>
                            Tất cả diện tích
                        </Option>
                        {acreageOptions.map(a => <Option value={a.value + '$' + a.label}>
                            {a.label}
                        </Option>)}
                    </Select>
                </Form.Item>
            </Col>
        )
        if (expand) {

            children.push(
                <Col span={6}>
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
                            onChange={(value) => _getWards(value.split('$')[0])}
                        >
                            {districtsData && districtsData.length &&
                                districtsData.map(d => <Option value={d._id + '$' + d.name}>
                                    {d.name}
                                </Option>)}
                        </Select>
                    </Form.Item>
                </Col>
            )
            children.push(
                <Col span={6}>
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
                                wardsData.map(w => <Option value={w._id + '$' + w.name}>
                                    {w.name}
                                </Option>)}
                        </Select>
                    </Form.Item>
                </Col>
            )
            children.push(
                <Col span={6}>
                    <Form.Item
                        name='direction'
                        label='Hướng nhà'

                    >
                        <Select
                            showSearch
                            placeholder="Chọn hướng nhà"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }

                        >
                            {directionOptions.map(d => <Option value={d.value + '$' + d.label}>
                                {d.label}
                            </Option>)}
                        </Select>
                    </Form.Item>
                </Col>
            )

        }
        return children
    }
    return <Form
        // layout="inline"
        name="post-filter"
        form={form}
        onFinish={submitFilter}
        initialValues={{ type: 1 }}

    >
        {/* <Card.Header style={{ backgroundColor: "#0090b5", color: "white" }}>Tìm kiếm nhà đất</Card.Header> */}
        {/* <Card.Body> */}

        <Form.Item name="type" className="radio ant-row">

            <Radio.Group
                className="radioGroup"
                options={optionsWithDisabled}
                // onChange={onChange4}
                optionType="button"
                buttonStyle="solid"
                onChange={(value) => { form.resetFields(['categories']); form.resetFields(['price']); props.getAllCategories({ ...queryData, type: value.target.value }); setType(value.target.value) }
                }

            />
        </Form.Item>
        <Row gutter={24} style={{ width: '900px' }}>{getFields()}</Row>

        <Row >
            <Col
                span={24}
                style={{
                    textAlign: 'right',
                }}
            >

                <Button
                    type="primary"
                    style={{
                        fontSize: 12,
                    }}
                    onClick={() => {
                        setExpand(!expand);
                    }}
                >
                    {expand ? <span><UpOutlined /> </span>
                        : <span><DownOutlined /> </span>}
                </Button>

                <Button type="primary" icon={<RedoOutlined />} onClick={async () => {
                    form.resetFields();
                    await props.getDistricts({ id: '' })
                    await props.getWards({ id: '' })

                }

                }
                >

                    Đặt lại
                </Button>
                <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                    Tìm kiếm
                </Button>
            </Col>
        </Row>
    </Form>
}

const mapStateToProps = state => {
    const { country, category } = state
    return { country, category };
}

const mapDispatchToProps = {
    getProvinces: CountryActions.getProvinces,
    getDistricts: CountryActions.getDistricts,
    getWards: CountryActions.getWards,
    getAllCategoriesNoPagination: CategoryActions.getAllCategoriesNoPagination,
    getAllCategories: CategoryActions.getAllCategories,
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
