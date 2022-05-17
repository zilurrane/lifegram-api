import { Post, PostData } from "../models/post.model";

export const createPost = async (createPostRequest: PostData) => {
    const post = new Post(createPostRequest);
    return await post.save();
}
