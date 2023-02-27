import React from "react";
import {  Upload } from 'antd';
import { connect } from "react-redux";

import './styles.scss';

const ImageUpload = (props) => {
    const { images, setImages } = props;
    
    const onChange = ({ fileList: newFileList }) => {
        setImages(newFileList);
    };
    
    const onPreview = async file => {
        let src = file.url;
        if (!src) {
          src = await new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
          });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };

    return <React.Fragment>
        <div className="post-add-item-header" style={{marginTop: "1rem"}}>
            <span>Thêm hình ảnh cho bất động sản</span>
        </div>

        <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={images}
            onChange={onChange}
            onPreview={onPreview}
            accept="image/*"
        >
            {images.length < 10 && '+ Chọn ảnh'}
        </Upload>
    </React.Fragment>
}

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = {
}


export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload);