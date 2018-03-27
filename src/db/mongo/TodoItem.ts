import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface TodoItemDocument extends ITodoItem, mongoose.Document {}

const todoItemSchema = new Schema(
    {
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
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<TodoItemDocument>('TodoItem', todoItemSchema);
