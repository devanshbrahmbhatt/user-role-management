const User = require('../models/users');
const jwt = require('jsonwebtoken');

exports.auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'thisIsUserRoleManagementProject');
        const user = await User.findOne({
            _id: decoded._id, 'tokens':
                token
        });

        if (!user) {
            throw new Error()
        }
        req.user = user
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({ error: "Please authenticate" })
    }
}