import mongoose from "mongoose";

const {Schema, model} = mongoose;

const noteSchema = new Schema({
    name: String,
    content: String,
    date: {
        type: Date,
        require: false,
    },
}, {
    timestamps: { createdAt: 'created', updatedAt: 'updated' },
    versionKey: false,
    id: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
        }
    }
});

export const Note = model("Note", noteSchema);
