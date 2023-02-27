import { slug } from "./slug"
const format = (value) => {
    return value ? slug(value) : value
}
export const formatPathName = (valuePath) => {
    let path
    if (valuePath.categories) {
        let query = `dien-tich=${format(valuePath.acreage)}&gia=${format(valuePath.price)}&huong-nha=${format(valuePath.direction)}`
        query = query.split('&').filter(item => !item.includes('undefined')).join('&')
        path = `${valuePath.type}/${slug(valuePath.categories + ' ' + (valuePath.address ?? '') + ' ' + (valuePath.province ?? '') + ' ' + (valuePath.district ?? '') + ' ' + (valuePath.ward ?? ''))}/?${query}`
    } else {
        let query = `address=${format(valuePath.anddress)}&district=${format(valuePath.district)}&ward=${format(valuePath.ward)}&dien-tich=${format(valuePath.acreage)}&gia=${format(valuePath.price)}&huong-nha=${format(valuePath.direction)}`
        query = query.split('&').filter(item => !item.includes('undefined')).join('&')
        path = `${valuePath.type}/nha-dat${valuePath.province ? '-' + slug(valuePath.province) + '/' : '/'}?${query}`

    }
    return path
}
