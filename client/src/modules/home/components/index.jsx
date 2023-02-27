// import { Form } from "antd";
import { connect } from "react-redux";
import Container from "./container";

import { DownOutlined, UpOutlined, RedoOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, Radio } from 'antd';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { CountryActions } from "../../country/redux/actions";
import { CategoryActions } from '../../category/redux/actions';

import { acreageOptions, priceSellOptions, priceRentOptions, directionOptions } from '../../../components/filter/dataOptions';
import { formatPathName } from "../../../helpers/formatPathName";
import { searchPath } from "../../../helpers/search";
const { Option } = Select;
const { Search } = Input
const Home = (props) => {
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate()
    const [form] = Form.useForm();

    const { provincesData, districtsData, wardsData } = props.country;
    const { listCategoriesNoPagination, listCategories } = props.category
    const [type, setType] = useState(1)
    const [queryData, setQueryData] = useState({
        limit: listCategoriesNoPagination.length,
        page: 1
    })
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

    const _getCategories = async (value) => {
        form.resetFields(["category"])
        let categoryInfo = await listCategoriesNoPagination.find(d => d.type === value.target.value)

        if (categoryInfo) await props.getAllCategories({ ...queryData, type: categoryInfo.type })
    }
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

    const [expand, setExpand] = useState(false);

    const getFields = () => {
        const children = [];
        children.push(
            <Col span={6} key={1}>
                <Form.Item
                    name="province"
                    label='Tỉnh / thành phố'

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
                        onChange={(value) => _getDistricts(value.split('$')[0])}
                    >
                        {provincesData && provincesData.length &&
                            provincesData.map(p => <Option value={p._id + '$' + p.name}>
                                {p.name}
                            </Option>)}
                    </Select>

                </Form.Item>
            </Col>,
        );
        children.push(
            <Col span={6} key={2}>
                <Form.Item
                    name='price'
                    label='Mức giá'

                >

                    <Select
                        showSearch
                        placeholder="Chọn khoảng giá"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {type === 1 ? priceSellOptions.map(p => <Option value={p.value + '$' + p.label}>
                            {p.label}
                        </Option>) : priceRentOptions.map(p => <Option value={p.value + '$' + p.label}>
                            {p.label}
                        </Option>)}

                    </Select>

                </Form.Item>
            </Col>,
        );
        children.push(
            <Col span={6} key={3}>
                <Form.Item
                    name='acreage'
                    label='Diện tích'

                >

                    <Select
                        showSearch
                        placeholder="Chọn khoảng diện tích"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }

                    >
                        {acreageOptions.map(a => <Option value={a.value + '$' + a.label}>
                            {a.label}
                        </Option>)}
                    </Select>
                </Form.Item>
            </Col>,
        );
        children.push(
            <Col span={6} key={4}>
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
            </Col>,
        );

        if (expand) {

            children.push(
                <Col span={6} key={6}>
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
                </Col>,
            );
            children.push(
                <Col span={6} key={5}>
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
                </Col>,
            );
        }

        return children;
    };
    // }

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
    return <Container>
        {/* <HomeSearch>

        </HomeSearch> */}
        <Form
            form={form}
            name="advanced_search"
            className="ant-advanced-search-form"
            onFinish={submitFilter}
            initialValues={{ type: 1 }}
        >

            <Form.Item name="type" className="radio">

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

            <div className="search-home">

                <div className="search-box">
                    <Form.Item
                        name="categories"
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

                    <Form.Item
                        name="address"

                    >
                        <Input placeholder="Ví dụ: Số 10, Trường Chinh" />
                    </Form.Item>
                    <Form.Item>

                        <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                            Tìm kiếm
                        </Button>
                    </Form.Item>
                </div>
                <div>

                    <Row gutter={24}>{getFields()}</Row>
                    <Row>
                        <Col
                            span={24}
                            style={{
                                textAlign: 'right',
                            }}
                        >

                            <Button
                                style={{
                                    fontSize: 12,
                                }}
                                onClick={() => {
                                    setExpand(!expand);
                                }}
                            >
                                {expand ? <span><UpOutlined /> Thu gọn</span>
                                    : <span><DownOutlined /> Mở rộng</span>}
                            </Button>
                            <Button
                                style={{
                                    margin: '0 8px',
                                }}
                                onClick={() => {
                                    form.resetFields();
                                }}
                            >
                                <RedoOutlined />Đặt lại
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        </Form>
        <Container.ListPostMillion>

        </Container.ListPostMillion>
        <Container.ListPostSell>

        </Container.ListPostSell>
        <Container.ListPostRent>

        </Container.ListPostRent>
    </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);

