import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: false },
    createdDate: { type: Date, default: Date.now },
});

export const CategoryModal = mongoose.model('Category', CategorySchema);
