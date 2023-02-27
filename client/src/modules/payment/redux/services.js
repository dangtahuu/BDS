import {
    sendRequest
} from '../../../helpers/requestHelper';

export const PaymentServices = {
    createPayment,
    getAllPayments
};

async function createPayment(data) {
    return sendRequest({
        url: `http://localhost:5000/payment`,
        method: 'POST',
        data
    }, true, true)
}

async function getAllPayments(queryData) {
    return sendRequest({
        url: `http://localhost:5000/payment`,
        method: 'GET',
        params: queryData
    }, false, false)
}