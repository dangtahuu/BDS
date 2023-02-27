const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WardSchema = new Schema({
    id: {
        type: Number,
    },
    code: {
        type: String,
    },
    name: {
        type: String,
    },
    districtId: {
        type: Number
    }
});

module.exports = User = mongoose.model('Ward', WardSchema);