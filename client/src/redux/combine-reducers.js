import { IntlReducer as Intl } from 'react-redux-multilingual';
import { clearStorage } from '../config';
import { combineReducers } from 'redux';

import { auth } from '../modules/auth/redux/reducers';
import { user } from '../modules/user/redux/reducers';
import { country } from '../modules/country/redux/reducers';
import { post } from '../modules/post/redux/reducers';
import { category } from '../modules/category/redux/reducers';
import { payment } from '../modules/payment/redux/reducers';
import { fee } from '../modules/fee/redux/reducers';

const appReducer = combineReducers({
    auth,
    user,
    country,
    post,
    category,
    payment,
    fee,

    Intl
});

const rootReducer = (state, action) => {
    if (action.type === 'RESET') {
        state = undefined;
        clearStorage();
    }

    return appReducer(state, action);
}

export default rootReducer;