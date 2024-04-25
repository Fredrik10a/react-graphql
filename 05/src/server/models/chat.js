import mongoose from 'mongoose';
import BaseSchema from './base.js';

const chatSchema = new mongoose.Schema(
    {
        lastmessage: {
            type: String,
        },
        messages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Message',
            },
        ],
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    { timestamps: true }
);

// Merge the BaseSchema into chatSchema
chatSchema.add(BaseSchema);

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;
