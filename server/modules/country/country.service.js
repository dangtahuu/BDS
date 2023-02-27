const Province = require('../../models/country/province.model')
const District = require('../../models/country/district.model')
const Ward = require('../../models/country/ward.model')
exports.getProvinces = async () => {

    let provinces = await Province.find({})
    return { provinces }
}
exports.getDistricts = async (query) => {
    let option = query

    let districts = await District.find(option)
    return { districts }
}
exports.getWards = async (query) => {
    let option = query

    let wards = await Ward.find(option)
    return { wards }
}