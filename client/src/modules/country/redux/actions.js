import { CountryService } from "./services";
import { CountryConstants } from "./constants";

export const CountryActions = {
    getProvinces,
    getDistricts,
    getWards
}

function getProvinces() {
    return dispatch => {
        dispatch({ type: CountryConstants.GET_PROVINCES_REQUEST });
        CountryService.getProvinces()
            .then(res => {

                dispatch({
                    type: CountryConstants.GET_PROVINCES_SUCCESS,
                    payload: res.data?.content?.provinces
                })
            })
            .catch(err => {
                dispatch({ type: CountryConstants.GET_PROVINCES_FAIL, payload: err?.response?.data?.messages?.[0] });
            })
    }
}

function getDistricts(queryData) {
    return dispatch => {
        dispatch({ type: CountryConstants.GET_DISTRICTS_REQUEST });
        CountryService.getDistricts(queryData)
            .then(res => {

                dispatch({
                    type: CountryConstants.GET_DISTRICTS_SUCCESS,
                    payload: res.data?.content?.districts
                })
            })
            .catch(err => {
                dispatch({ type: CountryConstants.GET_DISTRICTS_FAIL, payload: err?.response?.data?.messages?.[0] });
            })
    }
}

function getWards(queryData) {
    return dispatch => {
        dispatch({ type: CountryConstants.GET_WARDS_REQUEST });
        CountryService.getWards(queryData)
            .then(res => {

                dispatch({
                    type: CountryConstants.GET_WARDS_SUCCESS,
                    payload: res.data?.content?.wards
                })
            })
            .catch(err => {
                dispatch({ type: CountryConstants.GET_WARDS_FAIL, payload: err?.response?.data?.messages?.[0] });
            })
    }
}
