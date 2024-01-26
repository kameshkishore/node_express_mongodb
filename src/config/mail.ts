import nodemailer from 'nodemailer';
import { config } from './common';

export const transporter = nodemailer.createTransport({
    port: +config.NODE_MAILER_PORT,
    host: config.NODE_MAILER_HOST,
    auth: {
        user: config.NODE_MAILER_USER,
        pass: config.NODE_MAILER_PASSWORD,
    },
    secure: false,
});