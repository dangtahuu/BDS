import { FeeConstants } from "./constants";

var initState = {
    feeDetail: {},
    listFees: [],
    isLoading: false,
    error: null,
}

export function fee(state = initState, action) {

    switch (action.type) {
        case FeeConstants.CREATE_FEE_REQUEST:
        case FeeConstants.GET_ALL_FEES_REQUEST:
        case FeeConstants.DELETE_FEE_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        
        case FeeConstants.CREATE_FEE_FAIL:
        case FeeConstants.GET_ALL_FEES_FAIL:
        case FeeConstants.DELETE_FEE_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        
        case FeeConstants.CREATE_FEE_SUCCESS:
            return {
                ...state,
                feeDetail: action.payload.fee,
                listFees: [action.payload.fee, ...state.listFees],
                isLoading: false,
            }
        
        case FeeConstants.GET_ALL_FEES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                listFees: action.payload.allFees.docs,
                totalDocs: action.payload.allFees.totalDocs,
                limit: action.payload.allFees.limit,
                totalPages: action.payload.allFees.totalPages,
                page: action.payload.allFees.page,
                pagingCounter: action.payload.allFees.pagingCounter,
                hasPrevPage: action.payload.allFees.hasPrevPage,
                hasNextPage: action.payload.allFees.hasNextPage,
                prevPage: action.payload.allFees.prevPage,
                nextPage: action.payload.allFees.nextPage
            }
        
        case FeeConstants.DELETE_FEE_SUCCESS:
            return {
                ...state,
                listFees: state.listFees.filter(u => u._id !== action.payload.fee._id),
                isLoading: false,
            }
    
        default:
            return {
                ...state
            };
    }
}