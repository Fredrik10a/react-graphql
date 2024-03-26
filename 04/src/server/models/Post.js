const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        // Letting MongoDB create the id, don't need to explicitly define it
        text: {
            type: String,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId, // Reference to User model
            ref: 'User', // This should match the name used when defining the User model
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
