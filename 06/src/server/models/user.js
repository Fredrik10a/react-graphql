import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    avatar: String,
    username: {
        type: String,
        required: true,
        index: true, // Add an index on the username field
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

export default mongoose.model('User', userSchema);
