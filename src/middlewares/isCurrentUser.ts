import express from 'express';
import { get } from 'lodash';

export const isCurrentUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, 'identity._id') as string;

        if (!currentUserId) {
            return res.status(400).send({ message: 'Invalid user' });
        }

        if (currentUserId.toString() !== id) {
            return res.status(400).send({ message: 'Cannot perform operations for another users account' });
        }

        return next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}