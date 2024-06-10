const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }
},{
    timestamps: true
})

const User = mongoose.model('users', UserSchema)

module.exports = User;