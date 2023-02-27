import { PostConstants } from "./constants";
import { findIndex } from '../../../helpers/findIndex';

var initState = {
    postDetail: {},
    postForUpdate: {},
    postDeleted: {},
    postCreated: {},
    listPosts: [],
    //Dữ liệu dashboard theo khu vực
    areaDashboard: [],
    //Dữ liệu dashboard theo ngày
    dateDashboard: [],
    isLoading: false,
    error: null,
}

export function post(state = initState, action) {
    let index = -1;

    switch (action.type) {
        case PostConstants.UPLOAD_AVATAR_AND_IMAGE_REQUEST:
        case PostConstants.POST_ADD_REQUEST:
        case PostConstants.GET_ALL_POST_REQUEST:
        case PostConstants.GET_POST_DETAIL_REQUEST:
        case PostConstants.GET_POST_FOR_UPDATE_REQUEST:
        case PostConstants.UPDATE_POST_REQUEST:
        case PostConstants.DELETE_POST_REQUEST:
        case PostConstants.GET_DASHBOARD_DATA_REQUEST:
        case PostConstants.INTERACTION_REQUEST:
        case PostConstants.CONTACT_REQUEST:

            return {
                ...state,
                isLoading: true,
            };

        case PostConstants.POST_ADD_FAIL:
        case PostConstants.GET_ALL_POST_FAIL:
        case PostConstants.GET_POST_DETAIL_FAIL:
        case PostConstants.GET_POST_FOR_UPDATE_FAIL:
        case PostConstants.UPDATE_POST_FAIL:
        case PostConstants.DELETE_POST_FAIL:
        case PostConstants.INTERACTION_FAIL:
        case PostConstants.CONTACT_FAIL:
        case PostConstants.GET_DASHBOARD_DATA_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        case PostConstants.POST_ADD_SUCCESS:
            return {
                ...state,
                postCreated: action.payload.post,
                isLoading: false,
            }

        case PostConstants.GET_ALL_POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                listPosts: action.payload.allPosts.docs,
                totalDocs: action.payload.allPosts.totalDocs,
                limit: action.payload.allPosts.limit,
                totalPages: action.payload.allPosts.totalPages,
                page: action.payload.allPosts.page,
                pagingCounter: action.payload.allPosts.pagingCounter,
                hasPrevPage: action.payload.allPosts.hasPrevPage,
                hasNextPage: action.payload.allPosts.hasNextPage,
                prevPage: action.payload.allPosts.prevPage,
                nextPage: action.payload.allPosts.nextPage
            }

        case PostConstants.GET_POST_DETAIL_SUCCESS:
            return {
                ...state,
                postDetail: action.payload.post,
                isLoading: false,
            }

        case PostConstants.GET_POST_FOR_UPDATE_SUCCESS:
            return {
                ...state,
                postForUpdate: action.payload.post,
                isLoading: false,
            }

        case PostConstants.UPDATE_POST_SUCCESS:
            index = findIndex(state.listPosts, action.payload.post._id);
            if (index !== -1) {
                state.listPosts[index] = action.payload.post
            }
            return {
                ...state,
                postForUpdate: action.payload.post,
                isLoading: false,
            }

        case PostConstants.DELETE_POST_SUCCESS:
            return {
                ...state,
                postDeleted: action.payload.post,
                isLoading: false,
            }

        case PostConstants.INTERACTION_SUCCESS:
            return {
                ...state,
                postDetail: action.payload.post,
                isLoading: false,
            }
        case PostConstants.CONTACT_SUCCESS:
            return {
                ...state,
                postDetail: action.payload.post,
                isLoading: false,
            }
        case PostConstants.GET_DASHBOARD_DATA_SUCCESS:
            return {
                ...state,
                dateDashboard: action.payload.dataForDate,
                areaDashboard: action.payload.dataForArea,
                isLoading: false,
            }

        default:
            return {
                ...state
            };
    }
}