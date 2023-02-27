import { CountryConstants } from "./constants";

var initState = {
    provincesData: [],
    districtsData: [],
    wardsData: [],
    isLoading: false,
    error: null,
}

export function country(state = initState, action) {
    switch (action.type) {
        case CountryConstants.GET_PROVINCES_REQUEST:
        case CountryConstants.GET_DISTRICTS_REQUEST:
        case CountryConstants.GET_WARDS_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        
        case CountryConstants.GET_PROVINCES_FAIL:
        case CountryConstants.GET_DISTRICTS_FAIL:
        case CountryConstants.GET_WARDS_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        
        case CountryConstants.GET_PROVINCES_SUCCESS:
            return {
                ...state,
                provincesData: action.payload,
                districtsData: [],
                wardsData: [],
                isLoading: false,
            }
        
        case CountryConstants.GET_DISTRICTS_SUCCESS:
            return {
                ...state,
                districtsData: action.payload,
                wardsData: [],
                isLoading: false,
        }
        
        case CountryConstants.GET_WARDS_SUCCESS:
            return {
                ...state,
                wardsData: action.payload,
                isLoading: false,
            }

        default:
            return {
                ...state
            };
    }
}