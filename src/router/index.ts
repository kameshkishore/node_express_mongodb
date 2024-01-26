import express from 'express';
import authenticationRouter from './authenticationRouter';
import userRouter from './userRouter';
import productRouter from './productRouter';
import categoryRouter from './categoryRouter';
import uploadRouter from './uploadRouter';

const router = express.Router();

const routers = (): express.Router => {
    authenticationRouter(router);
    userRouter(router);
    productRouter(router);
    categoryRouter(router);
    uploadRouter(router);
    return router;
};

export default routers;
