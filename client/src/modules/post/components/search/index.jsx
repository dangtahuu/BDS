import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Pagination, Empty, Breadcrumb } from 'antd';
import { useParams, useLocation } from "react-router-dom";
import Container from '../../../../components/container';
import Card from '../../../../components/card';
import Loading from '../../../../components/loading';
import SaleItem from '../../../../components/saleItem';
import Filter from '../../../../components/filter';
import { searchValues, searchPath } from "../../../../helpers/search";
import { PostActions } from '../../redux/actions';

const Search = (props) => {
    const { post } = props;
    const location = useLocation()
    const [queryData, setQueryData] = useState({
        limit: 10,
        page: 1,
        status: 2,
    })
    useEffect(() => {
        props.getAllPosts({ ...queryData, ...searchValues(location.state) });
    }, [location.key])


    const obj = searchPath(location.state)
    const content = () => {
        const format1 = (value) => {
            return value ? (value) + ', ' : ''
        }
        const x = (obj.type === 1 ? 'Cần bán ' : 'Cho thuê ') + (obj.categories ? obj.categories : 'Nhà đất') + (obj.direction ? ' hướng ' + obj.direction : '') + (obj.ward || obj.district || obj.province ? ' tại ' : '') + (format1(obj.ward) + format1(obj.district) + format1(obj.province)) + (obj.price ? ' có giá ' + obj.price : '') + (obj.acreage ? ' diện tích ' + obj.acreage : '')
        
        return x
    }
    return <React.Fragment>

        <Filter

        />

        <Container>
            {post.isLoading && <Loading />}
            <Breadcrumb>
                <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item>
                    {obj.type === 1 ? 'Cần bán ' : 'Cho thuê '} {obj.categories ? obj.categories : 'Nhà đất'}
                </Breadcrumb.Item>
                {obj.province ? <Breadcrumb.Item>
                    <span>{obj.province}</span>
                </Breadcrumb.Item> : ''}
                {obj.district ? <Breadcrumb.Item>
                    <span>{obj.district}</span>
                </Breadcrumb.Item> : ''}
                {obj.ward ? <Breadcrumb.Item>
                    <span>{obj.ward}</span>
                </Breadcrumb.Item> : ''}

                {obj.address ? <Breadcrumb.Item>
                    <span>{obj.address}</span>
                </Breadcrumb.Item> : ''}
            </Breadcrumb>
            <br></br>
            <div style={{fontWeight : 'bold', fontSize: '19px', marginBottom: '20px'}}>
                {content()}
            </div>

            {post?.listPosts?.length !== 0 ?
                post?.listPosts?.map((item) =>
                    <SaleItem
                        postItem={item}
                        key={item._id}
                    />
                ) :
                <Empty description="Không có dữ liệu" />
            }
            <Card.Footer styles={{ textAlign: "right" }}>
                <Pagination
                    total={post.totalDocs}
                    current={queryData.page}
                    pageSize={queryData.limit}
                    onChange={(page, pageSize) => {
                        setQueryData({ ...queryData, page, limit: pageSize })
                        console.log("page, pageSize", page, pageSize);
                    }}
                    showSizeChanger
                    showQuickJumper
                    pageSizeOptions={[5, 10, 15, 20, 50]}
                    showTotal={total => `Tổng ${total} mục`}
                />
            </Card.Footer>

        </Container>
    </React.Fragment>


};

const mapStateToProps = state => {
    const { post, category } = state;
    return { post, category };
}

const mapDispatchToProps = {
    getAllPosts: PostActions.getAllPosts,
    getPostDetail: PostActions.getPostDetail
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);