import express from "express";
import { getAllFile, uploadFile, uploadImageInCloud } from "../controllers/uploadFile";
import { fileStorage } from "../middlewares/fileStorage";

const imageRouter = (route: express.Router) => {
    route.post('/upload', fileStorage.single('file'), uploadFile);
    route.get('/upload', getAllFile);
    route.post('/upload/cloud', fileStorage.single('file'), uploadImageInCloud);
};

export default imageRouter;
