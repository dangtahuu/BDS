import {
    sendRequest
} from '../../../helpers/requestHelper';

export const CategoryServices = {
    createCategory,
    getAllCategories,
    getDetailCategory,
    updateCategory,
    deleteCategory
};

async function createCategory(data) {
    return sendRequest({
        url: `http://localhost:5000/category`,
        method: 'POST',
        data
    }, true, true)
}

async function getAllCategories(queryData) {
    return sendRequest({
        url: `http://localhost:5000/category`,
        method: 'GET',
        params: queryData
    }, false, true)
}

async function getDetailCategory(id) {
    return sendRequest({
        url: `http://localhost:5000/category/${id}`,
        method: 'GET'
    }, false, true)
}

async function updateCategory(id, data) {
    return sendRequest({
        url: `http://localhost:5000/category/${id}`,
        method: 'PATCH',
        data
    }, true, true)
}

async function deleteCategory(id) {
    return sendRequest({
        url: `http://localhost:5000/category/${id}`,
        method: 'DELETE'
    }, true, true)
}

