const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProvinceSchema = new Schema({
    id: {
        type: Number,
    },
    code: {
        type: String,
    },
    name: {
        type: String,
    }
});

module.exports = Province = mongoose.model('Province', ProvinceSchema);