const feeService = require('./fee.service');

exports.createFee = async (req, res) => {
    try {
        let data = req.body;
        
        let newFee = await feeService.createFee(data);


        res.status(201).json({
            success: true,
            messages: ["Tạo phí Vip thành công!"],
            content: newFee
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Tạo phí Vip không thành công!"],
            content: error.message
        });
    }
}

exports.getAllFees = async (req, res) => {
    try {
        let query = req.query;
        let allFees = await feeService.getAllFees(query);


        res.status(200).json({
            success: true,
            messages: ["Lấy danh sách phí VIP thành công!"],
            content: allFees
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Lấy danh sách phí VIP không thành công!"],
            content: error.message
        });
    }
}

exports.deleteFee = async (req, res) => {
    try {
        let id = req.params.id;
        let fee = await feeService.deleteFee(id);


        res.status(201).json({
            success: true,
            messages: ["Xóa gói VIP thành công!"],
            content: fee
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Xóa gói VIP không thành công!"],
            content: error.message
        });
    }
}