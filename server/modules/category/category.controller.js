const categoryService = require('./category.service');

exports.createCategory = async (req, res) => {
    try {
        let data = req.body;
        let newCategory = await categoryService.createCategory(data);
        res.status(201).json({
            success: true,
            messages: ["Đã thêm danh mục bài đăng!"],
            content: newCategory
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Thêm danh mục bài đăng thất bại!"],
            content: error.message
        });
    }
}

exports.getAllCategories = async (req, res) => {
    try {
        let query = req.query;
        
        let allCategories = await categoryService.getAllCategories(query);
        res.status(201).json({
            success: true,
            messages: ["Lấy danh sách danh mục thành công!"],
            content: allCategories
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Lấy danh sách danh mục không thành công!"],
            content: error.message
        });
    }
}

exports.getDetailCategory = async (req, res) => {
    try {
        let id = req.params.id;
        
        let category = await categoryService.getDetailCategory(id);
        res.status(201).json({
            success: true,
            messages: ["Lấy chi tiết danh mục thành công!"],
            content: category
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Lấy chi tiết danh mục không thành công!"],
            content: error.message
        });
    }
}

exports.updateCategory = async (req, res) => {
    try {
        let id = req.params.id;
        let data = req.body;
        
        let category = await categoryService.updateCategory(id, data);
        res.status(201).json({
            success: true,
            messages: ["Đã cập nhật danh mục!"],
            content: category
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Cập nhật danh mục không thành công!"],
            content: error.message
        });
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        let id = req.params.id;
        
        let category = await categoryService.deleteCategory(id);
        res.status(201).json({
            success: true,
            messages: ["Xóa danh mục thành công!"],
            content: category
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Xóa danh mục không thành công!"],
            content: error.message
        });
    }
}