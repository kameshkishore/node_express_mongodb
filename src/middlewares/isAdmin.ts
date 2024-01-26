import express from 'express';
import { getUserBySessionToken } from '../service/userService';
import { Role } from '../interface/UserInterface';

export const isAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
       const sessionToken = req.cookies['AUTH'];

       if (!sessionToken) {
        return res.status(401).send({ message: 'Access denied' });
       }

       const existingUser = await getUserBySessionToken(sessionToken);
       if(!existingUser) {
        return res.sendStatus(403);
       }

       if (existingUser.role !== Role.admin) {
        return res.status(401).send({ message: 'You do not have a admin access' });
       }

       return next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}