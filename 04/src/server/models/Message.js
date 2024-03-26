const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema(
    {
        // Letting MongoDB create the id, don't need to explicitly define it
        text: {
            type: String,
            required: true,
        },
        chat: {
            type: Schema.Types.ObjectId,
            ref: 'Chat',
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
