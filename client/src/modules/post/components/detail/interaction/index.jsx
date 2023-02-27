import React, { useState } from "react";
import { connect } from "react-redux";
import { Rate, Button, Input, Avatar } from 'antd';
import { UserOutlined, SendOutlined } from "@ant-design/icons";

import { ratesAverage } from '../../../../../helpers/ratesAverage';
import { createItemKey } from '../../../../../helpers/createItemKey';
import { PostActions } from '../../../redux/actions';

import CommentItem from './commentItem';

import './styles.scss';

const { TextArea } = Input;

const Interaction = (props) => {
    const { postDetail } = props;
    const { auth } = props;
    const { isAuth, user } = auth;
    const [commentText, setCommentText] = useState("");

    const [isEditing, setIsEditing] = useState(false);

    const [commentEditId, setCommentEditId] = useState("");
    const _interaction = async (data) => {
        let dataFormat = {
            rates: await data.rates,
            follows: data.follows,
            comments: data.comments.map(c => {
                return {
                    user: c.user._id,
                    comment: c.comment,
                    date: c.date
                }
            })
        }
        console.log(dataFormat);
        props.interaction(postDetail._id, dataFormat);
    }

    const hasFollow = () => {
        if (!isAuth) return false;
        return postDetail?.follows?.includes(user._id)
    }

    const followChange = () => {
        if (hasFollow()) {
            let data = {
                rates: postDetail.rates,
                follows: postDetail?.follows?.filter(f => f !== user._id),
                comments: postDetail.comments
            }
            _interaction(data)
        } else {
            let data = {
                rates: postDetail.rates,
                follows: [...postDetail.follows, ...[user._id]],
                comments: postDetail.comments
            }
            _interaction(data)
        }
    }

    const isDisableRate = () => {
        if (!isAuth || !postDetail.interaction) return true;
        for (let i = 0; i < postDetail.rates?.length; ++i) {
            if (postDetail.rates[i].user === user._id) return true;
        }
        return false;
    }

    const changeRate = (value) => {
        let data = {
            rates: [...postDetail.rates, ...[{
                rate: value,
                user: user._id
            }]],
            follows: postDetail.follows,
            comments: postDetail.comments
        }
        _interaction(data)
    }

    const addComment = () => {
        if (!commentText.length) return;
        const newComment = {
            comment: commentText,
            user: { _id: user._id },
            date: new Date()
        };

        let data = {
            rates: postDetail.rates,
            follows: postDetail.follows,
            comments: [...[newComment], ...postDetail.comments]
        }
        _interaction(data);

        setCommentText("");
    }

    const deleteComment = (_id) => {
        let data = {
            rates: postDetail.rates,
            follows: postDetail.follows,
            comments: postDetail.comments.filter(c => c._id !== _id)
        }
        _interaction(data)
    }

    //Đưa data cần sửa vào ô input, chuyển trạng thành đang chỉnh sửa
    const setEditInfo = (com) => {
        console.log("com", com);
        if (!isEditing) {
            setIsEditing(true);
            setCommentText(com.comment);
            setCommentEditId(com._id)
            document.getElementById(`post-comment-input`)?.focus();
        } else {
            setIsEditing(false);
            setCommentText("");
        }
    }

    const updateComment = () => {
        let data = {
            rates: postDetail.rates,
            follows: postDetail.follows,
            comments: postDetail.comments.map(c => {
                if (c._id !== commentEditId) {
                    return c;
                } else {
                    return {
                        ...c,
                        comment: commentText
                    }
                }
            })
        }
        _interaction(data)

        setCommentEditId("")
        setCommentText("")
        setIsEditing(false)
    }

    const onChangeCommnent = (e) => {
        const { value } = e.target;
        setCommentText(value);
    }

    return <div style={{ margin: "3rem 0" }}>
        <hr />
        <h3 className="title">Đánh giá bài đăng</h3>

        <div className="post-rate-and-follow">
            <Rate className="sale-item-rate" onChange={changeRate} disabled={isDisableRate()} value={ratesAverage(postDetail?.rates)} />
            {isAuth && !hasFollow() && <Button type="dashed" onClick={followChange}>Theo dõi</Button>}
            {isAuth && hasFollow() && <Button type="primary" onClick={followChange}>Đang theo dõi</Button>}
        </div>

        <div className="post-comment">
            {isAuth ?
                (<div className="post-comment-input">
                    <Avatar
                        style={{
                            backgroundColor: '#87d068',
                        }}
                        icon={<UserOutlined />}
                        src={user.avatar ? user.avatar : ""}
                        size={40}
                    />
                    <TextArea rows={2} value={commentText} onChange={onChangeCommnent} id="post-comment-input" placeholder={postDetail.interaction ? "Viết bình luận..." : "Tính năng bình luận đã tắt"} disabled={!postDetail.interaction} />
                    <div onClick={isEditing ? updateComment : addComment}>
                        <SendOutlined style={{ fontSize: "2rem", color: "green" }} />
                    </div>
                </div>)
                :
                (<p style={{ color: "red" }}>Đăng nhập để có thể bình luận</p>)}

            {postDetail.interaction && isAuth?

                <div className="post-list-comment">
                    {Array.isArray(postDetail.comments) && postDetail.comments.map((c, index) => {
                        return <CommentItem
                            key={createItemKey()}
                            item={c}
                            deleteComment={deleteComment}
                            setEditInfo={setEditInfo}
                            updateComment={updateComment}
                        />
                    })}
                </div> : ''
            }
        </div>
    </div>
}

const mapStateToProps = state => {
    const { auth } = state;
    return { auth };
}

const mapDispatchToProps = {
    interaction: PostActions.interaction
}

export default connect(mapStateToProps, mapDispatchToProps)(Interaction);