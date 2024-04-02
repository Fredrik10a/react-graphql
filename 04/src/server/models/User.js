import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    avatar: String,
    username: {
        type: String,
        required: true,
    },
});

export default mongoose.model('User', userSchema);
