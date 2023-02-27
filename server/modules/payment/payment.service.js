const User = require('../../models/user/user.model')
const Payment = require('../../models/payment/payment.model')

exports.createPayment = async (data, user) => {
    let userInfo = await User.findById(user._id);
    if (!userInfo) {
        throw Error("User is not existing")
    }

    let payment = await Payment.create({ ...data, owner: user._id });

    if (payment.type === 1 || payment.type === 3) {
        userInfo.balance += payment.transaction;
    }

    if (payment.type === 2) {
        userInfo.balance -= payment.transaction;
    }
    await userInfo.save();


    return { payment }
}

exports.createPaymentAD = async (data, user) => {
    let admin = await User.findOne({ role: 3 });
    if (!admin) {
        throw Error("User is not existing")
    }

    let payment = await Payment.create({ ...data, owner: admin._id });
    if (payment.type === 4) {
        admin.balance += payment.transaction;
    }
    if (payment.type === 5) {
        admin.balance -= payment.transaction;
    }

    await admin.save();
    return { payment }
}

exports.getAllPayments = async (query, user) => {
    let { limit, page, type } = query;
    let option = {};
    let admin = await User.findOne({ role: 3 });
    let userInfo = await User.findById(user._id);

    console.log(admin._id, userInfo._id);
    if (user) {
        option.owner = user._id;
    }

    if (type) {
        option.type = type;
    }

    if (!page || !limit) {
        let allPayments = await Payment
            .find(option)
            .populate([{
                path: "post", select: 'title createdAt vipExpirationDate'
            }])
            .sort({ createdAt: 'desc' })

        return { allPayments }
    } else {
        let allPayments = await Payment.paginate(option, {
            page,
            limit,
            populate: [{
                path: "post", select: 'title createdAt vipExpirationDate'
            }],
            sort: { 'createdAt': 'desc' }
        })

        return { allPayments }
    }
}