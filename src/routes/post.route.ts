import express from 'express';
import { handleCreatePost, handleGetAllPosts } from '../controllers/post.controller';

const router = express.Router();

router.get('/', handleGetAllPosts);
router.post('/', handleCreatePost);

export default router;
