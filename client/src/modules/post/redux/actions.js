import { PostServices } from "./services";
import { PostConstants } from "./constants";
import { UploadActions } from "../../upload/redux/actions";

export const PostActions = {
    createPost,
    uploadAvatarAndImage,
    requestUploading,
    getAllPosts,
    getPostDetail,
    getPostForUpdate,
    updatePost,
    deletePost,
    interaction,
    contact,
    getDashboardData
}

function createPost(data) {
    return dispatch => {
        dispatch({ type: PostConstants.POST_ADD_REQUEST });
        PostServices.createPost(data)
            .then(res => {
                dispatch({
                    type: PostConstants.POST_ADD_SUCCESS,
                    payload: res.data?.content
                })
            })
            .catch(err => {
                dispatch({ type: PostConstants.POST_ADD_FAIL, payload: err?.response?.data?.messages?.[0] });
            })
    }
}


function getAllPosts (queryData) {
    return (dispatch) => {
        dispatch({
            type: PostConstants.GET_ALL_POST_REQUEST
        })

        PostServices.getAllPosts(queryData)
        .then((res) => {
            dispatch({
                type: PostConstants.GET_ALL_POST_SUCCESS,
                payload: res.data.content
            })
        })
        .catch((error) => {
            dispatch({
                type: PostConstants.GET_ALL_POST_FAIL,
                error
            })
        })
    }
}

function getPostDetail(id){
    return (dispatch) => {
        dispatch({
            type: PostConstants.GET_POST_DETAIL_REQUEST
        })

        PostServices.getPostDetail(id)
        .then((res) => {
            dispatch({
                type: PostConstants.GET_POST_DETAIL_SUCCESS,
                payload: res.data.content
            })
        })
        .catch((error) => {
            dispatch({
                type: PostConstants.GET_POST_DETAIL_FAIL,
                error
            })
        })
    }
}

function uploadAvatarAndImage (avatar, images) {
    return Promise.all([
        UploadActions.uploadMultiImages(avatar),
        UploadActions.uploadMultiImages(images)
    ])
        .then(res => {
            return {
                avatar: res[0].imageLinks,
                images: res[1].imageLinks,
            }
        })
        .catch(err => {
            return {
                type: PostConstants.UPLOAD_AVATAR_AND_IMAGE_FAIL,
                error: err
            }
        })
}

// //Tạo trạng thái đang upload cho hình ảnh: isLoading = true
function requestUploading (){
    return dispatch => {
        dispatch({
            type: PostConstants.UPLOAD_AVATAR_AND_IMAGE_REQUEST,
        })
    }
}

function getPostForUpdate(id){
    return (dispatch) => {
        dispatch({
            type: PostConstants.GET_POST_FOR_UPDATE_REQUEST
        })

        PostServices.getPostForUpdate(id)
        .then((res) => {
            dispatch({
                type: PostConstants.GET_POST_FOR_UPDATE_SUCCESS,
                payload: res.data.content
            })
        })
        .catch((error) => {
            dispatch({
                type: PostConstants.GET_POST_FOR_UPDATE_FAIL,
                error
            })
        })
    }
}

function updatePost(id, data){
    return (dispatch) => {
        dispatch({
            type: PostConstants.UPDATE_POST_REQUEST
        })

        PostServices.updatePost(id, data)
        .then((res) => {
            dispatch({
                type: PostConstants.UPDATE_POST_SUCCESS,
                payload: res.data.content
            })
        })
        .catch((error) => {
            dispatch({
                type: PostConstants.UPDATE_POST_FAIL,
                error
            })
        })
    }
}

function deletePost(id){
    return (dispatch) => {
        dispatch({
            type: PostConstants.DELETE_POST_REQUEST
        })

        PostServices.deletePost(id)
        .then((res) => {
            dispatch({
                type: PostConstants.DELETE_POST_SUCCESS,
                payload: res.data.content
            })
        })
        .catch((error) => {
            dispatch({
                type: PostConstants.DELETE_POST_FAIL,
                error
            })
        })
    }
}


function interaction(id, data){
    return (dispatch) => {
        dispatch({
            type: PostConstants.INTERACTION_REQUEST
        })

        PostServices.interaction(id, data)
        .then((res) => {
            dispatch({
                type: PostConstants.INTERACTION_SUCCESS,
                payload: res.data.content
            })
        })
        .catch((error) => {
            dispatch({
                type: PostConstants.INTERACTION_FAIL,
                error
            })
        })
    }
}

function contact(id, data){
    return (dispatch) => {
        dispatch({
            type: PostConstants.CONTACT_REQUEST
        })

        PostServices.contact(id, data)
        .then((res) => {
            dispatch({
                type: PostConstants.CONTACT_SUCCESS,
                payload: res.data.content
            })
        })
        .catch((error) => {
            dispatch({
                type: PostConstants.CONTACT_FAIL,
                error
            })
        })
    }
}

function getDashboardData(queryData){
    return (dispatch) => {
        dispatch({
            type: PostConstants.GET_DASHBOARD_DATA_REQUEST
        })

        PostServices.getDashboardData(queryData)
        .then((res) => {
            dispatch({
                type: PostConstants.GET_DASHBOARD_DATA_SUCCESS,
                payload: res.data.content
            })
        })
        .catch((error) => {
            dispatch({
                type: PostConstants.GET_DASHBOARD_DATA_FAIL,
                error
            })
        })
    }
}