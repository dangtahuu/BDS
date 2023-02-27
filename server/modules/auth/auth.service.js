const { initConnection } = require('../../helpers/dbHelpers');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user/user.model')
exports.login = async (data) => {

    let user = await User.findOne({
        email: data.email
    });

    let checkPassword = bcrypt.compareSync(data.password, user.password);
    if (!user || !checkPassword) {
        throw Error("Account is not existing");
    }

    if (user.role === 1) {
        throw Error("account_pending");
    }

      
    let payload = {
        _id: user._id,
        phone: user.phone,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role
    }
    
    let token = jwt.sign(payload, 'process.env.TOKEN_SECRET', { expiresIn: 99999999 });

    return {
        token,
        user: {
            _id: user._id,
            phone: user.phone,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role
        }
    }
}