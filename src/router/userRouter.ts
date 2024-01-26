import express from 'express';
import { getAllUsers, getUserById, deleteUserById, updateUserById } from '../controllers/user';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { isCurrentUser } from '../middlewares/isCurrentUser';

const userRouter = (router: express.Router) => {
    router.get('/users', getAllUsers);
    router.get('/users/:id', isAuthenticated, getUserById);
    router.delete('/users/:id', isAuthenticated, isCurrentUser, deleteUserById);
    router.patch('/users/:id', isAuthenticated, isCurrentUser, updateUserById);
};

export default userRouter;
