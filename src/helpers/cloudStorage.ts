import AWS from 'aws-sdk';
import { config } from '../config/common';

export const s3 = new AWS.S3({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
})