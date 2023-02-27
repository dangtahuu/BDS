import {
    sendRequest
} from '../../../helpers/requestHelper';

export const AuthService = {
    login
};

async function login(data) {
    return sendRequest({
        url: 'http://localhost:5000/auth/login',
        method: 'POST',
        data
    }, false, true)
}