const authService = require('./auth.service');

exports.login = async (req, res) => {
    try {
        let userLogin = await authService.login(req.body);
        res.status(200).json({
            success: true,
            messages: ["Đăng nhập thành công"],
            content: userLogin
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: error.message === "account_pending" ?
                ["Tài khoản của bạn chưa được kích hoạt, vui lòng đợi và kiểm tra email"] :
                ["Email hoặc mật khẩu không đúng"],
            content: error.message
        });
    }
}