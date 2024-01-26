import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: false },
    categoryId: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
});

export const ProductModal = mongoose.model('Product', ProductSchema);
