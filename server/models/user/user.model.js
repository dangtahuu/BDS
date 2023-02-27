const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {//Role: 1. Chưa kích hoạt, 2. Người dùng, 3: Admin
        type: Number,
        enum: [1, 2, 3],
        default: 1 
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    avatar: {
        type: String
    },
    //Số dư tài khoản
    balance: {
        type: Number,
        default: 0
    }
},{
    timestamps: true,
});

UserSchema.plugin(mongoosePaginate);

module.exports = User = mongoose.model('User', UserSchema);