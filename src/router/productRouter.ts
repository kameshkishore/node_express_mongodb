import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProductById } from '../controllers/product';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { isAdmin } from '../middlewares/isAdmin';

const productRouter = (router: express.Router) => {
    router.get('/product', getAllProducts);
    router.get('/product/:id', getProductById);
    router.post('/product', isAuthenticated, isAdmin, createProduct);
    router.patch('/product/:id', isAuthenticated, isAdmin, updateProductById);
    router.delete('/product/:id', isAuthenticated, isAdmin,  deleteProduct);
};

export default productRouter;
