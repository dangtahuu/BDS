// const { initConnection } = require('../../helpers/dbHelpers');
const Fee = require('../../models/fee/fee.model')
exports.createFee = async (data) => {

    let fee = await Fee.create(data);

    return { fee }
}

exports.getAllFees = async (query) => {
    let { limit, page, type } = query;
    let option = {};

    if (type) {
        option.type = type;
    }


    if (!page || !limit) {
        let allFees = await Fee
            .find(option)
            .sort({ point: 1 })
        
        return {allFees}
    } else {
        let allFees = await Fee.paginate(option, {
            page,
            limit,
            sort: { point: 1 }
        })

        return {allFees}
    }
}

exports.deleteFee = async (id) => {

    let fee = await Fee.findByIdAndDelete(id)

    return { fee }
}