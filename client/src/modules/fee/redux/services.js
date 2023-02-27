import {
    sendRequest
} from '../../../helpers/requestHelper';

export const FeeServices = {
    createFee,
    getAllFees,
    deleteFee
};
async function createFee(data) {
    return sendRequest({
        url: `http://localhost:5000/fee`,
        method: 'POST',
        data
    }, true, true)
}

async function getAllFees(queryData) {
    return sendRequest({
        url: `http://localhost:5000/fee`,
        method: 'GET',
        params: queryData
    }, false, false)
}

async function deleteFee(id) {
    return sendRequest({
        url: `http://localhost:5000/fee/${id}`,
        method: 'DELETE'
    }, true, true)
}