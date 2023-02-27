import React, { useEffect, useState } from "react";
import { Form, Select, Col, Row, Input } from 'antd';
import { CountryActions } from '../../../../country/redux/actions';
import { CategoryActions } from '../../../../category/redux/actions';
import { connect } from "react-redux";
import './styles.scss';

const { Option } = Select;

const Info = (props) => {
    const { type, setType} = props;
    const [loaded, setLoaded] = useState(false);
    const { provincesData, districtsData, wardsData } = props.country;
    const { listCategoriesNoPagination = [] } = props.category;

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            props.getProvinces()
        }
    }, [])
    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            props.getAllCategoriesNoPagination()
        }
    }, [])
    const _getDistricts = async (value) => {
        
        // form.setFieldValue("district", undefined)
        let provinceInfo = await provincesData.find(p => p._id === value);
        if (provinceInfo) await props.getDistricts({ provinceId: provinceInfo.id });
    }

    const _getWards = (value) => {

        let districtInfo = districtsData.find(d => d._id === value);
        if (districtInfo) props.getWards({ districtId: districtInfo.id })
    }

    return <React.Fragment>
        <div className="form-item">
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
                            name="type"
                            label="Loại tin"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn loại tin',
                                },
                            ]}
                        >
                            <Select
                                placeholder="Chọn loại tin"
                                onChange={(v) => setType(v)}
                            >
                                <Option value={1}>Nhà đất bán</Option>
                                <Option value={2}>Nhà đất cho thuê</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={16}>
                        <Form.Item
                            name="categories"
                            label="Danh mục"
                            rules={[
                                // {
                                //     required: true,
                                //     message: 'Chọn ít nhất 01 danh mục',
                                // },
                            ]}
                        >
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: '100%' }}
                                placeholder="Chọn danh mục"
                            >
                                {listCategoriesNoPagination.filter(c => c.type === type).map(c =>
                                    (<Option key={c._id} value={c._id}>{c.name}</Option>))}

                            </Select>
                        </Form.Item>
                    </Col>

                </Col>
            </Row>
            <div className="post-add-item-header">
                <span>Địa điểm</span>
            </div>
            {/* Phần chọn khu vực */}
            <Row key={123}>
                <Col
                    span={24}
                    style={{
                        textAlign: 'right',
                    }}
                    className="post-select-add-address"
                    key={1}
                >
                    <Col span={8} key={2}>
                        <Form.Item
                            name="province"
                            label="Tỉnh / thành phố"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn tỉnh / thành phố',
                                },
                            ]}
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
                    </Col>

                    <Col span={8} key={3}>
                        <Form.Item
                            name="district"
                            label="Quận / huyện"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn quận / huyện',
                                },
                            ]}
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
                    </Col>

                    <Col span={8} key={4}>
                        <Form.Item
                            name="ward"
                            label="Xã / phường"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn xã / phường',
                                },
                            ]}
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
                    </Col>
                </Col>
            </Row>

            {/* Phần địa chỉ */}
            <Form.Item
                name="address"
                label="Địa chỉ nhà"
            >
                <Input placeholder="Ví dụ: Số 10, Trường Chinh" />
            </Form.Item>
        </div>



    </React.Fragment>
}

const mapStateToProps = state => {
    const { country, category } = state
    return { country, category };
}

const mapDispatchToProps = {
    getProvinces: CountryActions.getProvinces,
    getDistricts: CountryActions.getDistricts,
    getWards: CountryActions.getWards,
    getAllCategoriesNoPagination: CategoryActions.getAllCategoriesNoPagination

}

export default connect(mapStateToProps, mapDispatchToProps)(Info);