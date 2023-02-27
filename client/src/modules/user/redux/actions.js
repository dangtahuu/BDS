import { UserService } from "./services";
import { UserConstants } from "./constants";
// import { AuthActions } from '../../auth/redux/actions';

export const UserActions = {
    register,
    getAllUsers,
    getDetailUser,
    updateUser,
    changePassword,
    getPostsOfUser,
    deleteUser
}

function register(user) {
    return dispatch => {
        dispatch({ type: UserConstants.REGISTER_REQUEST });
        UserService.register(user)
            .then(res => {
                dispatch({
                    type: UserConstants.REGISTER_SUCCESS,
                    payload: res.data?.content?.user
                })
            })
            .catch(err => {
                dispatch({ type: UserConstants.REGISTER_FAIL, payload: err?.response?.data?.messages?.[0] });
            })
    }
}

function getAllUsers(queryData) {
    return dispatch => {
        dispatch({ type: UserConstants.GET_ALL_USERS_REQUEST });
        UserService.getAllUsers(queryData)
            .then(res => {
                dispatch({
                    type: UserConstants.GET_ALL_USERS_SUCCESS,
                    payload: res.data.content
                })
            })
            .catch(err => {
                dispatch({ type: UserConstants.GET_ALL_USERS_FAIL, payload: err?.response?.data?.messages?.[0] });
            })
    }
}

function getDetailUser(id) {
    return dispatch => {
        dispatch({ type: UserConstants.GET_USER_DETAIL_REQUEST });
        UserService.getDetailUser(id)
            .then(res => {
                dispatch({
                    type: UserConstants.GET_USER_DETAIL_SUCCESS,
                    payload: res.data.content
                })
            })
            .catch(err => {
                dispatch({ type: UserConstants.GET_USER_DETAIL_FAIL, payload: err?.response?.data?.messages?.[0] });
            })
    }
}

function updateUser(id, data) {
    return dispatch => {
        dispatch({ type: UserConstants.UPDATE_USER_REQUEST });
        UserService.updateUser(id, data)
            .then(res => {
                dispatch({
                    type: UserConstants.UPDATE_USER_SUCCESS,
                    payload: res.data.content
                })
            })
            .catch(err => {
                dispatch({ type: UserConstants.UPDATE_USER_FAIL, payload: err?.response?.data?.messages?.[0] });
            })
    }
}

function changePassword(id, data) {
    return dispatch => {
        dispatch({ type: UserConstants.CHANGE_PASSWORD_REQUEST });
        UserService.changePassword(id, data)
            .then(res => {
                dispatch({
                    type: UserConstants.CHANGE_PASSWORD_SUCCESS,
                    payload: res.data.content
                })

                // Đăng xuất khi thay đổi mật khẩu
                // AuthActions.logOut();
            })
            .catch(err => {
                dispatch({ type: UserConstants.CHANGE_PASSWORD_FAIL, payload: err?.response?.data?.messages?.[0] });
            })
    }
}


function getPostsOfUser(id, query) {
    return dispatch => {
        dispatch({ type: UserConstants.GET_POSTS_OF_USER_REQUEST });
        UserService.getPostsOfUser(id, query)
            .then(res => {
                dispatch({
                    type: UserConstants.GET_POSTS_OF_USER_SUCCESS,
                    payload: res.data.content
                })
            })
            .catch(err => {
                dispatch({ type: UserConstants.GET_POSTS_OF_USER_FAIL, payload: err?.response?.data?.messages?.[0] });
            })
    }
}

function deleteUser(id) {
    return dispatch => {
        dispatch({ type: UserConstants.DELETE_USER_REQUEST });
        UserService.deleteUser(id)
            .then(res => {
                dispatch({
                    type: UserConstants.DELETE_USER_SUCCESS,
                    payload: res.data.content
                })
            })
            .catch(err => {
                dispatch({ type: UserConstants.DELETE_USER_FAIL, payload: err?.response?.data?.messages?.[0] });
            })
    }
}