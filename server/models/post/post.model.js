const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    //Mô tả ngắn
    metaDescription: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    address: {
        type: String
    },
    ward: {
        type: Schema.Types.ObjectId,
        ref: 'Ward',
    },
    district: {
        type: Schema.Types.ObjectId,
        ref: 'District',
    },
    province: {
        type: Schema.Types.ObjectId,
        ref: 'Province',
    },
    type: {//1. Nhà đất bán, 2. Nhà đất cho thuê, 3. Cần thuê nhà đất, 4. Cần mua nhà đất, 5. Dự án
        type: Number,
        enum: [1, 2, 3, 4, 5]
    },
    //Các danh mục trong type
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category',
    }],
    price: {
        type: Number
    },
    //Dien tich
    acreage: {
        type: Number
    },
    //Ten du an
    projectName: {
        type: String
    },
    direction: { //1. Đông, 2. Tây, 3. Nam, 4. Bắc
        //5. Đông Nam, 6. Đông Bắc, 7. Tây Nam, 8. Tây Bắc
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8]
    },
    //Độ rộng đường trước nhà
    roadAhead: {
        type: Number
    },
    //Số lầu, số tầng
    floorNumber: {
        type: Number
    },
    //Số phòng ngủ
    bedroomNumber: {
        type: Number
    },
    legal: {//1. Sổ đỏ/sổ hồng, 2. Giấy tờ hợp lệ, 3. giấy phép xây dựng,  4. Giấy phép kinh doanh
        type: Number,
        enum: [1, 2, 3, 4]
    },
    //Toa do google map
    location: {
        lat: {
            type: Number
        },
        lng: {
            type: Number
        }
    },
    avatar: {
        type: String
    },
    images: [{
        type: String
    }],
    userName: {
        type: String
    },
    userEmail: {
        type: String
    },
    userPhone: {
        type: String
    },
    userAvatar: {
        type: String
    },
    //Trạng thái bài đăng
    status: {
        type: Number,
        default: 1,
        enum: [1, 2, 3] //1. Đang chờ, 2. Đã duyệt, 3. Đã hủy,
    },
    //Người theo dõi
    follows: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    interaction: {
        type: Boolean,

    },
    rates: [{
        rate: {
            type: Number,
            enum: [1, 2, 3, 4, 5]
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    comments: [{
        comment: {
            type: String
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        date: {
            type: Date
        }
    }],
    contacts: [{
        fullName: {
            type: String
        },
        phone: {
            type: String
        },
        feedback: {
            type: String
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        date: {
            type: Date
        },
        status: {
            type: Boolean,
            default: false
        }
    }],
    feeId: {
        type: Schema.Types.ObjectId,
        ref: 'Fee',
    },
    fee: {
        type: Number
    },
    //Hệ số thẻ VIP
    vipPoint: {
        type: Number,
        default: 0
    },
    //Ngày hết hạn của thẻ VIP
    vipExpirationDate: {
        type: Date
    }
}, {
    timestamps: true,
});

PostSchema.plugin(mongoosePaginate);

module.exports = Post = mongoose.model('Post', PostSchema);