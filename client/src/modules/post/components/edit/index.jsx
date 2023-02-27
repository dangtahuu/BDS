import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { withRouter,useParams } from 'react-router-dom';
import { Empty } from 'antd';

import Loading from '../../../../components/loading';

import { PostActions } from '../../redux/actions';

import EditForm from './editForm';

const EditPost = (props) => {
    const { post } = props;
    const { postForUpdate = {} } = post;
    
    const [loaded, setLoaded] = useState(false);
    const params = useParams();
    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            props.getPostForUpdate(params.id);
        }
    },[])

    return <React.Fragment>
        {post.isLoading && (<Loading />)}
        {postForUpdate._id && !post.isLoading && <EditForm />}
        {!postForUpdate._id && !post.isLoading && <Empty description="Không có dữ liệu" style={{marginTop: "10px"}}/>}
    </React.Fragment>
};

const mapStateToProps = state => {
    const { post } = state
    return { post };
}

const mapDispatchToProps = {
    getPostForUpdate: PostActions.getPostForUpdate
}

export default (connect(mapStateToProps, mapDispatchToProps)(EditPost));