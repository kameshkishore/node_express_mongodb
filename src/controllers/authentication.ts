import express from 'express';
import { authentication, random } from '../helpers';
import { createUser, getUserByEmail } from '../service/userService';
import { transporter } from '../config/mail';

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ message: 'Email or password cannot be empty' });
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');
        if (!user) {
            return res.status(400).send({ message: 'user not found' });
        }

        const expectedHash = authentication(user.authentication.salt, password).toString();
        if (user.authentication.password !== expectedHash) {
            return res.status(400).send({ message: 'invalid password' });
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString()).toString();

        await user.save();

        res.cookie('AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/' });

        const mailData = {
            from: 'kameshkishore221298@gmail.com',
            to: email,
            subject: 'Sending Email using Node.js',
            text: 'That was easy!',
            html: '<b>Hey there! </b> <br> This is our first message sent with Nodemailer<br/>',
        };

        transporter.sendMail(mailData, (error, info) => {
            console.log('error', error);
            if (error) {
                return res.status(500).send(error);
            }
            return res.status(200).json(user).end();
        })
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, userName, role } = req.body;

        if (!email || !password || !userName || !role) {
            return res.status(400).send({ message: 'Email, username, role and password cannot be empty' });
        }

        const isExistingUser = await getUserByEmail(email);
        if (isExistingUser) {
            return res.status(400).send({ message: 'User already exist' });
        }

        const salt = random();
        const expectedHash = authentication(salt, password);
        const user = await createUser({
            email,
            userName,
            authentication: {
                salt,
                password: expectedHash,
            },
            role,
        });
        
        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}