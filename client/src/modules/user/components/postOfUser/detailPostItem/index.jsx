import React, { useState } from "react";
import { connect } from "react-redux";
import { Modal } from 'antd';

import './detail.scss'
import Info from "./info";
import Contact from "./contact";
import Notification from "./notifications"
const dataTypes = [{ title: "Chi tiết tin", isSelected: 1 }, { title: "Yêu cầu liên hệ", isSelected: 2 }, { title: "Thống kê", isSelected: 3 }];

const DetailPost = (props) => {
    const { postItem, visible, setVisible } = props;
    const [selected, setSelected] = useState(1)
    return <Modal
        title='.'
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
        style={
            {
                top: 0,
                left: '100%',
                height: '100%'
            }

        }
        className='modal'
    >
        <div className="detail-post-item">
            <div className="class">
                {dataTypes.map((item, index) =>
                    <button onClick={() => setSelected(item.isSelected)} style={selected === item.isSelected ? { fontWeight: 'bold', borderBottom: '2px solid #e03c31' } : {}}>{item.title}</button>
                )}
            </div>
            {selected === 1 ? <Info postItem={postItem} /> : ''}
            {selected === 2 ? <Contact postItem={{ ...postItem }} /> : ''}
            {selected === 3 ? <Notification postItem={postItem} /> : ''}

        </div>

    </Modal>
};

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPost);
