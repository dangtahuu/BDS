import {
    sendRequest
} from '../../../helpers/requestHelper';

export const CountryService = {
    getProvinces,
    getDistricts,
    getWards
};

async function getProvinces() {
    return sendRequest({
        url: 'http://localhost:5000/country/province',
        method: 'GET'
    }, false, true)
} 

async function getDistricts(queryData) {
    return sendRequest({
        url:'http://localhost:5000/country/district',
        method: 'GET',
        params: queryData
    }, false, true)
}

async function getWards(queryData) {
    return sendRequest({
        url: 'http://localhost:5000/country/ward',
        method: 'GET',
        params: queryData
    }, false, true)
}