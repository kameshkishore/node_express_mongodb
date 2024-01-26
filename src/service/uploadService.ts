import { UploadModal } from "../model/uploadModal";
import { UploadFileData } from "../interface/UploadFile";

export const uploadFileAction = (data: UploadFileData) => new UploadModal(data).save().then(res => res.toObject());

export const getAllFileAction = () => UploadModal.find();
