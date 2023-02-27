import {
    sendRequest
} from '../../../helpers/requestHelper';

export const PostServices = {
    createPost,
    getAllPosts,
    getPostDetail,
    getPostForUpdate,
    updatePost,
    deletePost,
    interaction,
    contact,
    getDashboardData
};

async function createPost(data) {
    return sendRequest({
        url: `http://localhost:5000/post`,
        method: 'POST',
        data
    }, true, true)
}

async function getAllPosts(queryData) {
    return sendRequest({
        url: `http://localhost:5000/post`,
        method: 'GET',
        params: queryData
    }, false, false)
}

async function getPostDetail(id) {
    return sendRequest({
        url: `http://localhost:5000/post/${id}`,
        method: 'GET'
    }, false, true)
}

async function getPostForUpdate(id) {
    return sendRequest({
        url: `http://localhost:5000/post/get-for-update/${id}`,
        method: 'GET'
    }, false, true)
}

async function updatePost(id, data) {
    return sendRequest({
        url: `http://localhost:5000/post/${id}`,
        method: 'PATCH',
        data
    }, true, true)
}

async function deletePost(id) {
    return sendRequest({
        url: `http://localhost:5000/post/${id}`,
        method: 'DELETE'
    }, true, true)
}

async function interaction(id, data) {
    return sendRequest({
        url: `http://localhost:5000/post/interaction/${id}`,
        method: 'PATCH',
        data
    }, false, true)
}

async function contact(id, data) {
    return sendRequest({
        url: `http://localhost:5000/post/contact/${id}`,
        method: 'PATCH',
        data
    }, false, true)
}
async function getDashboardData(queryData) {
    return sendRequest({
        url: `http://localhost:5000/post/dashboard`,
        method: 'GET',
        params: queryData
    }, false, true)
}
