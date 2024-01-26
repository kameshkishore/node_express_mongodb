import express from 'express';
import { deleteUserByIdAction, getUserByIdAction, updateUserByIdAction, getUsersAction } from '../service/userService';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsersAction();
        return res.status(200).send(users);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

export const deleteUserById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send({ message: 'Id should not be empty' });
        }
        const deleteUser = await deleteUserByIdAction(id);
        return res.status(200).send(deleteUser);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

export const getUserById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send({ message: 'Id should not be empty' });
        }
        const user = await getUserByIdAction(id);
        return res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

export const updateUserById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { userName } = req.body;

        if (!userName || !id) {
            return res.status(400).send({ message: 'username or id should not be empty' });
        }

        const user = await getUserByIdAction(id);
        user.userName = userName;
        await user.save();
        
        return res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}
