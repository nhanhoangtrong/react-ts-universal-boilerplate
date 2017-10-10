import { Schema, model, Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        default: '',
    },
    role: {
        type: String,
        default: 'guest', // Admin, Moderator, Author, Guest
        index: true,
    },
}, {
    timestamps: true,
});

export interface UserDocument extends IUser, Document {
    email: string;
    password: string;
    role: string;
    comparePassword?: (candidatePassword: string, cb: (err: Error, matched: boolean) => void) => void;
}

/**
 * When a model is saving, check for password change
 */
userSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    return bcrypt.genSalt((genSaltError, salt) => {
        if (genSaltError) {
            return next(genSaltError);
        }

        return bcrypt.hash(this.password, salt, (hashError, hashedPassword) => {
            if (hashError) {
                return next(hashError);
            }
            this.password = hashedPassword;
            return next();
        });
    });
});

/**
 * Comparing user's candidate password with user's password
 */
userSchema.methods.comparePassword = function(candidatePassword: string, cb: (err: Error, matched: boolean) => void) {
    bcrypt.compare(candidatePassword, this.password, cb);
};

userSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

/**
 * Finally, creating User model from defined schema and exporting as default
 */
export default model<UserDocument>('User', userSchema);
