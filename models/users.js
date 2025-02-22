const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    firstName: { type: String, require: true },
    lastName: { type: String },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    role: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'Role' },
    tokens: {
        type: [String]
    },
    createdAt: { type: Date, default: Date.now },
});
userSchema.index({ firstName: 'text', lastName: 'text', email: 'text' });

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id }, 'thisIsUserRoleManagementProject', { expiresIn: '7 days' });
    user.tokens = user.tokens.concat(token);
    await user.save();
    return token;
}

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

const user = mongoose.model('User', userSchema);
module.exports = user;