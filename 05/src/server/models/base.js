import mongoose from 'mongoose';

const baseOptions = {
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: (doc, ret) => {
            ret.id = ret._id.toString();
            delete ret._id;
            delete ret.__v;
        },
    },
};

const BaseSchema = new mongoose.Schema({}, baseOptions);

BaseSchema.virtual('id').get(function () {
    return this._id.toString();
});

export default BaseSchema;
