const paymentService = require('../payment/payment.service');
const Post = require('../../models/post/post.model')
const User = require('../../models/user/user.model')
const Province = require('../../models/country/province.model')
const District = require('../../models/country/district.model')
const Ward = require('../../models/country/ward.model')

exports.createPost = async (data, user) => {


    //Kiem tra bai dang VIP
    if (data.vipType && data.vipPoint) {
        let date = new Date();

        if (data.vipType === 1) {//Goi 1 ngay
            data.vipExpirationDate = date.setDate(date.getDate() + data.day)
        }
        data.fee = data.vipFee * data.day;
    } else if (!data.vipType && data.vipPoint) {
        data.vipPoint = 0;
    }

    //Them bai viet vao db
    let newPost = await Post.create({ ...data, userName: user.name, userEmail: user.email, userPhone: user.phone, userAvatar: user.avatar });
    let post = await Post.findById({ _id: newPost._id });
    let userInfo = await User.findById(user._id);
    let admin = await User.findOne({ role: 3 });

    //Them vao danh sach bai post cua nguoi dang
    if (userInfo) {
        userInfo.posts.push(newPost._id);
        await userInfo.save();
    }

    //Luu lich su giao dich
    if (data.vipType && data.vipPoint) {
        const transactionData = {
            owner: user._id,
            post: post._id,
            transaction: data.vipFee * data.day,
            balance: userInfo.balance - data.vipFee * data.day,
            note: `Khách hàng đăng tin mới. Giá tin: ${(data.vipFee * data.day).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}`,
            type: 2
        }
        await paymentService.createPayment(transactionData, user)

        const transactionDataAD = {
            owner: admin._id,
            post: post._id,
            transaction: data.vipFee * data.day,
            balance: JSON.stringify(admin._id) !== JSON.stringify(userInfo._id) ? admin.balance + data.vipFee * data.day : admin.balance,
            note: `Người dùng đăng tin mới. Tài khoản: +${(data.vipFee * data.day).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}`,
            type: 4
        }
        await paymentService.createPaymentAD(transactionDataAD)
    }
    return { post }
}

exports.getAllPosts = async (query) => {
    let { page, limit, type, categories, address, province, district, ward,
        direction, priceFrom, priceTo, acreageFrom, acreageTo,
        title, userName, userPhone, status, vipType, followsLength, follows } = query;
    let option = {};
    // console.log(query);
    //Set query option
    if (type) option.type = type;
    if (categories) option.categories = categories;
    if (address) option.address = new RegExp(address, "i");
    if (province) option.province = province;
    if (district) option.district = district;
    if (ward) option.ward = ward;
    if (direction) option.direction = direction;
    if (priceFrom && priceTo) option.price = { $gte: priceFrom, $lte: priceTo }
    if (acreageFrom && acreageTo) option.acreage = { $gte: acreageFrom, $lte: acreageTo }
    if (title) option.title = new RegExp(title, "i");
    if (userName) option.userName = new RegExp(userName, "i");
    if (userPhone) option.userPhone = new RegExp(userPhone, "i");
    if (status) option.status = status;
    if (vipType == 2) {
        option.vipPoint = { $lte: 0 }
    } else if (vipType == 1) {
        option.vipPoint = { $gte: 1 }
    }
    // if (vipType) 
    console.log(option);
    if (follows) option.follows = follows;
    // console.log(Object.keys(option.follows).length);
    // if (followsLength) Object.keys(option.follows).length = { $gte: followsLength }
    if (!page || !limit) {
        let allPosts = await Post
            .find(option)
            .populate([{
                path: "province"
            },
            {
                path: "district"
            },
            {
                path: "ward"
            },
            {
                path: "feeId"
            },])
            .sort({ createdAt: 'desc', vipPoint: -1 })
        return { allPosts }
    } else {
        let allPosts = await Post.paginate(option, {
            page,
            limit,
            populate: [{
                path: "province"
            },
            {
                path: "district"
            },
            {
                path: "ward"
            },
            {
                path: "feeId"
            },],
            sort: { 'vipPoint': -1, 'createdAt': -1 }
        })
        console.log(allPosts.docs.length);
        return { allPosts }
    }
}

exports.getDetailPost = async (id) => {


    let post = await Post
        .findById(id)
        .populate([{
            path: "province"
        },
        {
            path: "district"
        },
        {
            path: "ward"
        },
        {
            path: "categories"
        },
        {
            path: "comments.user", select: 'name avatar'
        },
        {
            path: "contacts.user", select: 'name avatar'
        },

        {
            path: "feeId"
        },
        ])

    if (!post) {
        throw Error("Post is not existing")
    }
    return { post }
}

//Chỉ người đăng mới được sửa, nên cần xác thực trước khi trả về data
exports.getPostForUpdate = async (postId, userId) => {


    let user = await User.findById(userId);

    if (!user) {
        throw Error("User is not existing")
    }

    //Check post đó có phải của user này hay k
    let isPostOfUser = user.posts.includes(postId);

    if (!isPostOfUser) {
        throw Error("you_can_not_access")
    }

    let post = await Post
        .findById(postId)

    if (!post) {
        throw Error("Post is not existing")
    }
    return { post }
}

exports.updatePost = async (id, data) => {

    if (!data.avatar) {
        data.avatar = undefined;
    }

    if (!data.address) {
        data.address = undefined;
    }

    if (!data.description) {
        data.description = undefined;
    }

    if (!data.width) {
        data.width = undefined;
    }

    if (!data.length) {
        data.length = undefined;
    }

    if (!data.roadAhead) {
        data.roadAhead = undefined;
    }

    if (!data.floorNumber) {
        data.floorNumber = undefined;
    }

    if (!data.bedroomNumber) {
        data.bedroomNumber = undefined;
    }
    if (!data.contacts) {
        data.contacts = undefined;
    }
    if (data.status === 3) {
        if (data.vipPoint) {
            let listUser = await User.find();
            const user = listUser.filter(item => item.posts.includes(id))
            let owner = await User.findById(user[0]._id)
            let post = await Post.findById({ _id: id });
            let admin = await User.findOne({ role: 3 });

            const transactionData = {
                owner: owner._id,
                post: post._id,
                transaction: data.fee,
                balance: owner.balance + data.fee,
                note: `Trả lại tiền cho khách hàng vì không duyệt tin mới đã thanh toán . Tài khoản: +${data.fee.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}`,
                type: 3
            }
            await paymentService.createPayment(transactionData, owner)
            const transactionDataAD = {
                owner: admin._id,
                post: post._id,
                transaction: data.fee,
                balance: JSON.stringify(admin._id) !== JSON.stringify(owner._id) ? admin.balance - data.fee : admin.balance,
                note: `Không duyệt tin, hoàn lại tiền cho khách hàng. Tài khoản: -${data.fee.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}`,
                type: 5
            }
            await paymentService.createPaymentAD(transactionDataAD)
        }
    }
    let post = await Post.findByIdAndUpdate(id, {
        $set: data
    }, { new: true })

    return { post }
}

exports.deletePost = async (postId, userId) => {

    let postSelect = await Post.findById(postId);
    let user = await User.findById(userId);
    let admin = await User.findOne({ role: 3 });
    if (postSelect.status === 1 && postSelect.vipPoint) {
        const transactionData = {
            owner: user._id,
            post: postSelect._id,
            transaction: postSelect.fee,
            balance: user.balance + postSelect.fee,
            note: `Trả lại tiền cho khách hàng vì khách hàng xóa tin. Tài khoản: +${postSelect.fee.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}`,
            type: 3
        }
        await paymentService.createPayment(transactionData, user)
        const transactionDataAD = {
            owner: admin._id,
            post: postSelect._id,
            transaction: postSelect.fee,
            balance: JSON.stringify(admin._id) !== JSON.stringify(user._id) ? admin.balance - postSelect.fee : admin.balance,
            note: `Trả lại tiền cho khách hàng vì khách hàng xóa tin. Tài khoản: -${postSelect.fee.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}`,
            type: 5
        }
        await paymentService.createPaymentAD(transactionDataAD)
    }

    let post = await Post.findByIdAndDelete(postId);
    //Loại bỏ post khỏi user

    let posts = [...user.posts || []];
    user.posts = posts.filter(p => p.toString() !== postId);
    await user.save();

    return { post }
}

// //Comment, rate, follow
exports.interaction = async (id, data) => {

    const post = await Post.findById(id);

    if (!post) {
        throw Error("Post is not existing!")
    }


    post.rates = data.rates;
    post.comments = data.comments;
    post.follows = data.follows;

    await post.save();

    let postDetail = await Post
        .findById(id)
        .populate([{
            path: "province"
        },
        {
            path: "district"
        },
        {
            path: "ward"
        },
        {
            path: "categories"
        },
        {
            path: "comments.user", select: 'name avatar'
        }])

    return { post: postDetail }
}
exports.contact = async (id, data) => {

    const post = await Post.findById(id);

    if (!post) {
        throw Error("Post is not existing!")
    }


    post.contacts = data.contacts;

    await post.save();

    let postDetail = await Post
        .findById(id)
        .populate([{
            path: "province"
        },
        {
            path: "district"
        },
        {
            path: "ward"
        },
        {
            path: "categories"
        },
        {
            path: "contacts.user", select: 'name avatar'
        }])

    return { post: postDetail }
}
//Check outdated vip
exports.checkOutDatedVip = async () => {
    let option = { vipExpirationDate: { $lt: new Date() } };


    await Post.updateMany(option, {
        $set: {
            vipPoint: 0,
            // vipExpirationDate: null
        }
    })

    return "Kiểm tra và cập nhật thành công"
}
exports.checkTimeout = async () => {
    let date = new Date()
    date.setHours(date.getHours() - 8)
    let option = { vipPoint: { $gte: 1 }, status: 1, createdAt: { $lt: date } };


    await Post.updateMany(option, {
        $set: {
            status: 2
        }
    })

    return "Kiểm tra và cập nhật thành công"
}
exports.getDashboardData = async (query) => {
    let { startDate, endDate, province, district, type } = query;
    let option = {};

    if (startDate && endDate) {
        option = {
            ...option,
            createdAt: {
                $gte: startDate,
                $lte: endDate
            }
        }
    }

    if (province) option.province = province;
    if (district) option.district = district;
    if (type) option.type = type;


    let posts = await Post.find(option);

    //Lấy dữ liệu theo ngày 
    const groupForDate = await groupDataForDate(posts, new Date(startDate), new Date(endDate));
    //Lấy dữ liệu theo khu vực
    const groupForArea = await groupDataForArea(posts, province, district);

    //Map data để hiển thị trên biểu đồ
    let groupForAreaMap = groupForArea.map(item => {
        let totalPrice = item.data.reduce((a, b) => {
            return a + b.price;
        }, 0)

        return {
            x: item.area?.name,
            y: item.data?.length ?
                totalPrice / item.data?.length :
                0
        }
    })

    let groupForDateMap = groupForDate.map(item => {
        let totalPrice = item.post.reduce((a, b) => {
            return a + b.price;
        }, 0)

        return {
            x: item.date,
            y: item.post?.length ?
                (totalPrice / item.post?.length) :
                0
        }
    })

    return {
        dataForArea: groupForAreaMap,
        dataForDate: groupForDateMap
    }
}

const groupDataForArea = async (posts, province, district) => {
    //Nếu không query tỉnh thì lấy dữ liệu từng tỉnh trong cả nước
    if (!province) {
        let provinces = await Province.find({});
        let groups = [];

        if (!provinces) {
            throw Error("Data is null!")
        }

        provinces.forEach(pro => {
            let postsInfo = posts.filter(post => {
                return JSON.stringify(post.province) === JSON.stringify(pro._id);
            });

            if (!postsInfo) {
                groups.push({
                    data: [],
                    area: pro
                })
            } else {
                groups.push({
                    data: postsInfo,
                    area: pro
                })
            }
        })

        return groups;
    }

    //Nếu không query tỉnh và không query huyện, thì lấy dữ liệu theo các huyện trong tỉnh đó
    if (province && !district) {

        let provinceInfo = await Province.findById(province);
        let districts = await District.find({ provinceId: provinceInfo.id });
        let groups = [];

        if (!districts) {
            throw Error("Data is null!")
        }

        districts.forEach(dis => {
            let postsInfo = posts.filter(post => {
                return JSON.stringify(post.district) === JSON.stringify(dis._id);
            });

            if (!postsInfo) {
                groups.push({
                    data: [],
                    area: dis
                })
            } else {
                groups.push({
                    data: postsInfo,
                    area: dis
                })
            }
        })

        return groups;
    }

    //Ngược lại, query dữ liệu các xã trong 1 huyện
    let districtInfo = await District.findById(district);
    let wards = await Ward.find({ districtId: districtInfo.id });
    let groups = [];

    if (!wards) {
        throw Error("Data is null!")
    }

    wards.forEach(ward => {
        let postsInfo = posts.filter(post => {
            return JSON.stringify(post.ward) === JSON.stringify(ward._id);
        });

        if (!postsInfo) {
            groups.push({
                data: [],
                area: ward
            })
        } else {
            groups.push({
                data: postsInfo,
                area: ward
            })
        }
    })

    return groups;
}

const groupDataForDate = (posts, startDate, endDate) => {
    //Format date from start to end
    let groupForDate = {};
    let dateOfStart = startDate.getDate();
    let monthOfStart = startDate.getMonth();
    let yearOfStart = startDate.getFullYear();
    let dateOfEnd = endDate.getDate();
    let monthOfEnd = endDate.getMonth();
    let yearOfEnd = endDate.getFullYear();

    for (let y = yearOfStart; y <= yearOfEnd; ++y) {
        let mStart = y === yearOfStart ? monthOfStart : 0;
        let mEnd = y < yearOfEnd ? 11 : monthOfEnd;

        for (let m = mStart; m <= mEnd; ++m) {
            let dStart = m === mStart && y === yearOfStart ? dateOfStart : 1;
            let dEnd = m === mEnd && y === yearOfStart ? dateOfEnd : 31;

            for (let d = dStart; d <= dEnd; ++d) {
                let dateNew = new Date(y, m, d);
                const date = `${dateNew.getDate()}-${dateNew.getMonth() + 1}-${dateNew.getFullYear()}`;
                groupForDate[date] = [];
            }
        }
    }

    //Dữ liệu có cùng ngày gom vào 1 object theo 1 key là date
    posts.forEach(post => {
        const { createdAt } = post;
        const date = `${createdAt.getDate()}-${createdAt.getMonth() + 1}-${createdAt.getFullYear()}`;
        Array.isArray(groupForDate[date]) && groupForDate[date].push(post);
    });

    //Dữ liệu theo ngày trong 1 ngày gom vào 1 object
    const groupForDateArrays = Object.keys(groupForDate).map((date) => {
        return {
            date,
            post: groupForDate[date]
        };
    });

    return groupForDateArrays;
}

