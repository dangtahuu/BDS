import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux";

import 'moment/locale/vi';
import moment from 'moment';

import './styles.scss';

moment.locale('vi');

const CommentItem = (props) => {
    const { auth } = props;
    const { isAuth, user } = auth;

    const { item, deleteComment, setEditInfo } = props;
    //Kiểm tra xem có phải comment của người này không để cho phép sửa, xóa
    const isOwner = () => {
        if (!isAuth) return false;
        if (item.user._id === user._id) return true;
        return false;
    }

    return (
        <div className="post-comment-item">
            <div className="post-comment-item-info">
                <Avatar
                    style={{
                        backgroundColor: '#87d068',
                    }}
                    icon={<UserOutlined />}
                    src={item?.user?.avatar ? item?.user?.avatar : ""}
                    size={30}
                />
                <span>{item?.user?.name || "Nguời dùng ẩn danh"}</span>
                <span>{moment(item.date).fromNow()}</span>
            </div>

            {isOwner() && <div className="post-comment-item-action">
                <EditOutlined title="Chỉnh sửa" onClick={() => setEditInfo(item)}/>
                <DeleteOutlined title="Xóa bình luận" onClick={() => deleteComment(item._id)}/>
            </div>}

            <div className="post-comment-item-content">
                <p>{item.comment}</p>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    const { auth } = state;
    return { auth };
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);