import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT: process.env.PORT || 8080,
    MONGO_URL: process.env.MONGO_URL || '',
    SECRET: process.env.SECRET || 'secret',
    NODE_MAILER_USER: process.env.NODE_MAILER_USER || '',
    NODE_MAILER_PASSWORD: process.env.NODE_MAILER_PASSWORD || '',
    NODE_MAILER_HOST: process.env.NODE_MAILER_HOST || '',
    NODE_MAILER_PORT: process.env.NODE_MAILER_PORT || 2525,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
    bucketName: process.env.AWS_BUCKET_NAME,
}