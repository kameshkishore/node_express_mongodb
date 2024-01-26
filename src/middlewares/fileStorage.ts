import multer from 'multer';

const storage = multer.memoryStorage();

export const fileStorage = multer({ storage: storage });
