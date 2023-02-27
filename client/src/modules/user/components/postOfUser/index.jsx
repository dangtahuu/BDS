import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Pagination, Empty, Checkbox, Dropdown, Space, Menu } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons'
import Container from '../../container';
import Card from '../../../../components/card';
import Loading from '../../../../components/loading';

import { UserActions } from '../../redux/actions';

import PostItem from './postItem';

import './styles.scss';
const dataStatus = [{ title: "Tất cả", color: '#2a59c6', style: true },
{ title: "Chờ duyệt", status: 1, color: '#198754' },
{ title: "Đã duyệt", status: 2, color: '#ffc107' },
{ title: "Không duyệt", status: 3, color: '#dc3545' },

]

const PostOfUser = (props) => {
    const { user, auth, post } = props;
    const { postsOfUser = [] } = user;
    const { postDeleted, postForUpdate } = post;
    // console.log(post);
    const [loaded, setLoaded] = useState(false);
    const [active, setActive] = useState(false)
    const [queryData, setQueryData] = useState({
        page: 1,
        limit: 10
    });

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            props.getPostsOfUser(auth.user._id, queryData)
        }
    }, [])

    useEffect(() => {
        props.getPostsOfUser(auth.user._id, queryData);
    }, [queryData.limit, queryData.page, queryData.status, queryData.vip, queryData.expiration, queryData.vipPoint, queryData.type])

    //Load lại danh sách khi xóa 1 bài đăng
    useEffect(() => {
        props.getPostsOfUser(auth.user._id, queryData);
    }, [postDeleted])

    useEffect(() => {
        props.getPostsOfUser(auth.user._id, queryData);
    }, [postForUpdate])
    const changeStyle = () => {
        document.querySelectorAll('.posts-status button').forEach(item => item.style = `color: black; border-bottom-color: transparent`)
    }
    const [list, setList] = useState([])
    useEffect(() => {
        setList(postsOfUser)
    }, [postsOfUser])
    const menuSort = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <a target="_blank" rel="noopener noreferrer" onClick={() => setList(postsOfUser.slice().sort((a, b) => a.price - b.price))}>
                            Giá từ thấp đến cao
                        </a>
                    )

                },
                {
                    key: '2',
                    label: (
                        <a target="_blank" rel="noopener noreferrer" onClick={() => setList(postsOfUser.slice().sort((a, b) => b.price - a.price))}>
                            Giá từ cao xuống thấp
                        </a>
                    )
                },

            ]}
        />
    )
    return <Container>
        {user.isLoading && <Loading />}
        {/* <Card > */}
        <div>

            <h2>Quản lý bài đăng</h2>
            <div className="posts-status">
                {dataStatus.map((item, index) => {
                    return (
                        <button id={'btn' + index} style={item.style ? { color: item.color, borderBottomColor: '#2a59c6' } : {}} onClick={() => { changeStyle(); document.querySelector(`#btn${index}`).style = `color: ${item.color}; border-bottom-color: #2a59c6`; setQueryData({ ...queryData, page: 1, status: item.status, vipPoint: undefined, vip: undefined, expiration: undefined, type: undefined }) }} >
                            {item.title}
                        </button>
                    )
                }

                )}
                <button id='btn5' onClick={() => { changeStyle(); document.querySelector('#btn5').style = `color: red; border-bottom-color: #2a59c6`; setQueryData({ ...queryData, page: 1, vipPoint: true, expiration: undefined, vip: undefined, status: undefined, type: undefined }) }}>Tin VIP</button>

                <button id='btn6' onClick={() => { changeStyle(); document.querySelector('#btn6').style = `color: yellow; border-bottom-color: #2a59c6`; setQueryData({ ...queryData, page: 1, expiration: true, vip: true, vipPoint: undefined, status: undefined, type: undefined }) }}>Hết hạn</button>
            </div>
            <div className="posts-status">
                <button id='btn7' onClick={() => { changeStyle(); document.querySelector('#btn7').style = `color: red; border-bottom-color: #2a59c6`; setQueryData({ ...queryData, page: 1, vipPoint: undefined, expiration: undefined, vip: undefined, status: undefined, type: 1 }) }}>Cần bán</button>

                <button id='btn8' onClick={() => { changeStyle(); document.querySelector('#btn8').style = `color: yellow; border-bottom-color: #2a59c6`; setQueryData({ ...queryData, page: 1, expiration: undefined, vip: undefined, vipPoint: undefined, status: undefined, type: 2 }) }}>Cho thuê</button>
            </div>
        </div>
        <div >
            <div className="actionAll">
                <div className="sort">
                    <Dropdown
                        overlay={
                            menuSort
                        }
                        trigger={['click']}

                    >
                        <Space>
                            <div className="sort-icon">
                                <UpOutlined />
                                <DownOutlined />
                            </div>
                            Sắp xếp
                        </Space>
                    </Dropdown>
                </div>
            </div>
            {list.length !== 0 ?
                list.map((item, index) =>
                    <PostItem
                        postItem={{...item}}
                        key={index}
                    />) :
                <Empty description="Không có dữ liệu" style={{ marginTop: "10px" }} />}
        </div>

        <Card.Footer styles={{ textAlign: "right" }}>
            <Pagination
                total={user.totalDocs}
                current={queryData.page}
                pageSize={queryData.limit}
                onChange={(page, pageSize) => {
                    setQueryData({ ...queryData, page, limit: pageSize })
                }}
                showSizeChanger
                showQuickJumper
                pageSizeOptions={[5, 10, 15, 20, 50]}
                showTotal={total => `Tổng ${total} mục`}
            />
        </Card.Footer>
        {/* </ Card> */}

    </Container>
};

const mapStateToProps = state => {
    const { user, auth, post } = state;
    return { user, auth, post };
}

const mapDispatchToProps = {
    getPostsOfUser: UserActions.getPostsOfUser
}

export default connect(mapStateToProps, mapDispatchToProps)(PostOfUser);