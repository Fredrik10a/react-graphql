const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    avatar: String,
    username: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('User', userSchema);
