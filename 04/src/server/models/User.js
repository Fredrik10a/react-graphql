import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    avatar: String,
    username: {
        type: String,
        required: true,
        index: true, // Add an index on the username field
    },
});

export default mongoose.model('User', userSchema);
