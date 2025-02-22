const User = require('../models/users');
const bcrypt = require('bcryptjs');

exports.signUp = async (req, res) => {
    try {
        const { password } = req.body;
        const hashPassword = await bcrypt.hash(password, 8);
        const userObj = new User({
            ...req.body,
            password: hashPassword,
        });
        await userObj.save();
        res.status(201).json(userObj);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'User not found' })
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid Credentials' })
        }
        const token = await user.generateAuthToken();
        res.status(200).json({ token })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.userList = async (req, res) => {
    try {
        const { search } = req.query;
        const users = await User.find({
            $or: [
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
            ],
        }).populate('role', 'roleName accessModules');
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.checkModuleAccess = async (req, res) => {
    try {
        const { userId, moduleName } = req.body
        const user = await User.findById(userId).populate('role', 'roleName accessModules');
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }
        const hasAccess = user.role.accessModules.includes(moduleName);
        res.status(200).json({ userId, moduleName, hasAccess })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.updateManyUsers = async (req, res) => {
    try {
        const { filter, update } = req.body;
        const result = await User.updateMany(filter, { $set: update });
        res.status(200).json({
            message: "Users updated successfully.",
            matchedCount: result.matchedCount,
            modifiedCount: result.modifiedCount
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.updateMany = async (req, res) => {
    try {
        const { updates } = req.body;
        const bulkOps = updates.map((update) => ({
            updateOne: {
                filter: update.filter,
                update: {
                    $set: update.data
                }
            }
        }))

        await User.bulkWrite(bulkOps);
        res.status(200).json({ message: 'Users updated successfully' });

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}