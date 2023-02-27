const CountryService = require('./country.service');

exports.getProvinces = async (req, res) => {
    try {
        let provinces = await CountryService.getProvinces();


        res.status(200).json({
            success: true,
            messages: ["Lấy danh sách tỉnh / thành phố thành công"],
            content: provinces
        });
    } catch (error) {

        res.status(400).json({
            success: false,
            messages: ["Lấy danh sách tỉnh / thành phố không thành công"],
            content: error.message
        });
    }
}

exports.getDistricts = async (req, res) => {
    try {
        let query = req.query;
        let districts = await CountryService.getDistricts(query);


        res.status(200).json({
            success: true,
            message: ["Lấy danh sách quận / huyện thành công"],
            content: districts
        });
    } catch (error) {

        res.status(400).json({
            success: false,
            message: ["Lấy danh sách quận / huyện không thành công"],
            content: error.message
        });
    }
}

exports.getWards = async (req, res) => {
    try {
        let query = req.query;
        let wards = await CountryService.getWards(query);


        res.status(200).json({
            success: true,
            message: ["Lấy danh sách xã / phường thành công"],
            content: wards
        });
    } catch (error) {

        res.status(400).json({
            success: false,
            message: ["Lấy danh sách xã / phường không thành công"],
            content: error.message
        });
    }
}