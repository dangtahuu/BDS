const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const FeeSchema = new Schema({
    //Trọng số của thẻ vip, trọng số càng cao thì càng được ưu tiên
    point: {
        type:  Number
    },
    fee: {
        type: Number
    },
    name: {
        type: String
    },
    type: {
        type: Number,
        default: 1
    },
    colorText: {
        type: String
    }
}, {
    timestamps: true,
});

FeeSchema.plugin(mongoosePaginate);

module.exports = Fee = mongoose.model('Fee', FeeSchema);