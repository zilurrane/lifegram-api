import express from 'express';
import { handleCreatePost } from '../controllers/post.controller';

const router = express.Router();

router.post('/', handleCreatePost);

export default router;
