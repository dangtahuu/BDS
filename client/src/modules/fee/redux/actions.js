import {  } from "./services";
import { FeeConstants } from "./constants";
import { FeeServices } from "./services";

export const FeeActions = {
    createFee,
    getAllFees,
    deleteFee
}

function createFee(data) {
    return dispatch => {
        dispatch({ type: FeeConstants.CREATE_FEE_REQUEST });
        FeeServices.createFee(data)
            .then(res => {
                dispatch({
                    type: FeeConstants.CREATE_FEE_SUCCESS,
                    payload: res.data?.content
                })
            })
            .catch(err => {
                dispatch({ type: FeeConstants.CREATE_FEE_FAIL, payload: err?.response?.data?.messages?.[0] });
            })
    }
}

function getAllFees (queryData) {
    return (dispatch) => {
        dispatch({
            type: FeeConstants.GET_ALL_FEES_REQUEST
        })

        FeeServices.getAllFees(queryData)
        .then((res) => {
            dispatch({
                type: FeeConstants.GET_ALL_FEES_SUCCESS,
                payload: res.data.content
            })
        })
        .catch((error) => {
            dispatch({
                type: FeeConstants.GET_ALL_FEES_FAIL,
                error
            })
        })
    }
}

function deleteFee (id) {
    return (dispatch) => {
        dispatch({
            type: FeeConstants.DELETE_FEE_REQUEST
        })

        FeeServices.deleteFee(id)
        .then((res) => {
            dispatch({
                type: FeeConstants.DELETE_FEE_SUCCESS,
                payload: res.data.content
            })
        })
        .catch((error) => {
            dispatch({
                type: FeeConstants.DELETE_FEE_FAIL,
                error
            })
        })
    }
}