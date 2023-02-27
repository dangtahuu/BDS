import axios from 'axios';
import { getStorage } from '../config';
import { message } from 'antd';

export async function sendRequest(options, showSuccessAlert = false, showFailAlert = true) {
    const requestOptions = {
        url: options.url,
        method: options.method,
        data: options.data,
        params: options.params,
        responseType: options.responseType,
        headers: { "auth-token": getStorage("token") }
    };
    // console.log(requestOptions);
    return axios(requestOptions).then(res => {
        const messages = Array.isArray(res.data.messages) ? res.data.messages : [res.data.messages];
        showSuccessAlert && message.success(`${messages}`)
        return Promise.resolve(res);
    }).catch(err => {
        let messages;

        if (!err.response) {
            message.error(`Lỗi server`)
        } else {
            messages = Array.isArray(err.response.data.messages) ? err.response.data.messages : [err.response.data.messages];
        }

        if (messages) {
            showFailAlert && message.error(`${messages}`);
        }

        return Promise.reject(err);
    })
}