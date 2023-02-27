import React from "react";
import { connect } from "react-redux";
import { EnvironmentOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import { FormatMoney } from '../../../../helpers/formatCurrency';
import { getFullAddress } from '../../../../helpers/formatAddress';
import { slug } from '../../../../helpers/slug';

import { PostActions } from '../../../post/redux/actions';

const dataStatus = [{},
    { title: "Đang chờ", color: "#FFE4C4" },
    { title: "Đã duyệt", color: "#00FFFF" },
    { title: "Đã hủy", color: "#DC143C" }]

const PostItem = (props) => {
    const { auth } = props;
    const { postItem, index, reLoadAfterUnFollow } = props;

    const unFollow = async () => {
        let data = {
            rates: postItem.rates,
            follows: postItem?.follows?.filter(f => f !== auth?.user?._id),
            comments: postItem.comments
        }
        await props.interaction(postItem._id, data);
        await props.reLoadAfterUnFollow();
    }

    return <tr>
        <td>{index}</td>

        <td className="user-post-item-avatar">
            <img src={postItem.avatar} alt="Ảnh"/>
        </td>

        <td>
            <div className="user-post-item-title">
                <Link to={`/detail/${slug(postItem.title)}.${postItem._id}.html`}>{ postItem.title }</Link>
            </div>
            <div>
                <EnvironmentOutlined style={{color: "green"}}/> &ensp;
                <span style={{ fontStyle: "italic" }}>
                    {getFullAddress(postItem?.address, postItem.ward, postItem.district, postItem.province)}
                </span>
            </div>
        </td>

        <td>
            {FormatMoney(postItem.price)}
        </td>

        <td style={{ color: `${postItem.status ? dataStatus[postItem.status].color : "black"}` }}>
            {postItem.status ? dataStatus[postItem.status].title : "--"}
        </td>

        <td>
            <Button type="secondary" onClick={unFollow}>
                Bỏ theo dõi
            </Button>
        </td>
    </tr>
};

const mapStateToProps = state => {
    const { auth } = state;
    return { auth };
}

const mapDispatchToProps = {
    interaction: PostActions.interaction
}

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);