export const createItemKey = () => {
    return rd() + rd() + '-' + rd() + '-' + rd() + '-' + rd() + '-' + rd() + rd() + rd()
}
const rd = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
}