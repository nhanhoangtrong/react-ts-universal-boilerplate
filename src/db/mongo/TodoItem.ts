import { Schema, model, Document } from 'mongoose';

export interface TodoItemDocument extends ITodoItem, Document {
}

const todoItemSchema = new Schema({
    id: {
        type: String,
        unique: true,
        required: true,
        index: true,
    },
    text: {
        type: String,
        default: '',
    },
    completed: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        required: true,
    },
}, {
    timestamps: true,
    _id: false,
});

export default model<TodoItemDocument>('TodoItem', todoItemSchema);
