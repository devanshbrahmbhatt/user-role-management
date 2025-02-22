const mongoose = require('mongoose');
const roleSchema = new mongoose.Schema({
    roleName: { type: String, unique:true },
    accessModules: { type: [String] },
    createdAt: {
        type: Date,
        default: Date.now
    },
    active: { type: Boolean, default: true }
});

const role = mongoose.model('Role',roleSchema);
module.exports = role;