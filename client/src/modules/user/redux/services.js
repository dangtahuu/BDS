import {
    sendRequest
} from '../../../helpers/requestHelper';

export const UserService = {
    register,
    getAllUsers,
    getDetailUser,
    updateUser,
    changePassword,
    getPostsOfUser,
    deleteUser
};

async function register(data) {
    return sendRequest({
        url: 'http://localhost:5000/user',
        method: 'POST',
        data
    }, true, true)
}

async function getAllUsers(queryData) {
    return sendRequest({
        url: `http://localhost:5000/user`,
        method: 'GET',
        params: queryData
    }, false, true)
}

async function getDetailUser(id) {
    return sendRequest({
        url: `http://localhost:5000/user/${id}`,
        method: 'GET',
    }, false, true)
}

async function updateUser(id, data) {
    return sendRequest({
        url: `http://localhost:5000/user/${id}`,
        method: 'PATCH',
        data
    }, true, true)
}

async function changePassword(id, data) {
    return sendRequest({
        url: `http://localhost:5000/user/change-password/${id}`,
        method: 'PATCH',
        data
    }, true, true)
}

async function getPostsOfUser(id, query) {
    return sendRequest({
        url: `http://localhost:5000/user/posts-of-user/${id}`,
        method: 'GET',
        params: query
    }, false, true)
}

async function deleteUser(id) {
    return sendRequest({
        url: `http://localhost:5000/user/${id}`,
        method: 'DELETE',
    }, true, true)
}