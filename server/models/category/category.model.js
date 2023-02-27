const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    //Loại, được quy ước ở bên thuộc tính type của model Post
    type: {//1. Nhà đất bán, 2. Nhà đất cho thuê
        type: Number,
        required: true
    }
},{
    timestamps: true,
});

CategorySchema.plugin(mongoosePaginate);

module.exports = Category = mongoose.model('Category', CategorySchema);