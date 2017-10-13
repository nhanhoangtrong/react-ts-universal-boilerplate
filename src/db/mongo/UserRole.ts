import { Schema, model, Document } from 'mongoose';

const userRoleSchema = new Schema({
    role: {
        type: String,
        required: true,
        unique: true,
    },
    name: String,
    description: String,
});

export interface UserRoleDocument extends IUserRole, Document {
}

export default model<UserRoleDocument>('UserRole', userRoleSchema);
