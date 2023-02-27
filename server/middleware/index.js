const jwt = require('jsonwebtoken');

exports.auth = async (req, res, next) => {
    try {
        let token = req.header('auth-token');

        if (!token) {
            throw Error("unauthorization");
        }

        let verified;
        try {
            verified = await jwt.verify(token, 'process.env.TOKEN_SECRET');
        } catch (error) {
            throw Error("Unauthorization");
        }

        req.user = verified;
        req.token = token;
        next();

    } catch (error) {
        res.status(401).json({
            success: false,
            content: error.message
        })
    }
}