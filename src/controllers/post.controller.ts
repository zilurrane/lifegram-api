import { NextFunction, Request, Response } from "express";
import { createPost, getAllPosts } from "../services/post.service";

export const handleCreatePost = async (req: Request, res: Response, next: NextFunction) => {
    const { text } = req.body;
    try {
        const post = await createPost({ text, createdBy: null, modifiedBy: null });
        res.json(post);
    } catch (error) {
        next(error);
    }
}

export const handleGetAllPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await getAllPosts();
        res.json(posts);
    } catch (error) {
        next(error);
    }
}
