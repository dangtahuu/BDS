import { CategoryServices } from "./services";
import { CategoryConstants } from "./constants";

export const CategoryActions = {
    createCategory,
    getAllCategories,
    getDetailCategory,
    updateCategory,
    deleteCategory,
    getAllCategoriesNoPagination
}

function createCategory(data) {
    return dispatch => {
        dispatch({ type: CategoryConstants.CATEGORY_ADD_REQUEST });
        CategoryServices.createCategory(data)
            .then(res => {
                dispatch({
                    type: CategoryConstants.CATEGORY_ADD_SUCCESS,
                    payload: res.data?.content
                })
            })
            .catch(err => {
                dispatch({ type: CategoryConstants.CATEGORY_ADD_FAIL, payload: err?.response?.data?.messages?.[0] });
            })
    }
}

function getAllCategories(queryData) {
    return dispatch => {
        dispatch({ type: CategoryConstants.GET_ALL_CATEGORIES_REQUEST });
        CategoryServices.getAllCategories(queryData)
            .then(res => {
                dispatch({
                    type: CategoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                    payload: res.data.content
                })
            })
            .catch(err => {
                dispatch({ type: CategoryConstants.GET_ALL_CATEGORIES_FAIL, payload: err?.response?.data?.messages?.[0] });
            })
    }
}

function getDetailCategory(id) {
    return dispatch => {
        dispatch({ type: CategoryConstants.GET_DETAIL_CATEGORY_REQUEST });
        CategoryServices.getDetailCategory(id)
            .then(res => {
                dispatch({
                    type: CategoryConstants.GET_DETAIL_CATEGORY_SUCCESS,
                    payload: res.data.content
                })
            })
            .catch(err => {
                dispatch({ type: CategoryConstants.GET_DETAIL_CATEGORY_FAIL, payload: err?.response?.data?.messages?.[0] });
            })
    }
}

function updateCategory(id, data) {
    return dispatch => {
        dispatch({ type: CategoryConstants.UPDATE_CATEGORY_REQUEST });
        CategoryServices.updateCategory(id, data)
            .then(res => {
                dispatch({
                    type: CategoryConstants.UPDATE_CATEGORY_SUCCESS,
                    payload: res.data.content
                })
            })
            .catch(err => {
                dispatch({ type: CategoryConstants.UPDATE_CATEGORY_FAIL, payload: err?.response?.data?.messages?.[0] });
            })
    }
}

function deleteCategory(id) {
    return dispatch => {
        dispatch({ type: CategoryConstants.DELETE_CATEGORY_REQUEST });
        CategoryServices.deleteCategory(id)
            .then(res => {
                dispatch({
                    type: CategoryConstants.DELETE_CATEGORY_SUCCESS,
                    payload: res.data.content
                })
            })
            .catch(err => {
                dispatch({ type: CategoryConstants.DELETE_CATEGORY_FAIL, payload: err?.response?.data?.messages?.[0] });
            })
    }
}

function getAllCategoriesNoPagination(queryData) {
    return dispatch => {
        dispatch({ type: CategoryConstants.GET_ALL_CATEGORIES_NO_PAGINATION_REQUEST });
        CategoryServices.getAllCategories(queryData)
            .then(res => {
                dispatch({
                    type: CategoryConstants.GET_ALL_CATEGORIES_NO_PAGINATION_SUCCESS,
                    payload: res.data.content
                })
            })
            .catch(err => {
                dispatch({ type: CategoryConstants.GET_ALL_CATEGORIES_NO_PAGINATION_FAIL, payload: err?.response?.data?.messages?.[0] });
            })
    }
}