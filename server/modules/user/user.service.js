const bcrypt = require('bcryptjs');

const { sendEmailRegisterUser, sendEmailActived } = require('../../helpers/emailHelpers');
const User = require('../../models/user/user.model');
exports.register = async (data) => {
    let { name, email, password } = data;

    let account = await User.findOne({
        email: email
    });
    if (account) {
        throw Error('account_existed')
    }

    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(password, salt);

    let user = await User.create({
        ...data, password: hashPassword
    });

    await sendEmailRegisterUser(email, name);
    return { user }
}
exports.getDetailUser = async (id) => {

    let user = await User.findById(id);

    if (!user) {
        throw Error('user_is_not_existed');
    }

    return { user }
}

exports.getPostsOfUser = async (id, query) => {
    let { page, limit, status, vipPoint, vip, expiration, type } = query;
    let option = {}
    if (status) option.status = status
    if (type) option.type = type
    if (vipPoint) option.vipPoint = { $gte: 1 }
    if (vip && expiration) {
        option.vipPoint = 0;
        option.fee = { $gte: 1 }
    }
    //pagination posts in user
    let startIndex = limit * (page - 1);
    let endIndex = limit * page;
    // option.posts = { $slice: [startIndex, endIndex] }
    let user = await User
        .findById(id)
        .populate([{
            path: "posts",
            match: option,
            // select: "title type status categories avatar createdAt price acreage province district ward address vipExpirationDate",
            populate: [{
                path: "province",
            }, {
                path: "district",
            }, {
                path: "ward",
            }, {
                path: "categories",
            }, {
                path: "feeId"
            }, {
                path: "contacts.user"
            }, {
                path: "rates.user"
            },
            {
                path: "follows"
            },
            {
                path: "comments.user"
            },]
        }])
    let { posts } = await User.findById(id).populate([{
        path: "posts",
        match: option,
        // select: "title type status categories avatar createdAt price acreage province district ward address vipExpirationDate",
        populate: [{
            path: "province",
        }, {
            path: "district",
        }, {
            path: "ward",
        }, {
            path: "categories",
        }, {
            path: "feeId"
        }, {
            path: "contacts.user"
        }, {
            path: "rates.user"
        },
        {
            path: "follows"
        },
        {
            path: "comments.user"
        },]
    }]);

    if (!user) {
        throw Error('user_is_not_existed');
    }

    if (!posts) {
        throw Error('post_of_user_is_empty');
    }

    let totalDocs = posts?.length;
    let listPosts = user.posts.sort((a, b) => b.createdAt - a.createdAt).slice(startIndex, endIndex)

    let postsOfUser = {
        docs: listPosts,
        totalDocs,
        totalPages: Math.ceil(totalDocs / limit),
        limit,
        page
    }
    // console.log(postsOfUser);
    return { postsOfUser }
}
exports.updateUser = async (id, data) => {
    if (!data.avatar) {
        data.avatar = undefined;
    }
    let currentUser = await User.findById(id)
    if (!currentUser) {
        throw Error('user_is_not_existed');
    }
    if (data.role === 2 && currentUser.role === 1) {
        await sendEmailActived(currentUser.email, currentUser.name);
    }
    // console.log(data.role);
    let user = await User.findByIdAndUpdate(id, {
        $set: data
    }, { new: true })

    return { user }
}

exports.changePassword = async (id, data) => {
    const { oldPassword, newPassword } = data;
    let currentUser = await User.findById(id)
    if (!currentUser) {
        throw Error('user_is_not_existed');
    }

    let checkPassword = bcrypt.compareSync(oldPassword, currentUser.password)
    if (!checkPassword) {
        throw Error("Password is invalid")
    }
    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(newPassword, salt);

    let user = await User.findByIdAndUpdate(id, { password: hashPassword }, { new: true })
    return { user }
}

exports.deleteUser = async (id) => {

    let user = await User.findByIdAndDelete(id)

    return { user }
}

exports.getAllUsers = async (query) => {
    let { page, limit, name, email, phone, role } = query;
    let option = {};

    //Set query data
    if (name) option.name = new RegExp(name, "i")
    if (email) option.email = new RegExp(email, "i")
    if (phone) option.phone = new RegExp(phone, "i")
    if (role) option.role = role


    if (!page || !limit) {
        let allUsers = await User
            .find(option)
            .sort({ createdAt: 'desc' })

        return { allUsers }
    } else {
        let allUsers = await User.paginate(option, {
            page,
            limit,
            sort: { 'createdAt': 'desc' }
        })

        return { allUsers }
    }
}