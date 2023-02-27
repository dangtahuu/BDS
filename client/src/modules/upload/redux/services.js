import {
    sendRequest
} from '../../../helpers/requestHelper';

export const UploadServices = {
    uploadMultiImages
};

async function uploadMultiImages(data) {
    return sendRequest({
        url: `http://localhost:5000/upload/multi-images`,
        method: 'POST',
        data
    }, false, true)
}