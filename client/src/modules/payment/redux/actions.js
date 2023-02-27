import {  } from "./services";
import { PaymentConstants } from "./constants";
import { PaymentServices } from "./services";

export const PaymentActions = {
    createPayment,
    getAllPayments
}

function createPayment(data) {
    return dispatch => {
        dispatch({ type: PaymentConstants.CREATE_PAYMENT_REQUEST });
        PaymentServices.createPayment(data)
            .then(res => {
                dispatch({
                    type: PaymentConstants.CREATE_PAYMENT_SUCCESS,
                    payload: res.data?.content
                })
            })
            .catch(err => {
                dispatch({ type: PaymentConstants.CREATE_PAYMENT_FAIL, payload: err?.response?.data?.messages?.[0] });
            })
    }
}


function getAllPayments (queryData) {
    return (dispatch) => {
        dispatch({
            type: PaymentConstants.GET_ALL_PAYMENTS_REQUEST
        })

        PaymentServices.getAllPayments(queryData)
        .then((res) => {
            dispatch({
                type: PaymentConstants.GET_ALL_PAYMENTS_SUCCESS,
                payload: res.data.content
            })
        })
        .catch((error) => {
            dispatch({
                type: PaymentConstants.GET_ALL_PAYMENTS_FAIL,
                error
            })
        })
    }
}