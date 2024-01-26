import mongoose from 'mongoose';

const UploadSchema = new mongoose.Schema({
    data: { type: String, required: true },
    fileName: { type: String, required: true },
    mimeType: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export const UploadModal = mongoose.model('Upload', UploadSchema);
