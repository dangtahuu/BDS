import React, {useEffect, useState} from "react";
import { Form, Input, Select } from 'antd';
import { connect } from "react-redux";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import editorConfig from '../../../../../helpers/editorConfig';
import { CategoryActions } from '../../../../category/redux/actions';

import './styles.scss';

const { Option } = Select;
const { TextArea } = Input;

const Detail = (props) => {
    const { onChangeDescription, description } = props;
    const { listCategoriesNoPagination = [] } = props.category;

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            props.getAllCategoriesNoPagination()
        }
    })

    return <React.Fragment>
        <div className="post-add-item-header">
            <span>Thông tin bắt buộc</span>
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
            <Input placeholder="Nhập tiêu đề..."/>
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
            <TextArea placeholder="Nhập mô tả..." rows={4}/>
        </Form.Item>

        <p style={{marginBottom: "0.5rem"}}>Nội dung</p>
        <CKEditor
            editor={ ClassicEditor }
            data={description}
            config={editorConfig}
            onChange={ ( event, editor ) => {
                const data = editor.getData();
                onChangeDescription(data)
            } }
        />
        
        <Form.Item
            name="categories"
            label="Danh mục"
            rules={[
                {
                    required: true,
                    message: 'Chọn ít nhất một danh mục',
                },
            ]}
            style={{marginTop: "1.5rem"}}
        >
            <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Chọn danh mục"
            >
                {listCategoriesNoPagination.filter(c => c.type === 5).map(c =>
                    (<Option key={c._id} value={c._id}>{c.name}</Option>))}
            </Select>
        </Form.Item>


    </React.Fragment>
}

const mapStateToProps = state => {
    const { category } = state;
    return { category };
}

const mapDispatchToProps = {
    getAllCategoriesNoPagination: CategoryActions.getAllCategoriesNoPagination
}


export default connect(mapStateToProps, mapDispatchToProps)(Detail);