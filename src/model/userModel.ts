import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: false, default: 'USER' },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    },
    createdDate: { type: Date, default: Date.now },
});

export const UserModel = mongoose.model('User', UserSchema);
