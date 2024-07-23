import mongoose from 'mongoose';

const { Schema } = mongoose;

const postSchema = new Schema(
    {
        // MongoDB automatically creates the _id field
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
    { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

export default mongoose.model('Post', postSchema);
