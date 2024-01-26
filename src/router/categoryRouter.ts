import express from 'express';
import { getAllCategories, getCategoryById, createCategory, updateCategoryById, deleteCategory } from '../controllers/category';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { isAdmin } from '../middlewares/isAdmin';

const categoryRouter = (router: express.Router) => {
    router.get('/category', getAllCategories);
    router.get('/category/:id', getCategoryById);
    router.post('/category', isAuthenticated, isAdmin, createCategory);
    router.patch('/category/:id', isAuthenticated, isAdmin, updateCategoryById);
    router.delete('/category/:id', isAuthenticated, isAdmin,  deleteCategory);
};

export default categoryRouter;
