const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema(
    {
        // Letting MongoDB create the id, don't need to explicitly define it
        // messages: Array of references to the Message model
        messages: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Message',
            },
        ],
        // users: Array of references to the User model
        users: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        // lastMessage: Single reference to the Message model
        lastMessage: {
            type: Schema.Types.ObjectId,
            ref: 'Message',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Chat', chatSchema);
