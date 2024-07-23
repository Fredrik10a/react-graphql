import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
        },
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chat',
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);

export default mongoose.model('Message', messageSchema);
