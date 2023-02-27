const User = require('./user/user.model');
const Post = require('./post/post.model');
const Province = require('./country/province.model');
const District = require('./country/district.model');
const Ward = require('./country/ward.model');
const Category = require('./category/category.model');
const Payment = require('./payment/payment.model');
const Fee = require('./fee/fee.model');

module.exports = {
    User,
    Post,
    Province,
    District,
    Ward,
    Category,
    Payment,
    Fee
}