import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { Pagination, Empty } from 'antd';
import { useParams } from "react-router-dom";
import Container from '../../../../components/container';
import Card from '../../../../components/card';
import Loading from '../../../../components/loading';
import SaleItem from '../../../../components/saleItem';
// import Filter from '../common/filter';

import { PostActions } from '../../../post/redux/actions';

const ListPostByCategory = (props) => {
    const { post } = props;
    const { listCategoriesNoPagination = [] } = props.category;
    const  {catId}  = useParams();
    const [queryData, setQueryData] = useState({
        limit: 10,
        page: 1,
        categories: catId,
        status: 2
    })


    useEffect(() => {
        if (catId !== queryData.categories) {
            setQueryData({...queryData, categories: catId})
            props.getAllPosts({...queryData, categories: catId});
        }
    }, [catId])
    
    useEffect(() => {
        props.getAllPosts(queryData);
    }, [queryData])
    
    return <Container>
        {post.isLoading && <Loading />}
            <Card >
                <Card.Header>{listCategoriesNoPagination.find(c => c._id === catId)?.name || "Thông tin nhà đất"}</Card.Header>
                <Card.Body>
                    {post?.listPosts?.length !== 0 ?
                        post?.listPosts?.map((item) =>
                        <SaleItem
                            postItem={item}
                            key={item._id}
                        />
                        ) :
                        <Empty description="Không có dữ liệu"/>
                    }
                </Card.Body>
                <Card.Footer styles={{textAlign: "right"}}>
                    <Pagination
                        total={post.totalDocs}
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
            </ Card>
        
            {/* <Filter
                queryData={queryData}
                setQueryData={setQueryData}
            /> */}
    </Container>
};

const mapStateToProps = state => {
    const { post, category } = state;
    return { post, category };
}

const mapDispatchToProps = {
    getAllPosts: PostActions.getAllPosts,
    getPostDetail: PostActions.getPostDetail
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPostByCategory);