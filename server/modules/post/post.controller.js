const postService = require('./post.service');

exports.createNewPost = async (req, res) => {
    try {
        let data = req.body;
        let newPost = await postService.createPost(data, req.user);


        res.status(201).json({
            success: true,
            messages: ["Đăng bài thành công!"],
            content: newPost
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Bài đăng chưa được thêm!"],
            content: error.message
        });
    }
}

exports.getAllPost = async (req, res) => {
    try {
        let query = req.query;
        let allPosts = await postService.getAllPosts(query);


        res.status(200).json({
            success: true,
            messages: ["Lấy danh sách bài đăng thành công!"],
            content: allPosts
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Lấy danh sách bài đăng không thành công!"],
            content: error.message
        });
    }
}

exports.getDetailPost = async ( req, res ) => {
    try {
        let id = req.params.id;
        let post = await postService.getDetailPost( id)

        res.status(200).json({
            success: true,
            messages: ["Lấy dữ liệu bài đăng thành công"],
            content: post
        });
    } catch (error) {

        res.status(400).json({
            success: false,
            messages: ["Lấy dữ liệu bài đăng không thành công"],
            content: error.message
        });
    }
}

exports.getPostForUpdate = async ( req, res ) => {
    try {
        let id = req.params.id;
        console.log(id);
        let post = await postService.getPostForUpdate( id, req.user._id)

        res.status(200).json({
            success: true,
            messages: ["Lấy dữ liệu bài đăng thành công"],
            content: post
        });
    } catch (error) {

        res.status(400).json({
            success: false,
            messages: error.message === "you_can_not_access" ?
            ["Bạn không có quyền truy cập!"] :
            ["Lấy dữ liệu bài đăng không thành công"],
            content: error.message
        });
    }
}

exports.updatePost = async ( req, res ) => {
    try {
        let id = req.params.id;
        let data = req.body;
        let post = await postService.updatePost( id, data)

        res.status(200).json({
            success: true,
            messages: ["Cập nhật bài đăng thành công"],
            content: post
        });
    } catch (error) {

        res.status(400).json({
            success: false,
            messages: ["Cập nhật bài đăng không thành công"],
            content: error.message
        });
    }
}

exports.deletePost = async ( req, res ) => {
    try {
        let postId = req.params.id;
        let post = await postService.deletePost( postId, req.user._id)

        res.status(200).json({
            success: true,
            messages: ["Xóa bài đăng thành công"],
            content: post
        });
    } catch (error) {

        res.status(400).json({
            success: false,
            messages: ["Xóa bài đăng không thành công"],
            content: error.message
        });
    }
}

exports.interaction = async ( req, res ) => {
    try {
        let id = req.params.id;
        let data = req.body;
        let post = await postService.interaction( id, data)

        res.status(200).json({
            success: true,
            messages: ["Tương tác bài viết thành công"],
            content: post
        });
    } catch (error) {
        console.log("eee", error.message);
        res.status(400).json({
            success: false,
            messages: ["Tương tác bài viết không thành công"],
            content: error.message
        });
    }
}
exports.contact = async ( req, res ) => {
    try {
        let id = req.params.id;
        let data = req.body;
        let post = await postService.contact( id, data)

        res.status(200).json({
            success: true,
            messages: ["Gửi liên hệ thành công"],
            content: post
        });
    } catch (error) {
        console.log("eee", error.message);
        res.status(400).json({
            success: false,
            messages: ["Gửi liên hệ không thành công"],
            content: error.message
        });
    }
}
exports.checkOutDatedVip = async ( req, res ) => {
    try {
        let info = await postService.checkOutDatedVip()

        res.status(200).json({
            success: true,
            messages: ["Đã kiểm tra"],
            content: info
        });
    } catch (error) {

        res.status(400).json({
            success: false,
            messages: ["Đã xảy ra lỗi trong quá trình kiểm tra"],
            content: error.message
        });
    }
}
exports.checkTimeout = async ( req, res ) => {
    try {
        let info = await postService.checkTimeout()

        res.status(200).json({
            success: true,
            messages: ["Đã kiểm tra"],
            content: info
        });
    } catch (error) {

        res.status(400).json({
            success: false,
            messages: ["Đã xảy ra lỗi trong quá trình kiểm tra"],
            content: error.message
        });
    }
}
exports.getDashboardData = async ( req, res ) => {
    try {
        console.log(req.query);
        let data = await postService.getDashboardData(req.query)

        res.status(200).json({
            success: true,
            messages: ["Lấy dữ liệu thành công"],
            content: data
        });
    } catch (error) {
        console.log(error.message + '123');
        res.status(400).json({
            success: false,
            messages: ["Lấy dữ liệu không thành công"],
            content: error.message
        });
    }
}