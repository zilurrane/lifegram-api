import express, { Request } from 'express';
import { handleCreatePost, handleGetAllPosts } from '../controllers/post.controller';

const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req: Request, file: any, cb: any) {
        cb(null, './uploads')
    },
    filename: function (req: Request, file: any, cb: any) {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage })

const router = express.Router();

router.get('/', handleGetAllPosts);
router.post('/', upload.single('file'), handleCreatePost);

export default router;
