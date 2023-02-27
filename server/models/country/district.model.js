const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DistrictSchema = new Schema({
    id: {
        type: Number,
    },
    code: {
        type: String,
    },
    name: {
        type: String,
    },
    provinceId: {
        type: Number
    }
});

module.exports = District = mongoose.model('District', DistrictSchema);