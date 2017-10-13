import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userRoleSchema = new Schema({
    role: {
        type: String,
        required: true,
        unique: true,
    },
    level: {
        type: Number,
        unique: true,
    },
    name: String,
    description: String,
});

export interface UserRoleDocument extends IUserRole, mongoose.Document {
}

export default mongoose.model<UserRoleDocument>('UserRole', userRoleSchema);
