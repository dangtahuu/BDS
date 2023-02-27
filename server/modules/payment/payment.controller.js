const paymentService = require('./payment.service');

exports.createPayment = async (req, res) => {
    try {
        let data = req.body;
        let newPayment = await paymentService.createPayment(data, req.user);
        res.status(201).json({
            success: true,
            messages: ["Thanh toán thành công!"],
            content: newPayment
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Thanh toán không thành công!"],
            content: error.message
        });
    }
}
exports.createPaymentAD = async (req, res) => {
    try {
        let data = req.body;
        let newPayment = await paymentService.createPaymentAD(data);
        res.status(201).json({
            success: true,
            messages: ["Thanh toán thành công!"],
            content: newPayment
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Thanh toán không thành công!"],
            content: error.message
        });
    }
}
exports.getAllPayments = async (req, res) => {
    try {
        let query = req.query;
        let allPayments = await paymentService.getAllPayments(query, req.user);
        res.status(200).json({
            success: true,
            messages: ["Lấy danh sách thanh toán thành công!"],
            content: allPayments
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Lấy danh sách thanh toán không thành công!"],
            content: error.message
        });
    }
}