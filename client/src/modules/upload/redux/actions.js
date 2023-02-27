import { UploadServices } from './services';

export const UploadActions = {
    uploadMultiImages,
    uploadSingleImage
}

function uploadMultiImages(data) {
    return new Promise((resolve, reject) => {
        UploadServices.uploadMultiImages(data)
            .then(res => { resolve(res.data?.content) })
            .catch(err => { reject(err) })
    })
}


function uploadSingleImage (image) {
    return new Promise((resolve, reject) => {
        UploadServices.uploadMultiImages(image)
            .then(res => { resolve(res.data?.content?.imageLinks) })
            .catch(err => { reject(err) })
    })
}
