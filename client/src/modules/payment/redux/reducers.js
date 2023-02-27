import { PaymentConstants } from "./constants";

var initState = {
    paymentDetail: {},
    listPayments: [],
    isLoading: false,
    error: null,
}

export function payment(state = initState, action) {
    switch (action.type) {
        case PaymentConstants.CREATE_PAYMENT_REQUEST:
        case PaymentConstants.GET_ALL_PAYMENTS_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        
        case PaymentConstants.CREATE_PAYMENT_FAIL:
        case PaymentConstants.GET_ALL_PAYMENTS_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        
        case PaymentConstants.CREATE_PAYMENT_SUCCESS:
            return {
                ...state,
                paymentDetail: action.payload.payment,
                listPayments: [action.payload.payment, ...state.listPayments],
                isLoading: false,
            }
        
        case PaymentConstants.GET_ALL_PAYMENTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                listPayments: action.payload.allPayments.docs,
                totalDocs: action.payload.allPayments.totalDocs,
                limit: action.payload.allPayments.limit,
                totalPages: action.payload.allPayments.totalPages,
                page: action.payload.allPayments.page,
                pagingCounter: action.payload.allPayments.pagingCounter,
                hasPrevPage: action.payload.allPayments.hasPrevPage,
                hasNextPage: action.payload.allPayments.hasNextPage,
                prevPage: action.payload.allPayments.prevPage,
                nextPage: action.payload.allPayments.nextPage
            }
    
        default:
            return {
                ...state
            };
    }
}