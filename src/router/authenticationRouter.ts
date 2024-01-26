import express from 'express';
import { login, register } from '../controllers/authentication';

const authenticationRouter = (router: express.Router) => {
    router.post('/auth/register', register);
    router.post('/auth/login', login);
};

export default authenticationRouter;