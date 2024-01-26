import express from 'express';
import { AWSError } from 'aws-sdk';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import { getAllFileAction, uploadFileAction } from '../service/uploadService';
import { config } from '../config/common';
import { s3 } from '../helpers/cloudStorage';

export const uploadFile = async (req: express.Request, res: express.Response) => {
    try {
        const formData = req.file;
        const base64Data = formData.buffer.toString('base64');
        const uploadData = {
            data: base64Data,
            fileName: formData.originalname || formData.filename,
            mimeType: formData.mimetype,
        };
        const response = await uploadFileAction(uploadData);
        return res.status(200).send(response);
    } catch (error) {
        return res.status(400).send(error);
    }
};

export const uploadImageInCloud = async (req: express.Request, res: express.Response) => {
    try {
        const formData = req.file;
        const params = {
            Bucket: config.bucketName,
            Key:req.file.originalname,
            Body:req.file.buffer,
            ACL:"public-read-write",
            ContentType:"image/jpeg"
        };
        s3.upload(params, async (error: AWSError | null, data: ManagedUpload.SendData | undefined) => {
            console.log(data);
            if(error) {
                return res.status(500).send({ "error": error })
            }
            const uploadData = {
                data: data.Location,
                fileName: formData.originalname || formData.filename,
                mimeType: formData.mimetype,
            };
            const response = await uploadFileAction(uploadData);
            return res.status(200).send(response);
        });
    } catch (error) {
        res.status(400).send(error);
    }
};            

export const getAllFile = async (req: express.Request, res: express.Response) => {
    try {
        const response = await getAllFileAction();
        res.status(200).send(response);
    } catch (error) {
        res.status(400).send(error);
    }
}
